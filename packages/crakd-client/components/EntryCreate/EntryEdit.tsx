import { FC, FormEvent, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { Tournament } from '../../constants';
import { Spacing, Button, Modal, InputText, Select, Text } from '../ui';
import { SelectContainer } from './style';
import { AlertTypes, openAlert } from '../../store/alert';
import { updateCache } from './cache';

const createEntry = async ({ score, position, gamertag, platform, region, tournamentId }) => {
    const newEntry = await axios.post('/entries/create', {
        score: score,
        position: position,
        gamertag: gamertag,
        platform: platform,
        region: region,
        tournamentId: tournamentId,
    });
    console.log(newEntry);
    return newEntry.data;
};

const updateEntry = async ({ entryId, score, position, gamertag, platform, region, tournamentId }) => {
    const updatedEntry = await axios.put('/entries/update', {
        entryId: entryId,
        score: score,
        position: position,
        gamertag: gamertag,
        platform: platform,
        region: region,
        tournamentId: tournamentId,
    });
    return updatedEntry.data;
};

interface EntryCreateProps {
    isEntryCreateOpen: boolean;
    entryId?: string;
    score?: number;
    position?: number;
    gamertag?: string;
    platform?: string;
    region?: string;
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
    gamertag,
    platform,
    region,
    queryKey,
}) => {
    const queryClient = useQueryClient();
    const tournaments: Tournament[] = queryClient.getQueryData(['tournaments']);
    const dispatch = useDispatch();
    const initialState = {
        score: score || 0,
        position: position || 1,
        gamertag: gamertag || '',
        platform: platform || '',
        region: region || '',
        tournamentId: tournamentId ? tournamentId : tournaments && tournaments[0]?._id,
    };
    const [formValues, setFormValues] = useState<{
        score: number;
        position: number;
        gamertag: string;
        platform: string;
        region: string;
        tournamentId: string;
    }>(initialState);
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
                    gamertag: formValues.gamertag,
                    platform: formValues.platform,
                    region: formValues.region,
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

                <Spacing top="xs" bottom="sm">
                    <Text>Gamertag</Text>
                    <Spacing bottom="xs" />
                    <InputText name="gamertag" onChange={handleChange} value={formValues.gamertag} placeholder="Enter gamertag" />
                </Spacing>

                <Spacing top="xs" bottom="sm">
                    <Text>Platform</Text>
                    <SelectContainer>
                        <Select onChange={handleChange} name="platform" defaultValue="select">
                            <option value="Select">Select</option>
                            <option value="Xbox">Xbox</option>
                            <option value="Playstation">Playstation</option>
                            <option value="PC">PC</option>
                        </Select>
                    </SelectContainer>
                </Spacing>

                <Spacing top="xs" bottom="xs">
                    <Text>Region</Text>
                    <SelectContainer>
                        <Select onChange={handleChange} name="region" defaultValue="Select">
                            <option value="Select">Select</option>
                            <option value="NA">NA</option>
                            <option value="EU">EU</option>
                            <option value="LatAm">LatAm</option>
                            <option value="Asia">Asia</option>
                            <option value="Oceania">Oceania</option>
                        </Select>
                    </SelectContainer>
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