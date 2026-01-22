import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getPot = async (req: Request, res: Response) => {
    const group = (req as any).group;
    try {
        const [rows]: any = await pool.execute(
            'SELECT * FROM pot_ledger WHERE group_id = ? ORDER BY created_at DESC',
            [group.id]
        );

        const [budget]: any = await pool.execute(
            'SELECT * FROM budget_settings WHERE group_id = ?',
            [group.id]
        );

        res.json({
            ledger: rows,
            settings: budget[0] || { target_total: 300, max_total: 345 }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el bote' });
    }
};

export const addExpense = async (req: Request, res: Response) => {
    const group = (req as any).group;
    const { concept, amount, category, paid_by, method } = req.body;

    try {
        const [result]: any = await pool.execute(
            'INSERT INTO pot_ledger (group_id, concept, amount, category, paid_by, method, expense_date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [group.id, concept, amount, category, paid_by, method]
        );
        res.status(201).json({ id: result.insertId, message: 'Gasto registrado' });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar gasto' });
    }
};
