import { Request, Response } from 'express';
import { pool } from '../config/db.js';

export const getItinerary = async (req: Request, res: Response) => {
    const group = (req as any).group;
    try {
        const [rows]: any = await pool.execute(
            'SELECT * FROM itinerary_blocks WHERE group_id = ? ORDER BY day ASC, order_index ASC',
            [group.id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el itinerario' });
    }
};

export const createItineraryBlock = async (req: Request, res: Response) => {
    const group = (req as any).group;
    const { day, slot, title, description, est_cost, order_index } = req.body;
    try {
        const [result]: any = await pool.execute(
            'INSERT INTO itinerary_blocks (group_id, day, slot, title, description, est_cost, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [group.id, day, slot, title, description, est_cost, order_index]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear bloque' });
    }
};
