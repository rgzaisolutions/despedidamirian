import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';

export const validateGroup = async (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.headers['x-group-id'];
    const groupPin = req.headers['x-group-pin'];

    if (!groupId || !groupPin) {
        return res.status(401).json({ error: 'Se requiere ID de grupo y PIN' });
    }

    try {
        const [rows]: any = await pool.execute(
            'SELECT * FROM groups WHERE code = ? AND pin_hash = ?',
            [groupId, groupPin]
        );

        if (rows.length === 0) {
            return res.status(403).json({ error: 'Credenciales de grupo inválidas' });
        }

        (req as any).group = rows[0];
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error de base de datos' });
    }
};
