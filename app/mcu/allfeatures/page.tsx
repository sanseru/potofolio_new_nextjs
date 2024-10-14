"use client";

import React from "react";
import {
    Clipboard,
    Users,
    FileText,
    Activity,
    Heart,
    Eye,
    Stethoscope,
    BarChart2,
    LucideIcon,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon: Icon,
    title,
    description,
}) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <Icon className="text-blue-500 w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const AllFeaturesPage: React.FC = () => {
    const features: FeatureCardProps[] = [
        {
            icon: Clipboard,
            title: "Registrasi & Appointment",
            description:
                "Manajemen efisien untuk registrasi MCU, rawat jalan, dan penjadwalan appointment.",
        },
        {
            icon: Users,
            title: "Manajemen Data Master",
            description:
                "Pengelolaan data poli, tindakan medis, dokter, karyawan, klien/perusahaan, dan pasien.",
        },
        {
            icon: FileText,
            title: "Template & Paket MCU",
            description:
                "Kustomisasi template temuan medis dan paket MCU sesuai kebutuhan.",
        },
        {
            icon: Activity,
            title: "Pemeriksaan Tanda Vital",
            description:
                "Pencatatan dan analisis tanda vital seperti TB, BB, BMI, dan tekanan darah.",
        },
        {
            icon: Stethoscope,
            title: "Poli Umum/Spesialis",
            description:
                "Manajemen kunjungan, pemeriksaan SOAP, diagnosa ICD-10, dan resep.",
        },
        {
            icon: Eye,
            title: "Poli Mata",
            description: "Pencatatan hasil pemeriksaan mata dengan detail.",
        },
        {
            icon: FileText,
            title: "Laboratorium",
            description:
                "Pengelolaan hasil pemeriksaan laboratorium yang terintegrasi.",
        },
        {
            icon: Stethoscope,
            title: "Poli Gigi",
            description: "Input hasil pemeriksaan gigi dengan skema odontogram.",
        },
        {
            icon: Heart,
            title: "Poli Jantung",
            description: "Manajemen pemeriksaan EKG & Treadmill.",
        },
        {
            icon: Stethoscope,
            title: "Poli THT/Audiometri",
            description:
                "Input dan visualisasi hasil pemeriksaan Audiometri & grafik Audiogram.",
        },
        {
            icon: FileText,
            title: "Medical Record",
            description:
                "Review hasil pemeriksaan, rangkuman, dan status kesehatan peserta MCU.",
        },
        {
            icon: BarChart2,
            title: "Laporan & Administrasi",
            description:
                "Cetak hasil MCU, kwitansi/invoice, dan laporan pendapatan harian.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* <header className="bg-blue-600 text-white py-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-2">
                        Fitur Lengkap HospitalCheckPro
                    </h1>
                    <p className="text-xl">
                        Solusi komprehensif untuk optimalisasi layanan medical checkup di
                        rumah sakit Anda
                    </p>
                </div>
            </header> */}

            <header className="bg-blue-600 text-white py-12 relative">
                <div className="container mx-auto px-6">
                    {/* Tombol Back */}
                    <Link href="/mcu" passHref>
                        <button className="absolute top-4 left-4 flex items-center text-white hover:text-gray-300">
                            <ArrowLeft className="w-6 h-6 mr-2" />
                            Back
                        </button>
                    </Link>

                    {/* Konten Header */}
                    <h1 className="text-4xl font-bold mb-2">
                        Fitur Lengkap HospitalCheckPro
                    </h1>
                    <p className="text-xl">
                        Solusi komprehensif untuk optimalisasi layanan medical checkup di
                        rumah sakit Anda
                    </p>
                </div>
            </header>
            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </main>

            <section className="bg-blue-100 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Siap untuk Meningkatkan Efisiensi Rumah Sakit Anda?
                    </h2>
                    <p className="text-xl mb-8">
                        Jadwalkan demo gratis dan lihat bagaimana HospitalCheckPro dapat
                        mentransformasi proses medical checkup Anda.
                    </p>

                    <button
                        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700"
                        onClick={() => {
                            window.open(
                                "https://wa.me/6285775535916?text=Saya%20ingin%20bertanya%20tentang%20aplikasi%20MCU",
                                "_blank"
                            );
                        }}
                    >
                        Mulai Demo Gratis
                    </button>
                </div>
            </section>

            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2024 HospitalCheckPro. Hak Cipta Dilindungi.</p>
                </div>
            </footer>
        </div>
    );
};

export default AllFeaturesPage;
