import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "DiagKnowSis — AI-Powered Medical Diagnosis Assistant",
  description: "DiagKnowSis is an AI-powered medical diagnosis assistant that helps healthcare professionals make accurate and efficient diagnoses. With its advanced natural language processing capabilities, DiagKnowSis can analyze patient symptoms, medical history, and test results to provide insightful recommendations and support clinical decision-making. Experience the future of healthcare with DiagKnowSis, where cutting-edge technology meets compassionate care.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}
      <Toaster
      position="top-right"
      
      reverseOrder={false}
      />
      </body>

    </html>
  );
}