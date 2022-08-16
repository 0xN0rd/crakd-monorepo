import { Request, Response } from 'express';
import { AuthUser, ErrorCodes, ErrorMessages, UserRole } from '../constants';
import {
    entryById,
    getTournamentEntries,
    getEntriesByTournamentId,
    getEntriesByUserId,
    getEntryById,
    createEntry,
    updateEntry,
    deleteEntry,
} from '../db';

const EntryController = {
    entriesByTournamentId: async (req: Request, res: Response): Promise<any> => {
        const { tournamentId } = req.params;
        const { offset, limit } = req.query;
        const entries = await getEntriesByTournamentId(tournamentId, +offset, +limit);
        return res.send(entries);
    },
    entriesByUserId: async (req: Request, res: Response): Promise<any> => {
        const { userId } = req.params;
        const { offset, limit } = req.query;
        const entries = await getEntriesByUserId(userId, +offset, +limit);
        return res.send(entries);
    },
    entryById: async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;
        const entry = await getEntryById(id);
        return res.send(entry);
    },
    create: async (req: Request, res: Response): Promise<any> => {
        const authUser = req.user as AuthUser;
        const { score, position, tournamentId } = req.body;

        const newEntry: any = await createEntry(score, position, tournamentId, authUser._id);
        return res.send(newEntry);
    },
    update: async (req: Request, res: Response): Promise<any> => {
        const authUser = req.user as AuthUser;
        const { entryId, score, position, tournamentId } = req.body;

        if (authUser.role !== UserRole.SuperAdmin) {
            const entry: any = await entryById(entryId);
            if (entry.user.toString() !== authUser._id.toString()) {
                return res.status(ErrorCodes.Bad_Request).send('Unauthorized');
            }
        }

        const updatedEntry = await updateEntry(entryId, score, position, tournamentId);
        return res.send(updatedEntry);
    },
    delete: async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;
        const authUser = req.user as AuthUser;

        if (authUser.role !== UserRole.SuperAdmin) {
            const entry: any = await entryById(id);
            if (entry.user.toString() !== authUser._id.toString()) {
                return res.status(ErrorCodes.Bad_Request).send(ErrorMessages.Generic);
            }
        }

        const deletedEntry = await deleteEntry(id);
        return res.send(deletedEntry);
    },
};

export default EntryController;