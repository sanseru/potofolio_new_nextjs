"use client";

import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  Plus,
  Save,
  X,
  Clock,
  Banknote,
  MapPin,
} from "lucide-react";

interface Service {
  id: string;
  date: string;
  description: string;
  cost?: number;
  mileage?: number;
}

interface Car {
  id: string;
  platNumber: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  services?: Service[];
}

export default function CarManagement() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [editingCar, setEditingCar] = useState<Partial<Car> | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({});
  const [isAddingCar, setIsAddingCar] = useState(false);

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleAddCar = async () => {
    if (!editingCar) return;

    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCar),
      });

      if (response.ok) {
        const newCar = await response.json();
        setCars([...cars, newCar]);
        setEditingCar(null);
        setIsAddingCar(false);
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleAddService = async () => {
    if (!selectedCar || !newService.description) return;

    try {
      const response = await fetch(`/api/cars/${selectedCar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        const addedService = await response.json();
        const updatedCars = cars.map((car) =>
          car.id === selectedCar.id
            ? { ...car, services: [...(car.services || []), addedService] }
            : car
        );
        setCars(updatedCars);
        setNewService({});
        setSelectedCar(
          updatedCars.find((car) => car.id === selectedCar.id) || null
        );
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    try {
      const response = await fetch(`/api/cars/${carId}`, { method: "DELETE" });
      if (response.ok) {
        setCars(cars.filter((car) => car.id !== carId));
        setSelectedCar(null);
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const formatCurrency = (amount: number | undefined): string => {
    return amount ? `RP.${amount.toLocaleString()}` : "N/A";
  };

  const formatDate = (dateString: string | undefined): string => {
    return dateString
      ? new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
      : "Unknown Date";
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Car Management System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Car List */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Cars</h2>
            <button
              onClick={() => {
                setIsAddingCar(true);
                setEditingCar({});
              }}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              <Plus />
            </button>
          </div>
          {isAddingCar && (
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <input
                placeholder="Plate Number"
                value={editingCar?.platNumber || ""}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, platNumber: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                placeholder="Brand"
                value={editingCar?.brand || ""}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, brand: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                placeholder="Model"
                value={editingCar?.model || ""}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, model: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                placeholder="Color"
                value={editingCar?.color || ""}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, color: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                placeholder="Year"
                type="number"
                value={editingCar?.year || ""}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, year: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleAddCar}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  <Save />
                </button>
                <button
                  onClick={() => {
                    setIsAddingCar(false);
                    setEditingCar(null);
                  }}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <X />
                </button>
              </div>
            </div>
          )}
          {cars.map((car) => (
            <div
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className={`p-3 mb-2 rounded cursor-pointer ${selectedCar?.id === car.id ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">
                    {car.brand} {car.model}
                  </p>
                  <p className="text-gray-600">{car.platNumber}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCar(car.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Car Details */}
        {selectedCar && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Car Details</h2>
            <div className="space-y-2">
              <p>
                <strong>Plate Number:</strong> {selectedCar.platNumber}
              </p>
              <p>
                <strong>Brand:</strong> {selectedCar.brand}
              </p>
              <p>
                <strong>Model:</strong> {selectedCar.model}
              </p>
              <p>
                <strong>Color:</strong> {selectedCar.color}
              </p>
              <p>
                <strong>Year:</strong> {selectedCar.year}
              </p>
            </div>
          </div>
        )}

        {/* Service History */}
        {selectedCar && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Service History</h2>
            </div>

            {/* Add Service Form */}
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <input
                placeholder="Service Description"
                value={newService.description || ""}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                placeholder="Cost (Optional)"
                type="number"
                value={newService.cost || ""}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    cost: parseFloat(e.target.value),
                  })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                placeholder="Mileage (Optional)"
                type="number"
                value={newService.mileage || ""}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    mileage: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <button
                onClick={handleAddService}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Service
              </button>
            </div>

            {/* Service List */}
            {selectedCar.services && selectedCar.services.length > 0 ? (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-blue-50 p-3 border-b border-blue-100">
                <h3 className="text-lg font-bold text-blue-800">Service History</h3>
              </div>

                {selectedCar.services.map((service) => (
                  <div
                    key={service.id}
                    className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-grow pr-4">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {service.description || "Unnamed Service"}
                        </h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} className="text-blue-500" />
                            <span>{formatDate(service.date)}</span>
                          </div>
                          {service.cost && (
                            <div className="flex items-center space-x-1">
                              <Banknote
                                size={14}
                                className="text-green-500"
                              />
                              <span>{formatCurrency(service.cost)}</span>
                            </div>
                          )}
                          {service.mileage && (
                            <div className="flex items-center space-x-1">
                              <MapPin size={14} className="text-red-500" />
                              <span>
                                {service.mileage.toLocaleString()} Km
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100`}>Completed
                        </span>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
              No service records found
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
