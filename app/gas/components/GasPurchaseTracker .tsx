import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Calculator,
  Fuel,
  Car,
  Bike,
  Trash2,
  PlusCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface GasPurchase {
  id: string;
  pricePerLiter: number;
  totalAmount: number;
  liters: number;
  currentSpeedometer: number;
  location: string;
  date: string;
  vehicleType: "car" | "motorcycle";
  fuelEfficiency?: number; // km per liter
}

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
    <div className="bg-white p-5 rounded-md shadow-xl">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="text-center mt-3 text-gray-700">Loading...</p>
    </div>
  </div>
);

export default function GasPurchaseTracker() {
  const [pricePerLiter, setPricePerLiter] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [currentSpeedometer, setCurrentSpeedometer] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<"car" | "motorcycle">("car");
  const [purchases, setPurchases] = useState<GasPurchase[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "history">("summary");

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      const response = await fetch("/api/purchases");
      const data = await response.json();
      if (Array.isArray(data)) {
        // Calculate fuel efficiency for each purchase
        const purchasesWithEfficiency = data.map((purchase) => ({
          ...purchase,
          fuelEfficiency: calculateFuelEfficiency(purchase),
        }));
        setPurchases(purchasesWithEfficiency);
      } else {
        console.error("Loaded purchases data is not an array:", data);
        setPurchases([]);
      }
    } catch (error) {
      console.error("Error loading purchases:", error);
      setPurchases([]);
    }
  };

  const calculateFuelEfficiency = (purchase: GasPurchase) => {
    // Find the previous purchase of the same vehicle type
    const prevPurchase = purchases
      .filter((p) => p.vehicleType === purchase.vehicleType)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .find((p) => new Date(p.date) < new Date(purchase.date));

    if (prevPurchase) {
      const distanceTraveled =
        purchase.currentSpeedometer - prevPurchase.currentSpeedometer;
      return distanceTraveled / purchase.liters;
    }
    return undefined;
  };

  const calculateSummary = () => {
    const totalTransactions = purchases.length;
    const totalAmountSpent = purchases.reduce(
      (sum, purchase) => sum + purchase.totalAmount,
      0
    );
    const totalLiters = purchases.reduce(
      (sum, purchase) => sum + purchase.liters,
      0
    );
    const avgPricePerLiter = totalLiters ? totalAmountSpent / totalLiters : 0;

    const carPurchases = purchases.filter((p) => p.vehicleType === "car");
    const motorcyclePurchases = purchases.filter(
      (p) => p.vehicleType === "motorcycle"
    );

    return {
      totalTransactions,
      totalAmountSpent,
      totalLiters,
      avgPricePerLiter,
      carStats: {
        transactions: carPurchases.length,
        totalSpent: carPurchases.reduce((sum, p) => sum + p.totalAmount, 0),
        avgFuelEfficiency: calculateAverageFuelEfficiency(carPurchases),
      },
      motorcycleStats: {
        transactions: motorcyclePurchases.length,
        totalSpent: motorcyclePurchases.reduce(
          (sum, p) => sum + p.totalAmount,
          0
        ),
        avgFuelEfficiency: calculateAverageFuelEfficiency(motorcyclePurchases),
      },
    };
  };

  const calculateAverageFuelEfficiency = (vehiclePurchases: GasPurchase[]) => {
    const efficiencyValues = vehiclePurchases
      .map((p) => p.fuelEfficiency)
      .filter((eff) => eff !== undefined) as number[];

    return efficiencyValues.length
      ? efficiencyValues.reduce((sum, eff) => sum + eff, 0) /
          efficiencyValues.length
      : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const parsedPricePerLiter = parseFloat(pricePerLiter.replace(/,/g, ""));
    const parsedTotalAmount = parseFloat(totalAmount.replace(/,/g, ""));
    const parsedCurrentSpeedometer = parseFloat(
      currentSpeedometer.replace(/,/g, "")
    );

    if (
      isNaN(parsedPricePerLiter) ||
      isNaN(parsedTotalAmount) ||
      isNaN(parsedCurrentSpeedometer)
    ) {
      alert("Please enter valid numbers for price, amount, and speedometer.");
      setLoading(false);
      return;
    }

    const liters = parsedTotalAmount / parsedPricePerLiter;

    const newPurchase: GasPurchase = {
      id: Date.now().toString(),
      pricePerLiter: parsedPricePerLiter,
      totalAmount: parsedTotalAmount,
      liters,
      currentSpeedometer: parsedCurrentSpeedometer,
      location,
      vehicleType,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPurchase),
      });

      if (response.ok) {
        const purchaseWithEfficiency = {
          ...newPurchase,
          fuelEfficiency: calculateFuelEfficiency(newPurchase),
        };
        setPurchases((prevPurchases) => [
          ...prevPurchases,
          purchaseWithEfficiency,
        ]);

        // Reset form
        setPricePerLiter("");
        setTotalAmount("");
        setCurrentSpeedometer("");
        setLocation("");
        setShowForm(false);
      } else {
        console.error("Failed to save purchase");
      }
    } catch (error) {
      console.error("Error saving purchase:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this purchase?")) return;
    setLoading(true);

    try {
      const response = await fetch("/api/purchases", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setPurchases((prevPurchases) =>
          prevPurchases.filter((purchase) => purchase.id !== id)
        );
      } else {
        console.error("Failed to delete purchase");
      }
    } catch (error) {
      console.error("Error deleting purchase:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (value: string) => {
    const number = value.replace(/[^\d]/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const prepareChartData = () => {
    const monthlyData: {
      [key: string]: {
        totalAmount: number;
        carAmount: number;
        motorcycleAmount: number;
      };
    } = {};

    purchases.forEach((purchase) => {
      const monthYear = new Date(purchase.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          totalAmount: 0,
          carAmount: 0,
          motorcycleAmount: 0,
        };
      }

      monthlyData[monthYear].totalAmount += purchase.totalAmount;
      if (purchase.vehicleType === "car") {
        monthlyData[monthYear].carAmount += purchase.totalAmount;
      } else {
        monthlyData[monthYear].motorcycleAmount += purchase.totalAmount;
      }
    });

    return Object.entries(monthlyData).map(([date, data]) => ({
      date,
      totalAmount: data.totalAmount,
      carAmount: data.carAmount,
      motorcycleAmount: data.motorcycleAmount,
    }));
  };

  const {
    totalTransactions,
    totalAmountSpent,
    totalLiters,
    avgPricePerLiter,
    carStats,
    motorcycleStats,
  } = calculateSummary();

  const chartData = prepareChartData();

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-gray-50 min-h-[85vh]">
      {loading && <LoadingSpinner />}

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center">
          <Fuel className="mr-3 text-blue-600" />
          Fuel Tracker
        </h1>

        {/* Tabs */}
        <div className="flex mb-4 border-b">
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex-1 py-2 flex items-center justify-center ${
              activeTab === "summary"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            <Calculator className="mr-2" /> Summary
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 flex items-center justify-center ${
              activeTab === "history"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            <Trash2 className="mr-2" /> History
          </button>
        </div>

        {activeTab === "summary" && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Car Stats */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Car className="mr-2 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Car Expenses</h3>
                </div>
                <p>Total Transactions: {carStats.transactions}</p>
                <p>Total Spent: Rp {carStats.totalSpent.toLocaleString()}</p>
                <p>
                  Avg Fuel Efficiency:
                  {carStats.avgFuelEfficiency > 0
                    ? `${carStats.avgFuelEfficiency.toFixed(2)} km/L`
                    : "N/A"}
                </p>
              </div>

              {/* Motorcycle Stats */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Bike className="mr-2 text-green-600" />
                  <h3 className="font-semibold text-green-800">
                    Motorcycle Expenses
                  </h3>
                </div>
                <p>Total Transactions: {motorcycleStats.transactions}</p>
                <p>
                  Total Spent: Rp {motorcycleStats.totalSpent.toLocaleString()}
                </p>
                <p>
                  Avg Fuel Efficiency:
                  {motorcycleStats.avgFuelEfficiency > 0
                    ? `${motorcycleStats.avgFuelEfficiency.toFixed(2)} km/L`
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Monthly Expenses Chart */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Monthly Expenses
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="carAmount"
                    stackId="a"
                    fill="#3b82f6"
                    name="Car"
                  />
                  <Bar
                    dataKey="motorcycleAmount"
                    stackId="a"
                    fill="#10b981"
                    name="Motorcycle"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            {/* Add Purchase Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full flex items-center justify-center mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {showForm ? (
                <>
                  <ChevronUp className="mr-2" /> Close
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2" /> Add New Purchase
                </>
              )}
            </button>

            {/* Purchase Form */}
            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-4 rounded-lg mb-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="pricePerLiter"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price per Liter
                    </label>
                    <input
                      type="text"
                      id="pricePerLiter"
                      value={pricePerLiter}
                      onChange={(e) =>
                        setPricePerLiter(formatNumber(e.target.value))
                      }
                      placeholder="e.g., 12,500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="totalAmount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Total Amount
                    </label>
                    <input
                      type="text"
                      id="totalAmount"
                      value={totalAmount}
                      onChange={(e) =>
                        setTotalAmount(formatNumber(e.target.value))
                      }
                      placeholder="e.g., 50,000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="currentSpeedometer"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Speedometer
                    </label>
                    <input
                      type="text"
                      id="currentSpeedometer"
                      value={currentSpeedometer}
                      onChange={(e) =>
                        setCurrentSpeedometer(formatNumber(e.target.value))
                      }
                      placeholder="e.g., 12,345"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., SPBU Jl. Sudirman"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="vehicleType"
                        value="car"
                        checked={vehicleType === "car"}
                        onChange={() => setVehicleType("car")}
                      />
                      <span className="ml-2 flex items-center">
                        <Car className="mr-1" /> Car
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="vehicleType"
                        value="motorcycle"
                        checked={vehicleType === "motorcycle"}
                        onChange={() => setVehicleType("motorcycle")}
                      />
                      <span className="ml-2 flex items-center">
                        <Bike className="mr-1" /> Motorcycle
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Save Purchase
                </button>
              </form>
            )}

            {/* Purchase History */}
            <div className="space-y-4">
              {purchases.length > 0 ? (
                purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className={`bg-white shadow-md rounded-lg p-4 border-l-4 ${
                      purchase.vehicleType === "car"
                        ? "border-blue-500"
                        : "border-green-500"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-500">
                        {new Date(purchase.date).toLocaleString()}
                      </p>
                      <div className="flex items-center">
                        {purchase.vehicleType === "car" ? (
                          <Car className="text-blue-500 mr-1" />
                        ) : (
                          <Bike className="text-green-500 mr-1" />
                        )}
                        <span className="text-sm font-medium">
                          {purchase.vehicleType === "car"
                            ? "Car"
                            : "Motorcycle"}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm">
                          <span className="font-semibold">Price/L:</span>
                          Rp {purchase.pricePerLiter.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Total:</span>
                          Rp {purchase.totalAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-semibold">Liters:</span>
                          {purchase.liters.toFixed(2)} L
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Speedometer:</span>
                          {purchase.currentSpeedometer.toLocaleString()} km
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm">
                        <span className="font-semibold">Location:</span>
                        {purchase.location}
                      </p>
                      {purchase.fuelEfficiency && (
                        <p className="text-sm text-green-600">
                          Efficiency: {purchase.fuelEfficiency.toFixed(2)} km/L
                        </p>
                      )}
                      <button
                        onClick={() => handleDelete(purchase.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 p-4 bg-white rounded-lg shadow-md">
                  <p>No purchase data available.</p>
                  <p className="text-sm mt-2">
                    Add your first fuel purchase to get started!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
