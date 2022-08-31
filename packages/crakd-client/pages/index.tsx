import { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { RootState } from '../store';
import { Container, Button, Spacing, Text, Link } from '../components/ui';
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
            <Seo title="Home" image="https://i.imgur.com/gyUSwee.png" />
            <div>
                <Hero />

                <div className="appear appear-fifth">
                    <Container centered padding="lg" bgColor="black" shadow="sm">

                    

                        <Spacing top="sm">
                            <Spacing top="sm" bottom="sm">
                                <Text size="lg">{!authUser && 'Join and'} Enter weekly tournaments </Text>
                                <Spacing top="xs" />
                                <Text size="lg">for solo queue players.</Text>
                            </Spacing>
                            {!authUser && (
                                <Button main inline onClick={openAuthModal} weight="bold" color="primaryGradient">
                                    Sign up
                                </Button>
                            )}
                            {authUser && (
                                <Link href="/tournaments" disableBorderOnHover>
                                    <Button main inline weight="bold">
                                        Start Winning
                                    </Button>
                                </Link>
                            )}
                        </Spacing>
                    </Container>
                </div>
                
            </div>
        </Layout>
    );
};

export default Home;