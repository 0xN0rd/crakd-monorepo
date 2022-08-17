import { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { RootState } from '../store';
import { Container, Button, Spacing, Text } from '../components/ui';
import { openAuthPopup, PopupType } from '../store/auth';
import { CommunityIcon } from '../components/ui/icons';
import Seo from '../components/Seo';

const Home: FC = () => {
    const dispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.auth.user);

    const openAuthModal = () => {
        dispatch(openAuthPopup(PopupType.Sign_Up));
    };

    return (
        <Layout>
            <Seo title="Home" />
            <div>
                <Container centered padding="lg" bgColor="black" shadow="sm">

                    <CommunityIcon width="40" />

                    <Spacing top="sm">
                        {!authUser && (
                            <Button main inline onClick={openAuthModal} weight="bold" color="primaryGradient">
                                Sign up
                            </Button>
                        )}
                        <Spacing top="sm">
                            <Text>{!authUser && 'And'} Enter tournaments to win real prizes.</Text>
                        </Spacing>
                    </Spacing>
                </Container>
            </div>
        </Layout>
    );
};

export default Home;