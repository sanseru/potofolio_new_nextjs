// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { idToken } = req.body;

        try {
            // Verify the token with Firebase Admin SDK
            const decodedToken = await auth.verifyIdToken(idToken);

            // Tentukan masa berlaku session (contoh: 5 hari)
            const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 hari
            const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

            // Set cookie HTTP-only untuk session
            res.setHeader('Set-Cookie', `session=${sessionCookie}; Max-Age=${expiresIn / 1000}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Strict`);

            // Kirim respons sukses
            res.status(200).json({ message: 'Login successful', uid: decodedToken.uid });
        } catch (error) {
            console.error('Error verifying ID token:', error);
            res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
