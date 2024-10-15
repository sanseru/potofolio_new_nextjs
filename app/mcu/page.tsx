"use client";
import React, { useState } from "react";
import {
    ArrowRight,
    Activity,
    Clipboard,
    Users,
    FileText,
    BarChart,
    Home,
    Zap,
    CheckCircle,
    Link as LinkIcon,
    Menu, X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dropdown

    return (
        <>
            <Head>
                <title>Medical Checkup - HospitalCheckPro</title>
                <meta
                    name="description"
                    content="Optimalisasi layanan medical checkup di rumah sakit dengan HospitalCheckPro."
                />
                <meta
                    name="keywords"
                    content="medical checkup, hospital, layanan kesehatan, "
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://harislukman.my.id/mcu" />
                {/* Tambahkan meta tag lainnya jika diperlukan */}
            </Head>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow-md">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Home className="text-blue-600" />{" "}
                            {/* Tambah ikon di sebelah teks */}
                            <h1 className="text-2xl font-bold text-blue-600">
                                HospitalCheckPro
                            </h1>
                        </div>
                        {/* Hamburger menu for mobile view */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? (
                                    <X className="text-blue-600" />
                                ) : (
                                    <Menu className="text-blue-600" />
                                )}
                            </button>
                        </div>
                        {/* Navigation links */}
                        <nav
                            className={`md:flex ${isOpen ? "block" : "hidden"
                                } absolute md:static bg-white w-full md:w-auto top-16 left-0`}
                        >
                            <ul className="flex flex-col md:flex-row space-x-0 md:space-x-4 p-4 md:p-0">
                                <li>
                                    <a
                                        href="#features"
                                        className="text-gray-600 hover:text-blue-600"
                                        onClick={() => setIsOpen(false)} // Menutup menu saat salah satu link diklik
                                    >
                                        Fitur
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#benefits"
                                        className="text-gray-600 hover:text-blue-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Manfaat
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        className="text-gray-600 hover:text-blue-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Kontak
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-blue-600 text-white py-20">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h2 className="text-4xl font-bold mb-4">
                                Revolusi Proses Medical Checkup di Rumah Sakit Anda
                            </h2>
                            <p className="text-xl mb-6">
                                HospitalCheckPro: Solusi komprehensif untuk mengoptimalkan
                                layanan medical checkup, meningkatkan efisiensi, dan memberikan
                                perawatan terbaik bagi pasien Anda.
                            </p>
                            <button
                                className="bg-white text-blue-600 font-bold py-2 px-4 rounded-full inline-flex items-center"
                                onClick={() => {
                                    window.open(
                                        "https://wa.me/6285775535916?text=Saya%20ingin%20bertanya%20tentang%20aplikasi%20MCU",
                                        "_blank"
                                    );
                                }}
                            >
                                Mulai Demo Gratis
                                <ArrowRight className="ml-2" />
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <Image
                                src="/mcu-mac.webp"
                                alt="Hospital Medical Checkup System"
                                className="rounded-lg  object-contain mx-auto"
                                width={1400}
                                height={800}
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Fitur Unggulan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <Activity className="text-green-500 w-12 h-12 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Manajemen Poli Terpadu
                                </h3>
                                <p className="text-gray-600">
                                    Kelola semua poli dengan mudah: Umum, Mata, Gigi, Jantung,
                                    THT, dan lainnya dalam satu sistem terintegrasi.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <Clipboard className="text-blue-500 w-12 h-12 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Registrasi &amp; Appointment
                                </h3>
                                <p className="text-gray-600">
                                    Sistem registrasi dan penjadwalan yang efisien untuk MCU dan
                                    rawat jalan, mengoptimalkan alur kerja rumah sakit.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <Users className="text-red-500 w-12 h-12 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Manajemen Pasien &amp; Staf
                                </h3>
                                <p className="text-gray-600">
                                    Kelola data pasien, dokter, karyawan, dan perusahaan klien
                                    dengan aman dan efisien.
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 text-center">
                            <Link href="/mcu/allfeatures">
                                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700">
                                    Lihat Semua Fitur
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="bg-gray-200 py-20">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Mengapa Memilih HospitalCheckPro?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                                <Zap className="text-blue-500 w-12 h-12 mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Efisiensi Operasional
                                    </h3>
                                    <p className="text-gray-600">
                                        Otomatisasi proses administratif dan klinis, menghemat waktu
                                        dan sumber daya rumah sakit.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                                <CheckCircle className="text-blue-500 w-12 h-12 mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Peningkatan Akurasi
                                    </h3>
                                    <p className="text-gray-600">
                                        Minimalisir kesalahan manusia dengan sistem input dan
                                        analisis data yang canggih.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                                <LinkIcon className="text-blue-500 w-12 h-12 mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Integrasi Seamless
                                    </h3>
                                    <p className="text-gray-600">
                                        Mudah diintegrasikan dengan sistem yang ada, menjamin alur
                                        kerja yang lancar.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                                <BarChart className="text-blue-500 w-12 h-12 mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Pelaporan Komprehensif
                                    </h3>
                                    <p className="text-gray-600">
                                        Menghasilkan laporan detail untuk pengambilan keputusan dan
                                        alokasi sumber daya yang lebih baik.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Testimonial Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Apa Kata Klien Kami
                        </h2>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <p className="text-gray-600 mb-4">
                                &quot;HospitalCheckPro telah mengubah cara kami mengelola
                                medical checkup. Efisiensi meningkat drastis, dan pasien kami
                                sangat puas dengan layanan yang lebih cepat dan akurat.&quot;
                            </p>
                            <p className="font-semibold">Novi Radius</p>
                            <p className="text-sm text-gray-500">Direktur FastMedikaCenter</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="contact" className="bg-blue-600 text-white py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Siap Meningkatkan Layanan Medical Checkup Anda?
                        </h2>
                        <p className="text-xl mb-8">
                            Jadwalkan demo gratis sekarang dan lihat bagaimana
                            HospitalCheckPro dapat mentransformasi rumah sakit Anda.
                        </p>
                        <button
                            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100"
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

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8">
                    <div className="container mx-auto px-6 text-center">
                        <p>&copy; 2024 HospitalCheckPro. Hak Cipta Dilindungi.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default LandingPage;
