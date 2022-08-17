import React, { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import EntryCardPopover from './EntryCardPopover';
import {
    Root,
    Image,
    TitleContainer,
    Title,
    Top,
    Author,
    Name,
    CreatedAt,
    StyledButton,
} from './style';
import { Spacing, Avatar, Button, Link, Text } from '../../ui';
import { RootState } from '../../../store';
import { Entry, UserRole } from '../../../constants';
import { timeAgo } from '../../../utils';
import useClickOutside from '../../../utils/useClickOutside';
import SeeMore from '../../SeeMore';
import TournamentsPage from '../../../pages/tournaments';

interface EntryCardProps {
    entry: Entry;
    queryKey: any;
    displayTournamentName?: boolean;
    refetch?: any;
    disableNavigation?: boolean;
}

const EntryCard: FC<EntryCardProps> = ({
    entry,
    queryKey,
    displayTournamentName,
    disableNavigation,
    refetch,
}) => {
    const authUser = useSelector((state: RootState) => state.auth.user);
    const entryCardTitle = (
        <Title>
            <SeeMore>{entry.tournament?.name}</SeeMore>
        </Title>
    );

    return (
        <Root>
            <Top>
                <Author>
                    <Link disableBorderOnHover href={`/profile/${entry.user?._id}`}>
                        <Avatar image={entry.user?.image} size={1.25} />
                    </Link>

                    <Spacing left="xs">
                        <Link href={`/profile/${entry.user?._id}`} color="text">
                            <Name>{entry.user?.gamertag} </Name>
                        </Link>
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
            </Top>
        </Root>
    );
};

export default EntryCard;