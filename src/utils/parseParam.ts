import { Request } from 'express';

export const parseIdParam = (req: Request): number => {
    const { id } = req.params;
    const idNum = Number(id);

    if (!idNum) {
        throw new Error('Invalid Id');
    }

    return idNum;
};

export default {
    parseIdParam,
};
