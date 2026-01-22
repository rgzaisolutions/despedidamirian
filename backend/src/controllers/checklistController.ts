import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getChecklist = async (req: Request, res: Response) => {
    const group = (req as any).group;
    try {
        const [rows]: any = await pool.execute(
            'SELECT c.*, d.display_name as done_by FROM checklist_items c LEFT JOIN devices d ON c.done_by_device_id = d.id WHERE c.group_id = ? ORDER BY c.order_index',
            [group.id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener checklist' });
    }
};

export const toggleChecklistItem = async (req: Request, res: Response) => {
    const group = (req as any).group;
    const { id } = req.params;
    const { is_done, device_uuid } = req.body;

    try {
        let deviceId = null;
        if (is_done && device_uuid) {
            const [deviceRows]: any = await pool.execute(
                'SELECT id FROM devices WHERE group_id = ? AND device_uuid = ?',
                [group.id, device_uuid]
            );
            if (deviceRows.length > 0) deviceId = deviceRows[0].id;
        }

        await pool.execute(
            'UPDATE checklist_items SET is_done = ?, done_by_device_id = ? WHERE id = ? AND group_id = ?',
            [is_done, deviceId, id, group.id]
        );
        res.json({ message: 'Item actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar checklist' });
    }
};
