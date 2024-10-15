"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface GasPurchase {
    id: string;
    pricePerLiter: number;
    totalAmount: number;
    liters: number;
    currentSpeedometer: number;
    location: string;
    photoFileName?: string;
    date: string;
}

export default function GasPurchaseTracker() {
    const [pricePerLiter, setPricePerLiter] = useState<string>("");
    const [totalAmount, setTotalAmount] = useState<string>("");
    const [currentSpeedometer, setCurrentSpeedometer] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
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
        setLoading(true); // Set loading true saat mulai proses

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
            setLoading(false); // Set loading false jika ada error

            return;
        }

        const liters = parsedTotalAmount / parsedPricePerLiter;
        const photoFileName = photo ? `${Date.now()}_${photo.name}` : undefined;

        const newPurchase: GasPurchase = {
            id: Date.now().toString(),
            pricePerLiter: parsedPricePerLiter,
            totalAmount: parsedTotalAmount,
            liters,
            currentSpeedometer: parsedCurrentSpeedometer,
            location,
            photoFileName,
            date: new Date().toISOString(),
        };

        try {
            if (photo) {
                const formData = new FormData();
                formData.append("photo", photo);
                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const uploadResult = await uploadResponse.json();
                if (uploadResponse.ok) {
                    newPurchase.photoFileName = uploadResult.filename;
                } else {
                    console.error("Failed to upload photo:", uploadResult.message);
                }
            }

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
                setPhoto(null);
            } else {
                console.error("Failed to save purchase");
            }
        } catch (error) {

            console.error("Error saving purchase:", error);
        } finally {
            setLoading(false); // Set loading false setelah selesai
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah kamu yakin ingin menghapus pembelian ini?")) return;
        setLoading(true); // Set loading true saat mulai proses

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
            setLoading(false); // Set loading false setelah selesai
        }
    };

    const formatNumber = (value: string) => {
        const number = value.replace(/[^\d]/g, "");
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const { totalTransactions, totalAmountSpent, totalLiters, avgPricePerLiter } = calculateSummary();

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Pencatatan Pembelian Gas
            </h1>

            {/* Menampilkan pesan loading */}
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {/* Summary Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Summary</h2>
                <p>
                    <strong>Total Transaksi:</strong> {totalTransactions}
                </p>
                <p>
                    <strong>Total Pengeluaran:</strong> Rp{" "}
                    {totalAmountSpent.toLocaleString()}
                </p>
                <p>
                    <strong>Total Liter:</strong> {totalLiters.toFixed(2)} L
                </p>
                <p>
                    <strong>Rata-rata Harga per Liter:</strong> Rp{" "}
                    {avgPricePerLiter.toFixed(2)}
                </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Input Pembelian Baru
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="pricePerLiter"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Harga per Liter
                        </label>
                        <input
                            type="text"
                            id="pricePerLiter"
                            value={pricePerLiter}
                            onChange={(e) => setPricePerLiter(formatNumber(e.target.value))}
                            placeholder="Contoh: 12,500"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="totalAmount"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Jumlah Pembelian
                        </label>
                        <input
                            type="text"
                            id="totalAmount"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(formatNumber(e.target.value))}
                            placeholder="Contoh: 50,000"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
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
                            placeholder="Contoh: 12,345"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Lokasi Pengisian
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Contoh: SPBU Jl. Sudirman"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="photo"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Foto
                        </label>
                        <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Simpan
                    </button>
                </form>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Riwayat Pembelian
                </h2>
                <div className="space-y-4">
                    {purchases.length > 0 ? (
                        purchases.map((purchase) => (
                            <div
                                key={purchase.id}
                                className="bg-white shadow-md rounded-lg p-6"
                            >
                                <p className="text-sm text-gray-500 mb-2">
                                    {new Date(purchase.date).toLocaleString()}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Harga per Liter:</span> Rp
                                    {purchase.pricePerLiter.toLocaleString()}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Jumlah Pembelian:</span> Rp
                                    {purchase.totalAmount.toLocaleString()}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Jumlah Liter:</span>{" "}
                                    {purchase.liters.toFixed(2)} L
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Speedometer:</span>{" "}
                                    {purchase.currentSpeedometer.toLocaleString()} km
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">Lokasi:</span>{" "}
                                    {purchase.location}
                                </p>
                                {purchase.photoFileName && (
                                    <Image
                                        src={`/gas/${purchase.photoFileName}`}
                                        alt="Foto pembelian"
                                        width={200}
                                        height={200}
                                        className="mt-2 rounded-md"
                                    />
                                )}
                                <button
                                    onClick={() => handleDelete(purchase.id)}
                                    className="mt-2 text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    Hapus
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            Belum ada data pembelian.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
