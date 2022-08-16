import { FC, FormEvent, useEffect, useState } from 'react';
import { InputText, Spacing, P, Toggle, Button, Text, TextAreaAutoSize } from '../ui';
import { LabelAndToggle, ButtonContainer } from './style';
import { Tournament } from '../../constants';

export enum TournamentFormMode {
    Create,
    Edit,
}

export interface ITournamentForm {
    name: string;
    authRequired: boolean;
    format: string;
    duration: string;
}

interface TournamentFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>, formValues: any) => Promise<void>;
    loading: boolean;
    tournament?: Tournament;
    mode: TournamentFormMode;
    closeModal: () => void;
    apiErrorMessage?: string;
}

const TournamentForm: FC<TournamentFormProps> = ({ tournament, loading, closeModal, onSubmit, mode, apiErrorMessage }) => {
    const initialState = {
        name: tournament?.name || '',
        authRequired: tournament?.authRequired || false,
        description: tournament?.description || '',
        format: tournament?.format || '',
        duration: tournament?.duration || '',
    };
    const [formValues, setFormValues] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target as HTMLInputElement;
        if (name === 'authRequired') {
            setFormValues({ ...formValues, [name]: checked });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e, formValues);
    };

    useEffect(() => {
        const validateForm = () => {
            const { name } = formValues;

            const tournamentNameReg = /[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/;
            if (tournamentNameReg.test(name) || !name || name.length > 20) {
                setErrorMessage('Tournament names can only use letters, numbers, underscores, and periods by max character 20.');
                return;
            }

            setErrorMessage('');
        };

        validateForm();
    }, [formValues]);

    return (
        <form onSubmit={handleSubmit}>
            <Spacing top="sm" bottom="md">
                <InputText
                    autoFocus
                    label="Name"
                    onChange={handleChange}
                    value={formValues.name}
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="Choose a name for the tournament"
                />
            </Spacing>

            <Spacing top="sm" bottom="md">
                <TextAreaAutoSize
                    label="Description"
                    value={formValues.description}
                    onChange={handleChange}
                    name="description"
                    borderColor="main"
                    placeholder="Description of the tournament (optional)"
                />
            </Spacing>

            <Spacing top="sm" bottom="md">
                <LabelAndToggle>
                    <div>
                        <P weight="bold">Privacy</P>
                        <Spacing top="xs">
                            <P color="textSecondary">Only authenticated users can see this tournament.</P>
                        </Spacing>
                    </div>
                    <Toggle name="authRequired" checked={formValues.authRequired} onChange={handleChange} />
                </LabelAndToggle>
            </Spacing>

            <Spacing top="sm" bottom="md">
                <InputText
                    autoFocus
                    label="Format"
                    onChange={handleChange}
                    value={formValues.format}
                    type="text"
                    name="format"
                    autoComplete="off"
                    placeholder="Choose a format for the tournament"
                />
            </Spacing>

            <Spacing top="sm" bottom="md">
                <InputText
                    autoFocus
                    label="Duration"
                    onChange={handleChange}
                    value={formValues.duration}
                    type="text"
                    name="duration"
                    autoComplete="off"
                    placeholder="Choose a duration for the tournament"
                />
            </Spacing>

            {errorMessage && formValues.name.length > 0 && (
                <Spacing bottom="sm">
                    <Text color="error">{errorMessage}</Text>
                </Spacing>
            )}

            {apiErrorMessage && (
                <Spacing bottom="sm">
                    <Text color="error">{apiErrorMessage}</Text>
                </Spacing>
            )}

            <ButtonContainer>
                <Button type="button" text color="primary" onClick={closeModal}>
                    Cancel
                </Button>
                <Spacing right="sm" />

                <Button type="submit" color="primary" disabled={Boolean(errorMessage) || loading}>
                    {mode === TournamentFormMode.Create ? 'Create' : 'Update'}
                </Button>
            </ButtonContainer>
        </form>
    );
};

export default TournamentForm;