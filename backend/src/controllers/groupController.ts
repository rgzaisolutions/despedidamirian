import { Request, Response } from 'express';
import { pool } from '../config/db';
import { z } from 'zod';

const createGroupSchema = z.object({
    name: z.string().min(3).max(100),
    pin: z.string().min(4).max(20),
});

export const createGroup = async (req: Request, res: Response) => {
    try {
        const { name, pin } = createGroupSchema.parse(req.body);

        // Generate a short code VSQ-XXXX
        const code = `VSQ-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        const [result]: any = await pool.execute(
            'INSERT INTO groups (code, pin_hash, name) VALUES (?, ?, ?)',
            [code, pin, name]
        );

        res.status(201).json({
            id: result.insertId,
            code,
            name,
            message: 'Grupo creado con éxito'
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Error al crear el grupo' });
    }
};

export const joinGroup = async (req: Request, res: Response) => {
    try {
        const { code, pin } = req.body;

        const [rows]: any = await pool.execute(
            'SELECT * FROM groups WHERE code = ? AND pin_hash = ?',
            [code, pin]
        );

        if (rows.length === 0) {
            return res.status(403).json({ error: 'Código o PIN inválido' });
        }

        res.json({
            group: {
                id: rows[0].id,
                code: rows[0].code,
                name: rows[0].name
            },
            message: 'Bienvenida al Bride Squad'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al unirse al grupo' });
    }
};
