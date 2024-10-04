"use client"; // This is a client component 👈🏽

import React, { ReactElement, useState } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Book,
  Code,
  Zap,
  ChevronDown,
} from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  company: string;
}

interface FeatureItems {
  title: string;
  description: string;
  icon: ReactElement;
}

const FeatureItem: React.FC<FeatureItems> = ({ icon, title, description }) => (
  <div className="flex items-start mb-6">
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  company,
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <span className="text-sm font-semibold bg-blue-100 text-blue-800 py-1 px-2 rounded">
      {company}
    </span>
  </div>
);

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
              Haris Lukman Hakim
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-6">
              Full Stack Software Developer
            </p>
            <p className="text-md max-w-2xl mx-auto leading-relaxed">
              Experienced Full Stack Developer with 5+ years of expertise in
              building scalable web applications using PHP, Laravel, Node.js,
              and ERP systems. Skilled in .NET, Flutter, React Native, SCADA
              HMI, OPC DA, HDA, and UA. Continuously learning and applying
              cutting-edge technologies to deliver impactful solutions.{" "}
            </p>
          </div>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/sanseru"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-blue-200 p-4 rounded-full transition duration-300 shadow-lg"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com/in/harislkmn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-blue-200 p-4 rounded-full transition duration-300 shadow-lg"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:lukmanhakim1805@gmail.com"
              className="bg-white text-blue-600 hover:bg-blue-200 p-4 rounded-full transition duration-300 shadow-lg"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <Image
                src="/DSC_2293.webp"
                alt="Haris Lukman Hakim"
                className="rounded-lg shadow-lg object-contain mx-auto"
                width={256}
                height={256}
                priority
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">
                  Haris Lukman Hakim
                </h3>
                <p className="text-gray-600">Full Stack Developer</p>
              </div>
            </div>
            <div className="lg:w-2/3 lg:pl-12 leading-loose">
              <p className="text-lg mb-6 leading-relaxed  text-gray-700">
                I&apos;m Haris Lukman Hakim, a dedicated Full Stack Developer
                with over 5 years of experience building high-performance web
                applications. My journey spans across industries, where
                I&apos;ve developed scalable solutions using PHP, Laravel,
                Node.js, and ERP systems. From modern medical administration
                platforms to warehouse management systems, I bring a versatile
                and solution-oriented mindset to every project.
              </p>
              <FeatureItem
                icon={<Code size={24} className="text-blue-500" />}
                title="Technical Expertise"
                description="My technical proficiency spans backend development in .NET, PHP, and Node.js,
          frontend frameworks like React Native and Flutter, and industrial technologies including SCADA,
          OPC DA, HDA, and UA. This broad expertise enables me to solve complex problems with efficient, scalable solutions."
              />
              <FeatureItem
                icon={<Zap size={24} className="text-yellow-500" />}
                title="Problem-Solving Skills"
                description="I have a sharp analytical approach to troubleshooting and performance optimization.
          Tackling system challenges from multiple angles, I ensure mission-critical applications run smoothly
          and reliably under pressure."
              />
              <FeatureItem
                icon={<Book size={24} className="text-green-500" />}
                title="Continuous Learning"
                description="Committed to staying ahead of technology trends, I'm constantly expanding my knowledge in microservices architecture,
          cloud computing, and automation technologies. This continuous learning fuels my ability to innovate and adapt in fast-evolving environments."
              />
              <p className="text-lg mt-8 font-semibold text-gray-800">
                If you&apos;re looking for a forward-thinking developer who
                combines strong technical skills with a passion for innovation,
                I would be excited to collaborate and help drive your project to
                success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Image
                src="/mp.png"
                alt="PT. Kartika Bina Medikatama"
                className="w-full h-32 object-contain mb-4"
                width={200}
                height={128}
                priority
              />
              <h3 className="text-xl font-semibold mb-2">
                PT. Kartika Bina Medikatama
              </h3>
              <p className="text-gray-600">
                Led a team of developers in building and maintaining internal
                applications, ensuring high-quality code and timely delivery.
                Managed project timelines, delegated tasks, and worked closely
                with stakeholders to deliver business solutions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Image
                src="/ptcs.png"
                alt="PT. Control System Arena Para Nusa"
                className="w-full h-32 object-contain mb-4"
                width={200}
                height={128}
                priority
              />
              <h3 className="text-xl font-semibold mb-2">
                PT. Control System Arena Para Nusa
              </h3>
              <p className="text-gray-600">
                Designed, developed, and maintained software solutions for both
                internal and client-facing applications. Collaborated with
                cross-functional teams to gather requirements and deliver
                high-quality software products
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Key Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title="Medical Administration System (MAS)"
              description="Built a comprehensive platform for managing insurance policies, claims, and customer data, leading to better workflow management."
              company="PT. Kartika Bina Medikatama"
            />
            <ProjectCard
              title="HRIS & Payroll Integration"
              description="Developed an HR system for managing employee information, attendance, and payroll. Improved operational efficiency and data accuracy."
              company="PT. Kartika Bina Medikatama"
            />
            <ProjectCard
              title="SAP Integration"
              description="Automated business processes by integrating with SAP for seamless data flow and increased process automation."
              company="PT. Kartika Bina Medikatama"
            />
            <ProjectCard
              title="Helpline System"
              description="Developed a customer support system to streamline issue tracking and resolution, enhancing customer satisfaction."
              company="PT. Kartika Bina Medikatama"
            />
            <ProjectCard
              title="Covid-19 Tracking Application"
              description="Engineered a robust system for Covid-19 registration and result tracking, featuring seamless integration with multiple laboratories."
              company="PT. Kartika Bina Medikatama"
            />
            <ProjectCard
              title="Courier System"
              description="Streamlined logistics operations through a courier management system, optimizing delivery routes and reducing operational costs."
              company="PT. Kartika Bina Medikatama"
            />
            <ProjectCard
              title="Medical Checkup System"
              description="Created a scheduling and management system for employee medical checkups, improving health monitoring and reporting."
              company="PT. Kartika Bina Medikatama"
            />

            <ProjectCard
              title="WhatsApp Notification System"
              description="Integrated WhatsApp API for automated notifications, enhancing internal communications and process monitoring."
              company="PT. Kartika Bina Medikatama"
            />

            <ProjectCard
              title="Contract Management System"
              description="Developed an advanced contract management solution for the FCLCS department, including budget tracking and client dashboards."
              company="PT Control System Arena Paranusa"
            />

            <ProjectCard
              title="Secure File Sharing System"
              description="Developed a secure file sharing system using AWS S3 Storage for Pertamina PHONWJ, ensuring data integrity and accessibility."
              company="PT Control System Arena Paranusa"
            />

            <ProjectCard
              title="Principal App Terminal Manager Integration"
              description="Created a service to integrate with the Principal App Terminal Manager for efficient order and contract creation."
              company="PT Control System Arena Paranusa"
            />

            <ProjectCard
              title="OPC Historical Data Access (HDA) Application"
              description="Developed a web application for OPC Historical Data Access, facilitating data retrieval and analysis for decision-making."
              company="PT Control System Arena Paranusa"
            />
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Haris Lukman Hakim. All rights reserved.</p>
          <p className="mt-2">
            <a
              href="mailto:lukmanhakim1805@gmail.com"
              className="hover:text-blue-300 transition duration-300"
            >
              lukmanhakim1805@gmail.com
            </a>
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://github.com/sanseru"
              className="hover:text-blue-300 transition duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/harislkmn"
              className="hover:text-blue-300 transition duration-300"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}
`;
