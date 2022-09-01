import { FC } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { RootState } from '../store';
import { Container, Button, Spacing, Text, Link } from '../components/ui';
import {
    TableContainer,
    Table,
    Tr,
    Th,
    Td,
} from '../components/Settings/SettingsUsers/style';
import { CheckColorfulIcon } from '../components/ui/icons';
import { useBreakpoints } from '../utils';
import { openAuthPopup, PopupType } from '../store/auth';
import Seo from '../components/Seo';

const ConditionTd = styled(Td)`
    padding: 8px;
    border-bottom: 1px solid #f4f4f725;
`;

const SmallConditionTd = styled(Td)`
    font-size: 0.75em;
    padding: 8px;
    border-bottom: 1px solid #f4f4f725;
`;

const StyledTd = styled(Td)`
    text-align: center;
    padding: 8px;
    border-bottom: 1px solid #f4f4f725;
`;

const StyledTh = styled(Th)`
    font-size: 0.9em;
    text-align: center;
`;

const COMPARISON = [
    {
        condition: 'Play against your friends',
        crakd: <CheckColorfulIcon />,
        trad: <CheckColorfulIcon />,
    },
    {
        condition: 'Pick new contests each week',
        crakd: <CheckColorfulIcon />,
        trad: <CheckColorfulIcon />,
    },
    {
        condition: 'Enter multiple contests per week',
        crakd: <CheckColorfulIcon />,
        trad: '',
    },
    {
        condition: 'Choose when you want to play',
        crakd: <CheckColorfulIcon />,
        trad: '',
    },
    {
        condition: 'Win cash prizes',
        crakd: <CheckColorfulIcon />,
        trad: '',
    },
    {
        condition: 'Find a team to play in an event',
        crakd: '',
        trad: <CheckColorfulIcon />,
    },
    {
        condition: 'Travel to in-person events',
        crakd: '',
        trad: <CheckColorfulIcon />,
    },
]

const Home: FC = () => {
    const dispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.auth.user);
    const breakpoint = useBreakpoints();

    const isSmallScreen = breakpoint === 'xs' || breakpoint === 'sm';

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

                    

                        <Spacing top="sm" bottom="xl">
                            <Spacing top="sm" bottom="sm">
                                <Text size="lg">
                                    Play your favorite game with Crakd.
                                    Enter one or multiple contests every week.
                                    Get cracked and take home cash prizes.
                                </Text>
                            </Spacing>
                            {!authUser && (
                                <Button main inline onClick={openAuthModal} weight="bold" color="primaryGradient">
                                    Join Now
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

                <Spacing bottom="xl" />

                <Features />

                <Container centered padding="lg">
                    {!authUser && (
                        <Button main inline onClick={openAuthModal} weight="bold" color="primaryGradient">
                            Join Now
                        </Button>
                    )}
                    {authUser && (
                        <Link href="/tournaments" disableBorderOnHover>
                            <Button main inline weight="bold">
                                Start Winning
                            </Button>
                        </Link>
                    )}
                </Container>
                
            </div>

            <Spacing bottom="xl" />

            {!isSmallScreen && (
                <div>
                    <Spacing bottom="xl">
                        <TableContainer>
                            <Table>
                                <thead>
                                    <Tr>
                                        <Th></Th>
                                        <Th>Crakd</Th>
                                        <Th>Traditional Tournaments</Th>
                                    </Tr>
                                </thead>

                                {COMPARISON.map((comp, i) => {
                                    return (
                                        <tbody key={i}>
                                            <Tr>
                                                <ConditionTd>{comp.condition}</ConditionTd>
                                                <StyledTd>{comp.crakd}</StyledTd>
                                                <StyledTd>{comp.trad}</StyledTd>
                                            </Tr>
                                        </tbody>
                                    );
                                })}
                            </Table>
                        </TableContainer>
                    </Spacing>
                </div>
            )}
            {isSmallScreen && (
                <div>
                    <Spacing bottom="xl">
                        <TableContainer>
                            <Table>
                                <thead>
                                    <Tr>
                                        <Th></Th>
                                        <StyledTh>Crakd</StyledTh>
                                        <StyledTh>Traditional<br />Tournaments</StyledTh>
                                    </Tr>
                                </thead>

                                {COMPARISON.map((comp, i) => {
                                    return (
                                        <tbody key={i}>
                                            <Tr>
                                                <SmallConditionTd>{comp.condition}</SmallConditionTd>
                                                <StyledTd>{comp.crakd}</StyledTd>
                                                <StyledTd>{comp.trad}</StyledTd>
                                            </Tr>
                                        </tbody>
                                    );
                                })}
                            </Table>
                        </TableContainer>
                    </Spacing>
                </div>
            )}

            <div>
                <Container centered padding="lg" bgColor="black" shadow="sm">
                    <Spacing top="sm" bottom="xl">
                        <Spacing top="sm" bottom="sm">
                            <Text size="lg">{!authUser && 'Join and'} Do you have questions? </Text>
                            <Spacing top="xs" />
                            <Text size="lg">Check out the FAQ!</Text>
                        </Spacing>
                        <Link href="/faq" disableBorderOnHover>
                            <Button main inline weight="bold">
                                Learn More
                            </Button>
                        </Link>
                    </Spacing>
                </Container>
            </div>

            <Spacing bottom="xl" />
        </Layout>
    );
};

export default Home;