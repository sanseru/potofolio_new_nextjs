import { NextApiRequest, NextApiResponse } from "next";
import { db, auth } from "../../lib/firebaseAdmin"; // Path ke firebaseAdmin.ts

interface GasPurchase {
  id: string;
  pricePerLiter: number;
  totalAmount: number;
  liters: number;
  currentSpeedometer: number;
  location: string;
  date: string;
  vehicleType: "car" | "motorcycle";
}

const verifyToken = async (token: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await verifyToken(token); // Verifikasi token Firebase

    if (req.method === "GET") {
      try {
        const snapshot = await db.collection("purchases").get();
        const purchases: GasPurchase[] = snapshot.docs.map(
          (doc) => doc.data() as GasPurchase
        );
        res.status(200).json(purchases);
      } catch (error) {
        console.error("Error fetching purchases:", error);
        res.status(500).json({ message: "Error fetching purchases" });
      }
    } else if (req.method === "POST") {
      try {
        const newPurchase: GasPurchase = req.body;

        // Add new purchase to Firestore
        await db.collection("purchases").doc(newPurchase.id).set(newPurchase);

        res.status(201).json(newPurchase);
      } catch (error) {
        console.error("Error saving purchase:", error);
        res.status(500).json({ message: "Error saving purchase" });
      }
    } else if (req.method === "DELETE") {
        console.log(req.body);
      try {
        const { id } = req.body;
        console.log(id);
        // Delete purchase from Firestore
        await db.collection("purchases").doc(id).delete();

        res.status(200).json({ message: "Purchase deleted successfully" });
      } catch (error) {
        console.error("Error deleting purchase:", error);
        res.status(500).json({ message: "Error deleting purchase" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
}
