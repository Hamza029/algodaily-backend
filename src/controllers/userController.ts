import { Request, Response, NextFunction } from 'express';
import { UserType, UserInputType } from './../interfaces';
import userService from './../services/userService';

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user: UserInputType = { ...req.body };
        const newUser: UserType = await userService.createUser(user);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        next(err);
    }
};

const deleteUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id: number = Number(req.params.id);

    try {
        const deletedId = await userService.deleteUserById(id);
        res.status(200).json({
            status: 'success',
            message: `User with id ${deletedId} has been removed.`,
        });
    } catch (err) {
        next(err);
    }
};

export default {
    createUser,
    getAllUsers,
    deleteUserById,
};
