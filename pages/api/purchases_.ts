import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

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


const PURCHASES_FILE = path.join(process.cwd(), 'data', 'purchases.json');
console.log(PURCHASES_FILE);
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const data = await fs.readFile(PURCHASES_FILE, 'utf-8');
            const purchases = JSON.parse(data);
            res.status(200).json(purchases);
        } catch (error) {
            res.status(500).json({ message: 'Error reading purchases' });
        }
    } else if (req.method === 'POST') {
        try {
            const newPurchase = req.body;
            const data = await fs.readFile(PURCHASES_FILE, 'utf-8');
            const purchases = JSON.parse(data);
            purchases.push(newPurchase);
            await fs.writeFile(PURCHASES_FILE, JSON.stringify(purchases, null, 2));
            res.status(201).json(newPurchase);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error saving purchase' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const data = await fs.readFile(PURCHASES_FILE, 'utf-8');
            const purchases = JSON.parse(data);
            const updatedPurchases = purchases.filter((purchase: GasPurchase) => purchase.id !== id);

            await fs.writeFile(PURCHASES_FILE, JSON.stringify(updatedPurchases, null, 2));

            res.status(200).json({ message: 'Purchase deleted successfully' });
        } catch (error) {
            console.error('Error deleting purchase:', error);
            res.status(500).json({ message: 'Error deleting purchase' });
        }
    }else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}