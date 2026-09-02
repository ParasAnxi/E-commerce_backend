import { Request, Response } from 'express';

export const uploadSingle = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        res.status(200).json({ url: req.file.path });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const uploadMultiple = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        const urls = (req.files as Express.Multer.File[]).map(file => file.path);
        res.status(200).json({ urls });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
