import axios from 'axios';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Avatar, H3, Spacing, Link, Text, Skeleton } from '../ui';
import { Root, PersonContainer, Person, Heading } from './style';

const fetchOnlineUsers = async () => {
    const { data } = await axios.get('/users/online-users');
    return data;
};

const fetchNewUsers = async () => {
    const { data } = await axios.get('/users/new-users');
    return data;
};

const REFETCH_INTERVAL = 10000;

const RightSideBar: FC = () => {
    const {
        data: onlineUsers,
        isFetching: isFetchingOnlineUsers,
        isRefetching: isReFetchingOnlineUsers,
    } = useQuery('onlineUsers', fetchOnlineUsers, {
        refetchInterval: REFETCH_INTERVAL,
    });
    const { data: newUsers, isFetching: isFetchingNewUsers } = useQuery('newUsers', fetchNewUsers);

    const noOnlineUsers = !onlineUsers || onlineUsers?.length === 0;
    const noNewUsers = !newUsers || newUsers?.length === 0;

    const renderList = (list: any, displayIsOnline: boolean) => {
        return list.map((user: any) => (
            <PersonContainer key={user._id}>
                <Link href={`/profile/${user._id}`} disableBorderOnHover>
                    <Person>
                        <Avatar
                            size={1.1}
                            image={user.image}
                            fullName={user.gamertag}
                            isOnline={displayIsOnline ? user.isOnline : false}
                        />
                        <Spacing right="xs" />
                    </Person>
                </Link>
            </PersonContainer>
        ));
    };

    return (
        <Root>
            <Heading>
                <H3>New Users</H3>
            </Heading>

            {!isFetchingNewUsers && noNewUsers && (
                <Spacing top="sm">
                    <Text color="textSecondary">No new users.</Text>
                </Spacing>
            )}

            {newUsers && <Spacing top="xs" />}

            {isFetchingNewUsers ? <Skeleton count={3} height={36} top="xs" /> : newUsers && renderList(newUsers, false)}

            <Spacing top="md">
                <Heading>
                    <H3>Online Users</H3>
                </Heading>
            </Spacing>

            {!isFetchingOnlineUsers && noOnlineUsers && (
                <Spacing top="sm">
                    <Text color="textSecondary">No users are online.</Text>
                </Spacing>
            )}

            {onlineUsers && <Spacing top="xs" />}

            {isFetchingOnlineUsers && !isReFetchingOnlineUsers ? (
                <Skeleton count={3} height={36} top="xs" />
            ) : (
                onlineUsers && renderList(onlineUsers, true)
            )}
        </Root>
    );
};

export default RightSideBar;