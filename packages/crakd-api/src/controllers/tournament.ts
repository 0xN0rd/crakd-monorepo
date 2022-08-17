import { Request, RequestParamHandler, Response } from 'express';
import {
    getTournaments,
    getTournamentByName,
    getTournamentsByFormat,
    getTournamentsByDuration,
    createTournament,
    updateTournament,
    reorderTournaments,
    deleteTournament,
} from '../db';
import { getTournamentEntries } from '../db';
import { ErrorCodes, ErrorMessages } from '../constants';

const tournamentNameReg = /[-!$%^&*()_+|~=`\\#{}[\]:";'<>?,./]/;

const TournamentController = {
    tournaments: async (req: Request, res: Response): Promise<any> => {
        const tournaments = await getTournaments();
        return res.send(tournaments);
    },
    tournamentByName: async (req: Request, res: Response): Promise<any> => {
        const { name } = req.params;
        const tournament = await getTournamentByName(name);
        return res.send(tournament);
    },
    tournamentsByFormat: async (req: Request, res: Response): Promise<any> => {
        const { format } = req.params;
        const tournaments = await getTournamentsByFormat(format);
        return res.send(tournaments);
    },
    tournamentsByDuration:  async (req: Request, res: Response): Promise<any> => {
        const { duration } = req.params;
        const tournaments = await getTournamentsByDuration(duration);
        return res.send(tournaments);
    },
    create: async (req: Request, res: Response): Promise<any> => {
        const { name, authRequired, order, format, duration, description } = req.body;
        const trimmedName = name.trim();

        if (tournamentNameReg.test(name) || !name || name.length > 20) {
            return res
                .status(ErrorCodes.Bad_Request)
                .send(`Tournament names can only user letters, numbers, underscores, and periods by max character 20.`);
        }

        const tournamentExists = await getTournamentByName(trimmedName);
        if (tournamentExists) {
            return res.status(ErrorCodes.Bad_Request).send(`A tournament with the name "${trimmedName}" already exists.`);
        }

        const newTournament = await createTournament(trimmedName, authRequired, order, format, duration, description);
        return res.send(newTournament);
    },
    update: async (req: Request, res: Response): Promise<any> => {
        const { _id, name, authRequired, format, duration, description, entries } = req.body;
        const trimmedName = name.trim();

        if (tournamentNameReg.test(trimmedName) || !trimmedName || trimmedName.length > 20) {
            return res
                .status(ErrorCodes.Bad_Request)
                .send(`Tournament names can only use letters, numbers, underscores, and periods by max character 20.`);
        }
        
        const tournamentExists = await getTournamentByName(trimmedName);
        if (tournamentExists && tournamentExists?._id.toString() !== _id) {
            return res.status(ErrorCodes.Bad_Request).send(`A channel with the name "${trimmedName}" already exists.`);
        }
        const updatedTournament = await updateTournament(_id, trimmedName, authRequired, format, duration, description, entries);
        return res.send(updatedTournament);
    },
    reorder: async (req: Request, res: Response): Promise<any> => {
        const { sortedTournaments } = req.body;
        await reorderTournaments(sortedTournaments);
        return res.send('success');
    },
    delete: async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;
        const tournament = await deleteTournament(id);

        const relatedEntries = await getTournamentEntries(tournament._id);
        relatedEntries.map(async (entry) => {
            await deleteTournament(entry._id);
        });

        return res.send(tournament);
    },
};

export default TournamentController;