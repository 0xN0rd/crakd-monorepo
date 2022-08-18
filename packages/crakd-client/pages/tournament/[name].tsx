import { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Layout from '../../components/Layout';
import { EntryCard, EntryCreateButton } from '../../components/Entry';
import { Container, LoadingDots, Skeleton, Spacing, Button, Text, Empty } from '../../components/ui';
import { RootState } from '../../store';
import { Tournament as TournamentType, DataLimit, Entry } from '../../constants';
import Seo from '../../components/Seo';
import { GetServerSideProps } from 'next';
import { TournamentInfo } from '../../components/Tournament';
import { CommunityIcon } from '../../components/ui/icons';
import { openAuthPopup, PopupType } from '../../store/auth';
import { useInfiniteScroll } from '../../utils';

const fetchTournamentByName = async ( tournamentName: string ) => {
    const { data } = await axios.get(`/tournaments/${tournamentName}`);
    return data;
};

const fetchEntriesByTournamentId = async ({ queryKey, pageParam = 0 }) => {
    const [, tournamentId] = queryKey;
    const { data } = await axios.get(
        `/entries/tournament/${tournamentId}?offset=${pageParam}&limit=${DataLimit.EntriesByTournamentName}`
    );
    return data;
};

interface TournamentPageProps {
    tournament: TournamentType;
}

const TournamentPage: FC<TournamentPageProps> = ({ tournament }) => {
    const dispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.auth.user);

    const { data: entries, isFetching: isEntriesFetching, isFetchingNextPage: isFetchingNextPage, refetch } = useInfiniteScroll({
        key: ['entriesByTournamentName', tournament._id],
        apiCall: fetchEntriesByTournamentId,
        dataLimit: DataLimit.EntriesByTournamentName,
    });

    const openAuthModal = () => {
        dispatch(openAuthPopup(PopupType.Sign_Up));
    };

    const isEntriesLoading = isEntriesFetching && !isFetchingNextPage;
    const isEmpty = !entries?.pages[0] || entries.pages.every((e) => e.length === 0);

    if (!tournament) {
        return (
            <Layout marginTop="none" hideRightSidebar containerMaxWidth="xl">
                <Container centered padding="lg">
                    <Empty>Oops! Tournament not found.</Empty>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Seo title={tournament.name} />
            <Spacing bottom="sm">
                <TournamentInfo name={tournament.name} description={tournament.description} format={tournament.format} duration={tournament.duration} />
            </Spacing>

            {authUser && <EntryCreateButton queryKey={['entriesByTournamentName', tournament._id]} tournament={tournament} />}

            {!authUser && (
                <Spacing bottom="sm">
                    <Container centered padding="lg" bgColor="black" shadow="sm">
                        <CommunityIcon width="40" />

                        <Spacing top="sm">
                            <Button main inline onClick={openAuthModal} color="primary">
                                Sign Up
                            </Button>

                            <Spacing top="sm">
                                <Text>To enter in {tournament.name} tournament.</Text>
                            </Spacing>
                        </Spacing>
                    </Container>
                </Spacing>
            )}

            {isEntriesLoading ? (
                <Skeleton height={300} count={6} bottom="sm" />
            ) : (
                <>
                    {isEmpty && (
                        <Container centered>
                            <Text color="textSecondary">No entries yet.</Text>
                        </Container>
                    )}

                    <div>
                        {entries?.pages?.map((entries, i) => {
                            return (
                                <Fragment key={i}>
                                    {entries?.map((entry: Entry) => (
                                        <EntryCard refetch={refetch} queryKey={['entriesByTournamentName', tournament._id]} key={entry._id} entry={entry} />
                                    ))}
                                </Fragment>
                            );
                        })}

                        {isFetchingNextPage && <LoadingDots />}
                    </div>
                </>
            )}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const tournament = await fetchTournamentByName(params.name as string);
    return {
        props: {
            tournament: tournament
        }
    };
};

export default TournamentPage;