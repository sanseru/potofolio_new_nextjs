// pages/api/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Menghapus cookie session dengan membuat cookie yang sudah kadaluarsa
            res.setHeader('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly; Secure=true; SameSite=Strict');

            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({ error: 'Failed to log out' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
