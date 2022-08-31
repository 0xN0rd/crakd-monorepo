import React, { FC, Fragment } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Wrapper } from '../../components/Users/style';
import TournamentsCard from '../../components/Tournaments/TournamentsCard';
import { useInfiniteScroll } from '../../utils';
import { DataLimit } from '../../constants';
import { LoadingDots, Container, Empty, Skeleton } from '../../components/ui';
import Seo from '../../components/Seo';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const fetchTournaments = async () => {
    const { data } = await axios.get(`/tournaments`);
    return data;
};

const TournamentsPage: FC = () => {
    const { isEmailVerificationRequired } = useSelector((state: RootState) => state.settings);
    const { data, isFetching, isFetchingNextPage } = useInfiniteScroll({
        key: ['tournaments', isEmailVerificationRequired],
        apiCall: fetchTournaments,
        dataLimit: DataLimit.Users,
    });

    const isEmpty = !data?.pages[0] || data.pages[0].length === 0;

    if (isFetching && !isFetchingNextPage) {
        return (
            <Layout hideRightSidebar containerMaxWidth="md">
                <Wrapper>
                    <Skeleton count={12} height={270} />
                </Wrapper>
            </Layout>
        );
    }

    if (isEmpty) {
        return (
            <Layout hideRightSidebar containerMaxWidth="md">
                <Container centered padding="lg">
                    <Empty>
                        <div>No tournaments yet.</div>
                    </Empty>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout hideRightSidebar containerMaxWidth="md">
            <Seo title="Tournaments" image="https://i.imgur.com/gyUSwee.png" />
            <Wrapper>
                {data?.pages?.map((tournaments, i) => {
                    return (
                        <Fragment key={i}>
                            {tournaments?.map((tournament: any) => (
                                <TournamentsCard key={tournament._id} queryKey={['tournaments']} tournament={tournament} />
                            ))}
                        </Fragment>
                    );
                })}
                {isFetchingNextPage && <LoadingDots />}
            </Wrapper>
        </Layout>
    );
};

export default TournamentsPage;