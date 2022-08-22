import { FC, FormEvent, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { Tournament } from '../../constants';
import { Spacing, Button, Modal, InputText, Text } from '../ui';
import { AlertTypes, openAlert } from '../../store/alert';
import { updateCache } from './cache';

const createEntry = async ({ score, position, tournamentId }) => {
    const newEntry = await axios.post('/entries/create', {
        score: score,
        position: position,
        tournamentId: tournamentId,
    });
    console.log(newEntry);
    return newEntry.data;
};

const updateEntry = async ({ entryId, score, position, tournamentId }) => {
    const updatedEntry = await axios.put('/entries/update', {
        entryId: entryId,
        score: score,
        position: position,
        tournamentId: tournamentId,
    });
    return updatedEntry.data;
};

interface EntryCreateProps {
    isEntryCreateOpen: boolean;
    entryId?: string;
    score?: number;
    position?: number;
    tournamentId?: string;
    queryKey: any;
    closeEntryCreate: () => void;
}

const EntryEdit: FC<EntryCreateProps> = ({
    isEntryCreateOpen,
    closeEntryCreate,
    tournamentId,
    entryId,
    score,
    position,
    queryKey,
}) => {
    const queryClient = useQueryClient();
    const tournaments: Tournament[] = queryClient.getQueryData(['tournaments']);
    const dispatch = useDispatch();
    const initialState = {
        score: score || 0,
        position: position || 1,
        tournamentId: tournamentId ? tournamentId : tournaments && tournaments[0]?._id,
    };
    const [formValues, setFormValues] = useState<{ score: number; position: number; tournamentId: string; }>(initialState);
    const { mutateAsync: createEntryMutation, isLoading: isEntryCreateLoading } = useMutation(createEntry);
    const { mutateAsync: updateEntryMutation, isLoading: isEntryUpdateLoading } = useMutation(updateEntry);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!entryId) {
                const entry = await createEntryMutation({ ...formValues });
                updateCache({
                    queryKey,
                    operation: 'create',
                    queryClient,
                    entry,
                    notAddingToCurrentTournament: tournamentId !== formValues.tournamentId,
                });
                notify('added');
                close();
            } else {
                const updatedEntry = await updateEntryMutation({
                    entryId,
                    score: formValues.score,
                    position: formValues.position,
                    tournamentId: formValues.tournamentId,
                });
                updateCache({
                    queryKey,
                    operation: 'update',
                    queryClient,
                    entry: updatedEntry,
                    notAddingToCurrentTournament: tournamentId !== formValues.tournamentId,
                });
                notify('updated');
                close();
            }
        } catch (error) {
            console.error('An error occurred while creating an entry: ', error);
        }
    };

    const notify = (operation: 'added' | 'updated') => {
        const tournament = tournaments.find((t) => t._id === formValues.tournamentId);
        const addedMessage = `The Entry has been successfully added to the ${tournament.name} tournament.`;
        const updatedMessage = 'The Entry has been successfully updated.';
        dispatch(
            openAlert({
                type: AlertTypes.Success,
                message: operation === 'added' ? addedMessage : updatedMessage,
            })
        );
    };

    const close = () => {
        setFormValues(initialState);
        closeEntryCreate();
    };

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <Modal title={entryId ? 'Create Entry' : 'Edit Entry'} isOpen={isEntryCreateOpen} close={close}>
            <form onSubmit={handleSubmit}>

                <Spacing top="xs" bottom="xs">
                    <Text>Score</Text>
                    <Spacing bottom="xs" />
                    <InputText name="score" onChange={handleChange} value={formValues.score} placeholder={0} />
                </Spacing>

                <Spacing bottom="xs">
                    <Text>Position</Text>
                    <Spacing bottom="xs" />
                    <InputText name="position" onChange={handleChange} value={formValues.position} placeholder={1} />
                </Spacing>

                <Spacing top="sm" />

                <Text size="md">Edit entry?</Text>

                <Spacing top="sm" bottom="sm" />

                <Button
                    main    
                    fullWidth
                    type="submit"
                    color="primary"
                    disabled={isEntryCreateLoading || isEntryUpdateLoading}
                >Confirm</Button>
            </form>
        </Modal>
    );
};

export default EntryEdit;