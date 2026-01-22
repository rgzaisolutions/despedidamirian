import { Request, Response } from 'express';
import { pool } from '../config/db.js';

export const getVotes = async (req: Request, res: Response) => {
    const group = (req as any).group;
    try {
        const [rows]: any = await pool.execute(
            'SELECT item_type, item_id, COUNT(*) as count FROM votes WHERE group_id = ? GROUP BY item_type, item_id',
            [group.id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener votos' });
    }
};

export const castVote = async (req: Request, res: Response) => {
    const group = (req as any).group;
    const { device_uuid, display_name, item_type, item_id } = req.body;

    try {
        // Find or create device
        let [deviceRows]: any = await pool.execute(
            'SELECT id FROM devices WHERE group_id = ? AND device_uuid = ?',
            [group.id, device_uuid]
        );

        let deviceId;
        if (deviceRows.length === 0) {
            const [newDevice]: any = await pool.execute(
                'INSERT INTO devices (group_id, device_uuid, display_name) VALUES (?, ?, ?)',
                [group.id, device_uuid, display_name]
            );
            deviceId = newDevice.insertId;
        } else {
            deviceId = deviceRows[0].id;
        }

        // Toggle vote
        const [existingVote]: any = await pool.execute(
            'SELECT id FROM votes WHERE group_id = ? AND device_id = ? AND item_type = ? AND item_id = ?',
            [group.id, deviceId, item_type, item_id]
        );

        if (existingVote.length > 0) {
            await pool.execute('DELETE FROM votes WHERE id = ?', [existingVote[0].id]);
            res.json({ message: 'Voto retirado' });
        } else {
            await pool.execute(
                'INSERT INTO votes (group_id, device_id, item_type, item_id) VALUES (?, ?, ?, ?)',
                [group.id, deviceId, item_type, item_id]
            );
            res.json({ message: 'Voto registrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar voto' });
    }
};
