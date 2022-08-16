import { FC, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { openAlert, AlertTypes } from '../../store/alert';
import TournamentForm, { ITournamentForm, TournamentFormMode } from './TournamentForm';
import { Tournament } from '../../constants';

interface TournamentEditProps {
    tournament: Tournament;
    closeModal: () => void;
}

const updateTournament = async (tournament: any) => {
    try {
        const newTournament = await axios.put('/tournaments/update', tournament);
        return newTournament.data;
    } catch (error) {
        throw error.response.data;
    }
};

const TournamentEdit: FC<TournamentEditProps> = ({ tournament, closeModal }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isLoading, error } = useMutation(updateTournament);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, formValues: ITournamentForm) => {
        try {
            const updatedTournament = await mutateAsync({ _id: tournament._id, ...formValues });
            queryClient.setQueryData('tournaments', (existingTournaments: Tournament[]) => {
                return existingTournaments.map((tournament) => tournament._id === updatedTournament._id ? { ...updatedTournament } : tournament );
            });
            closeModal();
            router.push(`/tournament/${updatedTournament.name}`);
            dispatch(
                openAlert({
                    message: 'Tournament has been successfully updated.',
                    type: AlertTypes.Success,
                })
            );
        } catch (error) {
            console.error('An error occurred while updating the tournamentL ', error);
        }
    };

    return (
        <TournamentForm
            apiErrorMessage={error as string}
            closeModal={closeModal}
            tournament={tournament}
            onSubmit={handleSubmit}
            loading={isLoading}
            mode={TournamentFormMode.Edit}
        />
    );
};

export default TournamentEdit;