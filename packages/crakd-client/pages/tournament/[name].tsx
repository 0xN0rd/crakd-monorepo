import { FC, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Layout from '../../components/Layout';
import { EntryCreateButton } from '../../components/Entry';
import EntryCardPopover from '../../components/Entry/EntryCard';
import { TournamentPopover } from '../../components/Tournament';
import EntryEdit from '../../components/EntryCreate/EntryEdit';
import { Container, LoadingDots, Skeleton, Spacing, Button, Text, Empty, H2 } from '../../components/ui';
import {
    TableContainer,
    Table,
    Tr,
    Th,
    Td,
} from '../../components/Settings/SettingsUsers/style';
import { RootState } from '../../store';
import { Tournament as TournamentType, DataLimit, Entry, UserRole } from '../../constants';
import Seo from '../../components/Seo';
import { GetServerSideProps } from 'next';
import { TournamentInfo } from '../../components/Tournament';
import { TournamentIcon } from '../../components/ui/icons';
import { openAuthPopup, PopupType } from '../../store/auth';
import { useInfiniteScroll } from '../../utils';
import { userInfo } from 'os';

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
    const [isEntryCreateOpen, setIsEntryCreateOpen] = useState(false);
    const dispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.auth.user);

    const { data: entries, isFetching: isEntriesFetching, isFetchingNextPage: isFetchingNextPage } = useInfiniteScroll({
        key: ['entriesByTournamentName', tournament._id],
        apiCall: fetchEntriesByTournamentId,
        dataLimit: DataLimit.EntriesByTournamentName,
    });

    const openAuthModal = () => {
        dispatch(openAuthPopup(PopupType.Log_In));
    };

    const openEntryCreate = () => {
        setIsEntryCreateOpen(true);
    }

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

            {isEntryCreateOpen && (
                <EntryEdit
                    isEntryCreateOpen={isEntryCreateOpen}
                    closeEntryCreate={() => setIsEntryCreateOpen(false)}
                    entryId={entries._id}
                    tournamentId={tournament?._id}
                    queryKey={['entriesByTournamentName', tournament._id]}
                />
            )}

            {!authUser && (
                <Spacing bottom="sm">
                    <Container centered padding="lg" bgColor="black" shadow="sm">
                        <TournamentIcon width="40" />

                        <Spacing top="sm">
                            <Button main inline onClick={openAuthModal} color="primary">
                               Login
                            </Button>

                            <Spacing top="sm">
                                <Text>To enter {tournament.name} tournament.</Text>
                            </Spacing>
                        </Spacing>
                    </Container>
                </Spacing>
            )}

            {isEntriesLoading ? (
                <Skeleton height={300} count={6} bottom="sm" />
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <thead>
                                <Tr>
                                    <Th>Position</Th>
                                    <Th>Username</Th>
                                    <Th>Gamertag</Th>
                                    <Th>Score</Th>
                                </Tr>
                            </thead>

                            {entries?.pages?.map((entries, i) => {
                                return (
                                    <tbody key={i}>
                                        {entries?.sort((a, b) => a.score > b.score ? -1 : 1).map((entry: Entry) => (
                                            <Tr key={entry._id}>
                                                <Td>{entry.position}</Td>
                                                <Td>{entry.user.username}</Td>
                                                <Td>{entry.user.gamertag}</Td>
                                                <Td>{entry.score}</Td>
                                                <Td>
                                                    {authUser?.role === UserRole.SuperAdmin && (
                                                        <TournamentPopover queryKey={['entriesByUserId', entry.user._id]} key={entry._id} entryId={entry._id} tournamentId={tournament._id} openEntryCreate={openEntryCreate} />
                                                    )}
                                                </Td>
                                            </Tr>
                                        ))}
                                    </tbody>
                                )
                            })}
                        </Table>
                    </TableContainer>

                    {isEmpty && (
                        <Container centered>
                            <Text color="textSecondary">No entries yet.</Text>
                        </Container>
                    )}
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