import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const uploadDir = path.join(process.cwd(), 'public', 'gas');
        const options: formidable.Options = {
            uploadDir,
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB
        };

        const form = formidable(options);

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                res.status(500).json({ message: 'Error uploading file' });
                return;
            }

            const fileArray = files.photo as formidable.File[];
            if (!fileArray || fileArray.length === 0) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }

            const file = fileArray[0];
            const newPath = path.join(uploadDir, file.newFilename || '');

            try {
                await fs.rename(file.filepath, newPath);
                res.status(200).json({ message: 'File uploaded successfully', filename: file.newFilename });
            } catch (error) {
                console.error('Error saving file:', error);
                res.status(500).json({ message: 'Error saving file' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}