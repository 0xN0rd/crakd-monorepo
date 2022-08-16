import { FC, Fragment } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Layout from '../../components/Layout';
import Profile from '../../components/Profile';
import { EntryCard } from '../../components/Entry';
import { DataLimit, Entry } from '../../constants';
import { useInfiniteScroll } from '../../utils';
import { Container, Empty, LoadingDots, Skeleton, Spacing, Text } from '../../components/ui';
import Seo from '../../components/Seo';
import { GetServerSideProps } from 'next';

const fetchUser = async ({ queryKey }) => {
    const [, id] = queryKey;
    const { data } = await axios.get(`/users/${id}`);
    return data;
};

const fetchEntriesbyUserId = async ({ queryKey, pageParam = 0 }) => {
    const [, userId] = queryKey;
    const { data } = await axios.get(`/entries/user/${userId}?offset=${pageParam}&limit=${DataLimit.EntriesByUserId}`);
    return data;
};

interface ProfilePageProps {
    user: any;
}

const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
    const {
        data: entries,
        isFetching: isEntriesFetching,
        isFetchingNextPage: isFetchingNextEntries,
        refetch,
    } = useInfiniteScroll({
        key: ['entriesByUserId', user._id],
        apiCall: fetchEntriesbyUserId,
        dataLimit: DataLimit.EntriesByUserId,
    });

    const authUser = useSelector((state: RootState) => state.auth.user);
    
    const isEntriesLoading = isEntriesFetching && !isFetchingNextEntries;
    const isEmpty = !entries?.pages[0] || entries.pages.every((e) => e.length === 0);

    if (!user) {
        return (
            <Layout marginTop="none" hideRightSidebar containerMaxWidth="xl">
                <Container centered padding="lg">
                    <Empty>Oops! User not found.</Empty>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout marginTop="none" hideRightSidebar containerMaxWidth="xl">
            <>
                <Seo title={user.gamertag} image={user.image} />
                <Profile user={user} queryKey={['userById', user._id]} />
                <Spacing bottom="sm" />
                <Container maxWidth="sm">
                    {isEntriesLoading ? (
                        <Skeleton height={300} count={6} bottom="sm" />
                    ) : (
                        <>
                            {isEmpty && (
                                <Container centered>
                                    <Text color="textSecondary">{user.gamertag} has not entered any tournaments yet.</Text>
                                </Container>
                            )}

                            {entries?.pages?.map((entries, i) => {
                                return (
                                    <Fragment key={i}>
                                        {entries?.map((entry: Entry) => (
                                            <EntryCard
                                                refetch={refetch}
                                                displayTournamentName
                                                queryKey={['entriesByUserId', user._id]}
                                                key={entry._id}
                                                entry={entry}
                                            />
                                        ))}
                                    </Fragment>
                                );
                            })}

                            {isFetchingNextEntries && <LoadingDots />}
                        </>
                    )}
                </Container>
            </>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const user = await fetchUser({ queryKey: ['user', params.id] });
    return {
        props: {
            user,
        },
    };
};

export default ProfilePage;