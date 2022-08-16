import { FC, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { openAlert, AlertTypes } from '../../store/alert';
import TournamentForm, { TournamentFormMode } from './TournamentForm';
import { Tournament } from '../../constants';

interface TournamentCreateProps {
    closeModal: () => void;
    tournaments: Tournament[];
}

const createTournament = async (tournament: Tournament) => {
    try {
        const newTournament = await axios.post('/tournaments/create', tournament);
        return newTournament;
    } catch (error) {
        throw error.response.data;
    }
};

const TournamentCreate: FC<TournamentCreateProps> = ({ closeModal, tournaments }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { mutateAsync, isLoading, error } = useMutation(createTournament);

    const onSubmit = async (e: FormEvent<HTMLFormElement>, formValues: Tournament) => {
        e.preventDefault();
        try {
            const { data: tournament } = await mutateAsync({
                ...formValues,
                order: tournaments.length > 0 ? tournaments.length : 0,
            });
            queryClient.setQueryData('tournaments', (existingTournaments: Tournament[]) => [...existingTournaments, tournaments]);
            closeModal();
            router.push(`/tournaments/${tournament?.name}`);
            dispatch(
                openAlert({
                    message: 'Tournament has been successfully created.',
                    type: AlertTypes.Success,
                })
            );
        } catch (error) {
            console.error('An error occurred while creating a tournament: ', error);
        }
    };

    return (
        <TournamentForm
            closeModal={closeModal}
            apiErrorMessage={error as string}
            onSubmit={onSubmit}
            loading={isLoading}
            mode={TournamentFormMode.Create}
        />
    );
};

export default TournamentCreate;