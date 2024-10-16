"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GasPurchaseTracker from "./components/GasPurchaseTracker ";

export default function GasPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isLoadingLogout, setIsLoadingLogout] = useState(false);
    if (loading) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
            <h2 className="text-center text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-gray-500">
              Please wait while we load the content.
            </p>
          </div>
        );
      }

    if (!user) {
        router.push("/login");
        return null;
    }

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");

        if (confirmLogout) {
            setIsLoadingLogout(true);
            try {
                const response = await fetch("/api/logout", {
                    method: "POST",
                });

                if (response.ok) {
                    router.push("/login");
                } else {
                    console.error("Failed to log out");
                }
            } catch (error) {
                console.error("Error during logout:", error);
            } finally {
                setIsLoadingLogout(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* GasPurchaseTracker component */}
            <GasPurchaseTracker />

            {/* Tombol Logout */}
            <button
                onClick={handleLogout}
                className={`mt-6 mb-6 px-4 py-2 text-white font-semibold rounded-lg ${isLoadingLogout
                        ? "bg-gray-400"
                        : "bg-red-500 hover:bg-red-600 transition-colors"
                    }`}
                disabled={isLoadingLogout}
            >
                {isLoadingLogout ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
}
