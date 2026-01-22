import { Request, Response } from 'express';
import { pool } from '../config/db';
import { z } from 'zod';

const itinerarySchema = z.object({
    day: z.string(),
    slot: z.string(),
    title: z.string().min(1),
    description: z.string().optional(),
    est_cost: z.number().optional(),
    order_index: z.number().optional(),
});

export const getItinerary = async (req: Request, res: Response) => {
    const group = (req as any).group;
    try {
        const [rows]: any = await pool.execute(
            'SELECT * FROM itinerary_blocks WHERE group_id = ? ORDER BY day, order_index',
            [group.id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el itinerario' });
    }
};

export const createItineraryBlock = async (req: Request, res: Response) => {
    const group = (req as any).group;
    try {
        const data = itinerarySchema.parse(req.body);
        const [result]: any = await pool.execute(
            'INSERT INTO itinerary_blocks (group_id, day, slot, title, description, est_cost, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [group.id, data.day, data.slot, data.title, data.description, data.est_cost || 0, data.order_index || 0]
        );
        res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
        res.status(400).json({ error: 'Datos de itinerario inválidos' });
    }
};

export const updateItineraryBlock = async (req: Request, res: Response) => {
    const group = (req as any).group;
    const { id } = req.params;
    try {
        const data = itinerarySchema.parse(req.body);
        await pool.execute(
            'UPDATE itinerary_blocks SET day = ?, slot = ?, title = ?, description = ?, est_cost = ?, order_index = ? WHERE id = ? AND group_id = ?',
            [data.day, data.slot, data.title, data.description, data.est_cost, data.order_index, id, group.id]
        );
        res.json({ id, ...data });
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el itinerario' });
    }
};

export const deleteItineraryBlock = async (req: Request, res: Response) => {
    const group = (req as any).group;
    const { id } = req.params;
    try {
        await pool.execute(
            'DELETE FROM itinerary_blocks WHERE id = ? AND group_id = ?',
            [id, group.id]
        );
        res.json({ message: 'Bloque eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el bloque' });
    }
};
