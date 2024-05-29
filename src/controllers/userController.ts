import { Request, Response, NextFunction } from 'express';
import { UserType, UserInputType } from './../interfaces';
import userService from './../services/userService';
import { parseIdParam } from '../utils/parseParam';
import sendResponse from '../utils/sendResponse';

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users: UserType[] = await userService.getAllUsers();
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

        const isDeleted: number = await userService.deleteUserById(id);

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

        const user: UserType = await userService.getUserById(id);

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

        const user: UserType = await userService.updateNameById(id, name);

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
