import { Request, Response, NextFunction } from 'express';
import { UserType, UserInputType } from './../interfaces';
import userService from './../services/userService';

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users: UserType[] = await userService.getAllUsers();
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
): Promise<void> => {
    const id: number = Number(req.params.id);

    try {
        const deletedId: number = await userService.deleteUserById(id);
        res.status(200).json({
            status: 'success',
            message: `User with id ${id} has been removed.`,
        });
    } catch (err) {
        next(err);
    }
};

const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const id: number = Number(req.params.id);

    try {
        const user: UserType = await userService.getUserById(id);
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

const updateNameById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const id: number = Number(req.params.id);

    try {
        const name: string | undefined = req.body.Name;

        if (!name) {
            throw new Error("Could't find name in request body");
        }

        const user: UserType = await userService.updateNameById(id, name);

        res.status(200).json({
            status: 'success',
            message: 'Updated name of user',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default {
    getAllUsers,
    deleteUserById,
    getUserById,
    updateNameById,
};
