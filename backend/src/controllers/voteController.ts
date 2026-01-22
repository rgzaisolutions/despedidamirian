import { Request, Response } from 'express';
import { pool } from '../config/db';

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
        // 1. Ensure device exists or create it
        const [deviceRows]: any = await pool.execute(
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
            // Update display name if changed
            await pool.execute('UPDATE devices SET display_name = ? WHERE id = ?', [display_name, deviceId]);
        }

        // 2. Cast or Toggle Vote
        const [existingVote]: any = await pool.execute(
            'SELECT id FROM votes WHERE group_id = ? AND device_id = ? AND item_type = ? AND item_id = ?',
            [group.id, deviceId, item_type, item_id]
        );

        if (existingVote.length > 0) {
            await pool.execute('DELETE FROM votes WHERE id = ?', [existingVote[0].id]);
            return res.json({ message: 'Voto retirado', action: 'removed' });
        } else {
            await pool.execute(
                'INSERT INTO votes (group_id, device_id, item_type, item_id) VALUES (?, ?, ?, ?)',
                [group.id, deviceId, item_type, item_id]
            );
            return res.json({ message: 'Voto registrado', action: 'added' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar el voto' });
    }
};
