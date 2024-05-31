import { Request, Response, NextFunction } from 'express';
import { IUser } from './../interfaces/user';
import userService from './../services/userService';
import { parseIdParam } from '../utils/parseParam';
import sendResponse from '../utils/sendResponse';

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users: IUser[] = await userService.getAllUsers();
        sendResponse(req, res, 200, 'success', 'fetched all users', users);
    } catch (err) {
        next(err);
    }
};

const deleteUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = parseIdParam(req);

        await userService.deleteUserById(id);

        sendResponse(req, res, 200, 'deleted', `deleted user with id ${id}.`);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = parseIdParam(req);

        const user: IUser = await userService.getUserById(id);

        sendResponse(
            req,
            res,
            200,
            'success',
            `fetched user with id ${id}`,
            user
        );
    } catch (err) {
        next(err);
    }
};

const updateNameById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = parseIdParam(req);

        const name: string | undefined = req.body.Name;

        if (!name) {
            throw new Error("Could't find name in request body");
        }

        const user: IUser = await userService.updateNameById(id, name);

        sendResponse(
            req,
            res,
            200,
            'updated',
            `updated name of user with id ${id}`,
            user
        );
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
