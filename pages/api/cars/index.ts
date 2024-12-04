import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseAdmin";
import admin from "firebase-admin"; // Pastikan Anda mengimpor admin

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        // Fetch all cars
        const snapshot = await db.collection("cars").get();
        const cars: Car[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Car)
        );
        return res.status(200).json(cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        return res.status(500).json({ message: "Error fetching cars" });
      }

    case "POST":
      try {
        const carData: Car = req.body;

        // Validate required fields
        if (!carData.platNumber || !carData.brand || !carData.model) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        // Create a new document reference with auto-generated ID
        const carRef = db.collection("cars").doc();
        const carToSave = {
          ...carData,
          id: carRef.id,
          services: [], // Initialize empty services array
        };

        // Save car to Firestore
        await carRef.set(carToSave);

        return res.status(201).json(carToSave);
      } catch (error) {
        console.error("Error saving car:", error);
        return res.status(500).json({ message: "Error saving car" });
      }
    case "PUT":
      try {
        const { id } = query;
        const serviceData: Service = req.body;

        if (!id) {
          return res.status(400).json({ message: "Car ID is required" });
        }

        // Validate service data
        if (!serviceData.description) {
          return res
            .status(400)
            .json({ message: "Service description is required" });
        }

        // Prepare service object
        const serviceToAdd: Service = {
          id: db.collection("cars").doc().id, // Generate unique ID
          date: new Date().toISOString(),
          description: serviceData.description,
          cost: serviceData.cost,
          mileage: serviceData.mileage,
        };

        // Update car document by adding service to the services array
        const carRef = db.collection("cars").doc(id as string);
        await carRef.update({
          services: admin.firestore.FieldValue.arrayUnion(serviceToAdd),
        });

        return res.status(200).json(serviceToAdd);
      } catch (error) {
        console.error("Error adding service:", error);
        return res.status(500).json({
          message: "Error adding service",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }

    case "DELETE":
      try {
        const { id } = query;
        if (!id) {
          return res.status(400).json({ message: "Car ID is required" });
        }

        await db
          .collection("cars")
          .doc(id as string)
          .delete();
        return res.status(200).json({ message: "Car deleted successfully" });
      } catch (error) {
        console.error("Error deleting car:", error);
        return res.status(500).json({ message: "Error deleting car" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
