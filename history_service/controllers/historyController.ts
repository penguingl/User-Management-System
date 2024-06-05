import { Request, Response } from 'express';
import History from '../models/history';

export const getHistory = async (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query = userId ? { where: { userId } } : {};
    const history = await History.findAll({
        ...query,
        offset: (Number(page) - 1) * Number(limit),
        limit: Number(limit),
    });
    res.status(200).send(history);
};