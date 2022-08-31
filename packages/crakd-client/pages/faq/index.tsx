import React, { FC } from 'react';
import Layout from '../../components/Layout';
import FAQ from '../../components/FAQ';

const FAQPage: FC = () => {
    return (
        <Layout containerMaxWidth="xl">
            <FAQ />
        </Layout>
    )
};

export default FAQPage;