import { FC } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { EntryCard } from '../../components/Entry';
import { Container } from '../../components/ui';
import Seo from '../../components/Seo';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';

const fetchEntry = async ({ queryKey }) => {
    const [, entryId] = queryKey;
    const { data } = await axios.get(`/entries/${entryId}`);
    return data;
};

interface EntryPageProps {
    entry: any;
}

const EntryPage: FC<EntryPageProps> = ({ entry }) => {
    const { data, refetch } = useQuery(['entry', entry._id], fetchEntry, { initialData: entry });

    return (
        <Layout hideRightSidebar marginTop="none">
            <Seo title={entry.tournament} />

            <Container maxWidth="md" marginTop="sm">
                <EntryCard
                    refetch={refetch}
                    disableNavigation
                    displayTournamentName
                    queryKey={['entry', data._id]}
                    entry={data}
                />
            </Container>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const entry = await fetchEntry({ queryKey: ['entry', params.id] });
    return {
        props: {
            entry,
        },
    };
};

export default EntryPage;