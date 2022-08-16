import { FC, FormEvent, useState, Fragment } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { Tournament } from '../../constants';
import { Spacing, Button, Modal, Select, Avatar } from '../ui';
import { SelectContainer } from './style';
import { RootState } from '../../store';
import { AlertTypes, openAlert } from '../../store/alert';
import { updateCache } from './cache';

const config = {
    headers: {
        'content-type': 'multipart/form-data',
    },
};

const createEntry = async ({ score, position, tournamentId }) => {
    const formData = new FormData();
    formData.append('score', score);
    formData.append('position', position);
    formData.append('tournamentId', tournamentId);

    const newEntry = await axios.post('/entries/create', formData, config);
    return newEntry.data;
};

const updateEntry = async ({ entryId, score, position, tournamentId }) => {
    const formData = new FormData();
    formData.append('entryId', entryId);
    formData.append('score', score);
    formData.append('position', position);
    formData.append('tournamentId', tournamentId);

    const updatedEntry = await axios.put('/entries/update', formData, config);
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

const EntryCreate: FC<EntryCreateProps> = ({
    isEntryCreateOpen,
    closeEntryCreate,
    tournamentId,
    entryId,
    score,
    position,
    queryKey,
}) => {
    const authUser = useSelector((state: RootState) => state.auth.user);
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

    const isFormValid = () => {
        const { score, position } = formValues;
        return score || position;
    };

    return (
        <Modal title={entryId ? 'Edit Entry' : 'Create Entry'} isOpen={isEntryCreateOpen} close={close}>
            <form onSubmit={handleSubmit}>
                <SelectContainer>
                    <Avatar size={1.25} image={authUser.image} />
                    <Spacing left="sm">
                        <Select onChange={handleChange} name="tournamentId" defaultValue={tournamentId && tournamentId}>
                            {tournaments?.map((tournament: Tournament) => (
                                <Fragment key={tournament._id}>
                                    <option value={tournament._id}>{tournament.name}</option>
                                </Fragment>
                            ))}
                        </Select>
                    </Spacing>
                </SelectContainer>

                <Spacing top="xs" bottom="xxs" />

                <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    disabled={isEntryCreateLoading || isEntryUpdateLoading}
                >Enter</Button>
            </form>
        </Modal>
    );
};

export default EntryCreate;
