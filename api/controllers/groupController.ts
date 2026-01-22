import { Request, Response } from 'express';
import { pool } from '../config/db.js';

export const joinGroup = async (req: Request, res: Response) => {
    const { code, pin } = req.body;

    try {
        const [rows]: any = await pool.execute(
            'SELECT * FROM groups WHERE code = ? AND pin_hash = ?',
            [code, pin]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Código de grupo o PIN incorrectos' });
        }

        const group = rows[0];
        res.json({
            message: 'Unido con éxito',
            group: {
                id: group.id,
                code: group.code,
                name: group.name
            }
        });
    } catch (error) {
        console.error('Error in joinGroup:', error);
        res.status(500).json({ error: 'Error del servidor al unirse al grupo' });
    }
};

export const createGroup = async (req: Request, res: Response) => {
    const { name, pin } = req.body;
    const code = 'VSQ-' + Math.random().toString(36).substring(2, 6).toUpperCase();

    try {
        const [result]: any = await pool.execute(
            'INSERT INTO groups (code, pin_hash, name) VALUES (?, ?, ?)',
            [code, pin, name]
        );
        res.status(201).json({
            id: result.insertId,
            code,
            name
        });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear grupo' });
    }
};
