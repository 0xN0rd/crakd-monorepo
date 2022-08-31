import { FC } from 'react';
import Seo from '../components/Seo';
import { NotFound } from '../components/ui';

const NotFoundPage: FC = () => {
    return (
        <>
            <Seo title="Not Found" image="https://i.imgur.com/gyUSwee.png/" />
            <NotFound message="We can't find the pafe you're looking for." />
        </>
    );
};

export default NotFoundPage;