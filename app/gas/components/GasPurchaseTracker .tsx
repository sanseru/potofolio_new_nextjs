"use client";
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GasPurchase {
    id: string;
    pricePerLiter: number;
    totalAmount: number;
    liters: number;
    currentSpeedometer: number;
    location: string;
    date: string;
    vehicleType: 'car' | 'motorcycle';
}


const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-md shadow-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-center mt-3 text-gray-700">Loading...</p>
        </div>
    </div>
)

export default function GasPurchaseTracker() {
    const [pricePerLiter, setPricePerLiter] = useState<string>("");
    const [totalAmount, setTotalAmount] = useState<string>("");
    const [currentSpeedometer, setCurrentSpeedometer] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [vehicleType, setVehicleType] = useState<'car' | 'motorcycle'>('car');
    const [purchases, setPurchases] = useState<GasPurchase[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPurchases();
    }, []);

    const loadPurchases = async () => {
        try {
            const response = await fetch("/api/purchases");
            const data = await response.json();
            if (Array.isArray(data)) {
                setPurchases(data);
            } else {
                console.error("Loaded purchases data is not an array:", data);
                setPurchases([]);
            }
        } catch (error) {
            console.error("Error loading purchases:", error);
            setPurchases([]);
        }
    };

    const calculateSummary = () => {
        const totalTransactions = purchases.length;
        const totalAmountSpent = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
        const totalLiters = purchases.reduce((sum, purchase) => sum + purchase.liters, 0);
        const avgPricePerLiter = totalLiters ? totalAmountSpent / totalLiters : 0;

        return {
            totalTransactions,
            totalAmountSpent,
            totalLiters,
            avgPricePerLiter,
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const parsedPricePerLiter = parseFloat(pricePerLiter.replace(/,/g, ""));
        const parsedTotalAmount = parseFloat(totalAmount.replace(/,/g, ""));
        const parsedCurrentSpeedometer = parseFloat(currentSpeedometer.replace(/,/g, ""));

        if (isNaN(parsedPricePerLiter) || isNaN(parsedTotalAmount) || isNaN(parsedCurrentSpeedometer)) {
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
                setPurchases((prevPurchases) => [...prevPurchases, newPurchase]);
                setPricePerLiter("");
                setTotalAmount("");
                setCurrentSpeedometer("");
                setLocation("");
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
                setPurchases((prevPurchases) => prevPurchases.filter((purchase) => purchase.id !== id));
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

    const { totalTransactions, totalAmountSpent, totalLiters, avgPricePerLiter } = calculateSummary();

    const prepareChartData = () => {
        const monthlyData: { [key: string]: number } = {};
        purchases.forEach(purchase => {
            const monthYear = new Date(purchase.date).toLocaleString('default', { month: 'short', year: 'numeric' });
            monthlyData[monthYear] = (monthlyData[monthYear] || 0) + purchase.totalAmount;
        });
        return Object.entries(monthlyData).map(([date, amount]) => ({ date, amount }));
    };

    const chartData = prepareChartData();

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Gas Purchase Tracker
            </h1>

            {loading && <LoadingSpinner />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Summary</h2>
                    <p><strong>Total Transactions:</strong> {totalTransactions}</p>
                    <p><strong>Total Spent:</strong> Rp {totalAmountSpent.toLocaleString()}</p>
                    <p><strong>Total Liters:</strong> {totalLiters.toFixed(2)} L</p>
                    <p><strong>Avg Price per Liter:</strong> Rp {avgPricePerLiter.toFixed(2)}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Purchases</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">New Purchase</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="pricePerLiter" className="block text-sm font-medium text-gray-700 mb-1">
                                Price per Liter
                            </label>
                            <input
                                type="text"
                                id="pricePerLiter"
                                value={pricePerLiter}
                                onChange={(e) => setPricePerLiter(formatNumber(e.target.value))}
                                placeholder="e.g., 12,500"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">
                                Total Amount
                            </label>
                            <input
                                type="text"
                                id="totalAmount"
                                value={totalAmount}
                                onChange={(e) => setTotalAmount(formatNumber(e.target.value))}
                                placeholder="e.g., 50,000"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="currentSpeedometer" className="block text-sm font-medium text-gray-700 mb-1">
                                Current Speedometer
                            </label>
                            <input
                                type="text"
                                id="currentSpeedometer"
                                value={currentSpeedometer}
                                onChange={(e) => setCurrentSpeedometer(formatNumber(e.target.value))}
                                placeholder="e.g., 12,345"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="vehicleType"
                                    value="car"
                                    checked={vehicleType === 'car'}
                                    onChange={() => setVehicleType('car')}
                                />
                                <span className="ml-2">Car</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="vehicleType"
                                    value="motorcycle"
                                    checked={vehicleType === 'motorcycle'}
                                    onChange={() => setVehicleType('motorcycle')}
                                />
                                <span className="ml-2">Motorcycle</span>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Save
                    </button>
                </form>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Purchase History</h2>
                <div className="space-y-4">
                    {purchases.length > 0 ? (
                        purchases.map((purchase) => (
                            <div key={purchase.id} className="bg-white shadow-md rounded-lg p-6">
                                <p className="text-sm text-gray-500 mb-2">
                                    {new Date(purchase.date).toLocaleString()}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Price per Liter:</span> Rp
                                    {purchase.pricePerLiter.toLocaleString()}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Total Amount:</span> Rp
                                    {purchase.totalAmount.toLocaleString()}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Liters:</span>{" "}
                                    {purchase.liters.toFixed(2)} L
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Speedometer:</span>{" "}
                                    {purchase.currentSpeedometer.toLocaleString()} km
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Location:</span>{" "}
                                    {purchase.location}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Vehicle Type:</span>{" "}
                                    {purchase.vehicleType === 'car' ? 'Car' : 'Motorcycle'}
                                </p>
                                <button
                                    onClick={() => handleDelete(purchase.id)}
                                    className="mt-2 text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No purchase data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}