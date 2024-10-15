import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebaseAdmin'; // Path ke firebaseAdmin.ts

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        try {
            const snapshot = await db.collection('purchases').get();
            const purchases: GasPurchase[] = snapshot.docs.map(doc => doc.data() as GasPurchase);
            res.status(200).json(purchases);
        } catch (error) {
            console.error('Error fetching purchases:', error);
            res.status(500).json({ message: 'Error fetching purchases' });
        }
    } else if (req.method === 'POST') {
        try {
            const newPurchase: GasPurchase = req.body;

            // Add new purchase to Firestore
            await db.collection('purchases').doc(newPurchase.id).set(newPurchase);

            res.status(201).json(newPurchase);
        } catch (error) {
            console.error('Error saving purchase:', error);
            res.status(500).json({ message: 'Error saving purchase' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.body;

            // Delete purchase from Firestore
            await db.collection('purchases').doc(id).delete();

            res.status(200).json({ message: 'Purchase deleted successfully' });
        } catch (error) {
            console.error('Error deleting purchase:', error);
            res.status(500).json({ message: 'Error deleting purchase' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
