import { FC, useState } from 'react';
import { Button, Avatar } from '../../ui';
import { Root, Container } from './style';
import EntryCreate from '../../EntryCreate';
import { Tournament } from '../../../constants';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { AlertTypes, openAlert } from '../../../store/alert';
import { RootState } from '../../../store';

interface EntryCreateButtonProps {
    tournament?: Tournament;
    queryKey: any;
}

const EntryCreateButton: FC<EntryCreateButtonProps> = ({ tournament, queryKey }) => {
    const [isEntryCreateOpen, setIsEntryCreateOpen] = useState(false);
    const authUser = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const tournaments: Tournament[] = queryClient.getQueryData(['tournaments']);

    const onClick = () => {
        if (Array.isArray(tournaments) && tournaments.length > 0) {
            setIsEntryCreateOpen(true);
            return;
        }

        dispatch(
            openAlert({
                type: AlertTypes.Error,
                message: 'To create an entry, please first create a tournament.'
            })
        );
    };

    return (
        <Root>
            <Avatar image={authUser?.image} size={1.25} isOnline />
            {isEntryCreateOpen && (
                <EntryCreate
                    tournamentId={tournament?._id}
                    isEntryCreateOpen={isEntryCreateOpen}
                    closeEntryCreate={() => setIsEntryCreateOpen(false)}
                    queryKey={queryKey}
                />
            )}
            <Button ghost fullWidth onClick={onClick}>
                <Container>Click here to enter tournament!</Container>
            </Button>
        </Root>
    );
};

export default EntryCreateButton;