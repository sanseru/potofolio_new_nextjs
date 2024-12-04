import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseAdmin";
import admin from "firebase-admin";

interface Service {
  id: string;
  date: string;
  description: string;
  cost?: number;
  mileage?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;
  if (!id) {
    return res.status(400).json({ message: "Car ID is required" });
  }

  try {
    const carRef = db.collection("cars").doc(id as string);

    switch (method) {
      case "GET":
        const doc = await carRef.get();
        if (!doc.exists) {
          return res.status(404).json({ message: "Car not found" });
        }
        return res.status(200).json({ id: doc.id, ...doc.data() });

      case "PUT":
        const serviceData: Service = req.body;

        if (!serviceData.description) {
          return res
            .status(400)
            .json({ message: "Service description is required" });
        }

        const serviceToAdd: Service = {
          id: db.collection("cars").doc().id, // Generate unique ID
          date: new Date().toISOString(),
          description: serviceData.description,
          cost: serviceData.cost,
          mileage: serviceData.mileage,
        };

        await carRef.update({
          services: admin.firestore.FieldValue.arrayUnion(serviceToAdd),
        });

        return res.status(200).json(serviceToAdd);

      case "DELETE":
        await carRef.delete();
        return res.status(200).json({ message: "Car deleted successfully" });

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ message: "Server error", error });
  }
}
