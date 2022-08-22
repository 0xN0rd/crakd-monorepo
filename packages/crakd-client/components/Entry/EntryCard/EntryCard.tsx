import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import EntryCardPopover from './EntryCardPopover';
import {
    Root,
    Top,
    Author,
    Name,
    CreatedAt,
} from './style';
import { Spacing, Avatar, Button, Link, Text } from '../../ui';
import { RootState } from '../../../store';
import { Entry, UserRole } from '../../../constants';
import EntryCreate from '../../EntryCreate';
import { timeAgo } from '../../../utils';

interface EntryCardProps {
    entry: Entry;
    queryKey: any;
    displayTournamentName?: boolean;
    refetch?: any;
}

const EntryCard: FC<EntryCardProps> = ({
    entry,
    queryKey,
    displayTournamentName,
    refetch,
}) => {
    const authUser = useSelector((state: RootState) => state.auth.user);
    const [isEntryCreateOpen, setIsEntryCreateOpen] = useState(false);
    console.log(entry);

    return (
        <Root>
            {authUser && isEntryCreateOpen && (
                <EntryCreate
                    isEntryCreateOpen={isEntryCreateOpen}
                    closeEntryCreate={() => setIsEntryCreateOpen(false)}
                    entryId={entry._id}
                    tournamentId={entry.tournament?._id}
                    queryKey={queryKey}
                />
            )}

            <Top>
                <Author>
                    <Link disableBorderOnHover href={`/profile/${entry.user?._id}`}>
                        <Avatar image={entry.user?.image} size={1.25} />
                    </Link>

                    <Spacing left="xs">
                        <Link href={`/profile/${entry.user?._id}`} color="text">
                            <Name>{entry.user?.gamertag} </Name>
                        </Link>

                        <Spacing left="lg" />
                        <Text>Position:</Text>{' '}
                        <Text>{entry.position}</Text>

                        <Spacing left="lg" />
                        <Text>Score:</Text>{' '}
                        <Text>{entry.score}</Text>
                        <CreatedAt>
                            {timeAgo(entry.createdAt)}
                            {displayTournamentName && (
                                <>
                                    {' '}
                                    &middot;{' '}
                                    <Link color="textSecondary" size="tiny" href={`/tournament/${entry.tournament?.name}`}>
                                        {entry.tournament?.format} - {entry.tournament?.duration}
                                    </Link>{' '}
                                </>
                            )}
                        </CreatedAt>
                    </Spacing>
                </Author>

                {(authUser?.role === UserRole.SuperAdmin) && (
                    <EntryCardPopover
                        queryKey={queryKey}
                        entryId={entry._id}
                        tournamentId={entry.tournament?._id}
                        openEntryCreate={() => setIsEntryCreateOpen(true)}
                        refetch={refetch}
                    />
                )}
            </Top>
        </Root>
    );
};

export default EntryCard;