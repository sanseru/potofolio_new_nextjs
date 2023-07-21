import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
      <div className="mt-10">
        <div className="bg-white rounded-2xl relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
          <div className="mx-auto max-w-7xl py-6 sm:py-5 lg:py-1">
            {/* hidden sm:mb-8 sm:flex sm:justify-center */}
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-blue-600 ring-1 ring-blue-300 hover:ring-blue-600">
                Hey There 👋 I am.
              </div>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Haris Lukman Hakim
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                A full stack software developer, PHP Programmer (Laravel, Yii,
                Codeigniter , Etc), Fundamental Node JS Developer, SQL Server,
                Odoo ERP Developer
              </p>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
        </div>
        <div className="hero min-h-full bg-white rounded-2xl mt-7">
          <div className="hero-content flex-col lg:flex-row-reverse">
            {/* <img
                src="/DSC_2293.webp"
                className="max-w-sm mr-7 rounded-lg shadow-2xl h-[20rem]"
              /> */}
            <Image
              src="/DSC_2293.webp"
              alt="myImage"
              className="ax-w-sm mr-7 rounded-lg shadow-2xl h-[20rem] dark:invert"
              width={300}
              height={24}
              priority
            />
            <div>
              <h1 className="text-5xl font-bold text-blue-600">👦🏻 About Me</h1>
              <p className="py-6 text-justify">
                I am a seasoned system engineer with experience in designing,
                developing, and maintaining control and monitoring systems for
                various applications. I have extensive experience in working
                with Modbus protocol and Emerson devices to optimize the
                performance of the systems. I have also developed several
                applications, including HRIS, Service Chat Bot, System Stock
                Opname, Covid-19 App, and barcoding system for warehouse
                management.
              </p>
              <p className="text-justify">
                In addition to my technical skills, I possess excellent
                analytical and problem-solving skills, which enable me to
                diagnose and resolve complex technical issues. I am also a great
                team player with effective communication skills, enabling me to
                collaborate and work with cross-functional teams. I have a
                proactive and flexible work style that allows me to handle
                challenges outside of my job description.
              </p>
              <p className="mt-3">📧 lukmanhakim1805@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white min-h-full rounded-2xl mt-7 mb-10">
          <h1 className="text-3xl mt-3 py-5 px-5 font-bold text-blue-600">
            👨🏻‍💻 Profesional Experience
          </h1>
          <div className="hero-content mt-[-1.1rem] flex-row flex-wrap">
            <div className="card w-96 h-80 bg-base-100 shadow-2xl">
              <figure className="px-10 pt-10">
                <Image
                  src="/mp.png"
                  alt="medikaplaza"
                  className="rounded-xl dark:invert"
                  width={400}
                  height={0}
                  priority
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="text-sm card-title">
                  PT. kartika Bina Medikatama
                </h2>
                <p className="text-xs">
                  Experienced developer in MAS, E-Commerce, CRM, POS, and more.
                  Created HRIS, Chat Bot, Covid-19 App, and warehouse systems.{" "}
                </p>
              </div>
            </div>
            <div className="card w-96 h-80 bg-base-100 shadow-2xl">
              <figure className="px-10 pt-10">
                <Image
                  src="/ptcs.png"
                  alt="ptcs"
                  className="rounded-xl dark:invert"
                  width={400}
                  height={0}
                  priority
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="text-sm card-title">
                  PT. Control System Arena Para Nusa
                </h2>
                <p className="text-xs">
                  Responsibility is to design and implement systems while
                  collaborating with cross-functional teams to develop and
                  launch new products and features.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl mt-7 mb-10">
          <h1 className="text-3xl mt-3 py-5 px-5 font-bold text-blue-600">
            📈 Project Experience
          </h1>
          <div className="hero-content mt-[-2.3rem] flex-row flex-wrap">
            <ul className="bg-white rounded-2xl container mx-auto divide-y divide-gray-400 divide-dotted">
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 Medical Administration System
                  </div>
                  <ul className="list-inside list-disc">
                    <li>Manage Claims System</li>
                    <li>
                      Manage EDC Service for All Provider in Indonesia user{" "}
                    </li>
                    <li>Medlinx Services for Integration</li>
                    <li className="font-bold">
                      Manage Support App Use PHP native for:
                    </li>
                    <ul className="list-inside list-disc ml-6">
                      <li>Reporting For Core Claim System</li>
                      <li>Helpline System</li>
                      <li>Case Monitoring System</li>
                      <li>Provider System</li>
                      <li>Membership Upload</li>
                      <li>Dashboard Claim User Process</li>
                      <li>Client Dashboard Monitoring</li>
                    </ul>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 Medical Administration System v2 [Use PHP Framework Yii
                    2]
                  </div>
                  <ul className="list-inside list-disc">
                    <li>Create System like V1 with additional of feature</li>
                    <li>Create Integration EDC Service Using NodeJS</li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 Medical Administration System v2 [Use PHP Framework Yii
                    2]
                  </div>
                  <ul className="list-inside list-disc">
                    <li>Create System like V1 with additional of feature</li>
                    <li>Create Integration EDC Service Using NodeJS</li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 File Receipt System
                  </div>
                  <ul className="list-inside list-disc">
                    <li>For Data Collection</li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 Medical Assistance
                  </div>
                  <ul className="list-inside list-disc">
                    <li>System For Assistance Department</li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 MP Core
                  </div>
                  <ul className="list-inside list-disc">
                    <li>
                      Warehouse Asset Management System Integration with Item
                      SAP
                    </li>
                    <li>
                      Warehouse Alat Kesehatan Asset Management System
                      Integration with SAP system
                    </li>
                    <li>
                      Stock Opname System Integration Data (View) with SAP
                      system
                    </li>
                    <li>
                      Courier Application System with Notification to WhatsApp
                      Group
                    </li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 Covid 19 Application
                  </div>
                  <ul className="list-inside list-disc">
                    <li>Covid-19 registration system And Result</li>
                    <li>Integration With Another Labo Covid-19</li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 Dashboard Monitoring SAP
                  </div>
                  <ul className="list-inside list-disc">
                    <li>Create custom module from SAP data</li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 HRIS System
                  </div>
                  <ul className="list-inside list-disc">
                    <li>
                      HRIS system for company integration with payroll system
                    </li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 DO Tracking (Using Odoo)
                  </div>
                  <ul className="list-inside list-disc">
                    <li>Use Odoo for create module do tracking</li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Kartika Bina Medikatama
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 FilesSharing for External user Pertamina PHONWJ
                  </div>
                  <ul className="list-inside list-disc">
                    <li>
                      Create a System for Client to Sharing file between Client.
                      Using AWS and S3
                    </li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Control System Arena Paranusa
                </div>
              </li>
              <li className="flex items-center justify-between px-4 py-2">
                <div className="antialiased">
                  <div className="font-bold text-2xl align-middle mb-2">
                    💻 Contract Management
                  </div>
                  <ul className="list-inside list-disc">
                    <li>
                      Create Contrack management for FCLCS Dept to Manage
                      Contract and Budget from Client and Dashboard for Client
                    </li>
                  </ul>
                </div>
                <div className="text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white bg-pink-500 rounded-2">
                  🏢 PT Control System Arena Paranusa
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
