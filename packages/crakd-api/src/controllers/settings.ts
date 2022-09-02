import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AuthUser, ErrorCodes, ErrorMessages, UserRole } from '../constants';
import {
    getSettings,
    updateProfile,
    getUserByUsername,
    getUserByEmail,
    getUserByGamertag,
    deleteUser,
    settingsCreateUser,
    getUsers,
    updatePassword,
    countUsers,
} from '../db';
import { checkEmailVerification } from '../utils';

const SettingsController = {
    settings: async (req: Request, res: Response): Promise<any> => {
        const settings = await getSettings();
        return res.send(settings);
    },
    users: async (req: Request, res: Response): Promise<any> => {
        const { offset, limit, searchQuery } = req.query;
        const users = await getUsers(+offset, +limit, null, false, false, searchQuery as string);
        return res.send(users);
    },
    usersTotal: async (req: Request, res: Response): Promise<any> => {
        const { total, verified } = await countUsers();
        return res.send({ total, verified });
    },
    updateProfile: async (req: Request, res: Response): Promise<any> => {
        const { fullName, username, gamertag, twitchId, city, state, country } = req.body;
        const authUser = req.user as AuthUser;
        const existingUser = await getUserByUsername(username);

        if (existingUser && existingUser._id.toString() !== authUser._id.toString()) {
            return res.status(ErrorCodes.Bad_Request).send('A user with a given username already exists.');
        }

        const updatedUser = await updateProfile(
            authUser._id,
            fullName,
            username,
            gamertag,
            twitchId,
            city,
            state,
            country
        );
        return res.send(updatedUser);
    },
    updatePassword: async (req: Request, res: Response): Promise<any> => {
        const authUser = req.user as AuthUser;
        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password, 16);
        await updatePassword(authUser._id, passwordHash);
        return res.send('Password updated successfully.');
    },
    createUser: async (req: Request, res: Response): Promise<any> => {
        const { fullName, email, gamertag, password, role } = req.body;

        if (!fullName || !email || !gamertag || !role) {
            return res.status(ErrorCodes.Bad_Request).send('Please fill in all of the fields.');
        }

        if (role !== UserRole.Regular && role !== UserRole.Admin) {
            return res.status(ErrorCodes.Bad_Request).send('You can create only Admin or Regular users.');
        }

        const existingUser = await getUserByEmail(email);
        const isEmailVerificationRequired = await checkEmailVerification();

        if (existingUser && !isEmailVerificationRequired) {
            return res.status(ErrorCodes.Bad_Request).send('The email address is already being used.');
        }

        if (existingUser && isEmailVerificationRequired && existingUser.emailVerified) {
            return res.status(ErrorCodes.Bad_Request).send('The email address is already being used.');
        }

        if (existingUser && isEmailVerificationRequired && !existingUser.emailVerified) {
            await deleteUser(existingUser._id);
        }

        const user = await settingsCreateUser(fullName, email, password, gamertag, role);
        return res.send(user);
    },
};

export default SettingsController;