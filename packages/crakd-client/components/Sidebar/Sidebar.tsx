import { forwardRef, ForwardRefRenderFunction, useEffect, useState } from 'react';
import { List, arrayMove } from 'react-movable';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { UserRole } from '../../constants';
import { Button, ButtonLink, Divider, Modal, Spacing, Avatar } from '../ui';
import {
    PlusIcon,
    HouseColorfulIcon,
    PeopleColorfulIcon,
    TournamentColorfulIcon,
    DiscordIcon,
    TwitterIcon,
    DragIcon,
} from '../ui/icons';
import { Root, UL, LI, TournamentName, DragButton, SocialButton } from './style';
import TournamentPopover from './TournamentPopover';
import { useRouter } from 'next/router';
import { RootState } from '../../store';
import axios from 'axios';
import TournamentCreate from '../Tournament/TournamentCreate';

interface SidebarProps {
    isOpen: boolean;
}

const fetchTournaments = async () => {
    const { data } = await axios.get('/tournaments');
    return data;
};

const reorderTournaments = async ({ sortedTournaments }) => {
    const response = await axios.post('/tournaments/reorder', { sortedTournaments });
    return response;
};

const Sidebar: ForwardRefRenderFunction<HTMLDivElement, SidebarProps> = ({ isOpen }, ref) => {
    const authUser = useSelector((state: RootState) => state.auth.user);
    const [modal, setModal] = useState(false);
    const closeModal = () => setModal(false);
    const router = useRouter();

    const { data: tournaments } = useQuery('tournaments', fetchTournaments);
    const [tournamentItems, setTournamentItems] = useState([]);
    const { mutateAsync: reorderTournamentsMutation } = useMutation(reorderTournaments);
    const isAdmin = (authUser && authUser.role === UserRole.Admin) || (authUser && authUser.role === UserRole.SuperAdmin);

    useEffect(() => {
        if (tournaments) {
            setTournamentItems(tournaments);
        }
    }, [tournaments]);

    useEffect(() => {
        if (tournamentItems.length > 0 && isAdmin) {
            reorderTournamentsMutation({ sortedTournaments: tournamentItems });
        }
    }, [tournamentItems, reorderTournamentsMutation, isAdmin]);

    return (
        <Root ref={ref} isOpen={isOpen}>
            <Modal title="Create Tournament" isOpen={modal} close={closeModal}>
                <TournamentCreate closeModal={closeModal} tournaments={tournamentItems} />
            </Modal>

            <UL>
                {authUser && (
                    <LI>
                        <ButtonLink
                            fullWidth
                            radius="none"
                            href={`/profile/${authUser._id}`}
                            color="text"
                            active={router.query?._id === authUser._id}
                            size="sm"
                        >
                            <Avatar image={authUser.image} isActive={router.query?.id === authUser._id} />
                            <Spacing right="xs" />
                            {authUser.fullName}
                        </ButtonLink>
                    </LI>
                )}
                <LI>
                    <ButtonLink fullWidth radius="none" href="/" color="text" active={router.pathname === '/'} size="sm">
                        <HouseColorfulIcon color={router.pathname === '/' ? 'primary' : 'text'} />
                        {'\u00A0'}
                        {'\u00A0'} Home
                    </ButtonLink>
                </LI>
                <LI>
                    <ButtonLink
                        fullWidth
                        radius="none"
                        href="/tournaments"
                        color="text"
                        active={router.pathname === '/tournaments'}
                        size="sm"
                    >
                        <TournamentColorfulIcon width="30" color={router.pathname === '/tournaments' ? 'primary' : 'text'} />
                        {'\u00A0'}
                        {'\u00A0'} Tournaments
                    </ButtonLink>
                </LI>
                <LI>
                    <ButtonLink
                        fullWidth
                        radius="none"
                        href="/users"
                        color="text"
                        active={router.pathname === '/users'}
                        size="sm"
                    >
                        <PeopleColorfulIcon color={router.pathname === '/users' ? 'primary' : 'text'} />
                        {'\u00A0'}
                        {'\u00A0'} Users
                    </ButtonLink>
                </LI>

                <LI noHover>
                    <Spacing top="sm" left="xs" />
                    <Divider />
                </LI>
            </UL>

            {tournamentItems?.length > 0 && (
                <List
                    lockVertically
                    values={tournamentItems}
                    onChange={({ oldIndex, newIndex }) => {
                        setTournamentItems(arrayMove(tournamentItems, oldIndex, newIndex));
                    }}
                    renderList={({ children, props }) => <UL {...props}>{children}</UL>}
                    renderItem={({ value, props }) => {
                        return (
                            <LI {...props}>
                                <ButtonLink
                                    fullWidth
                                    radius="none"
                                    href={`/tournament/${value.name}`}
                                    color="text"
                                    active={value.name === router.query.name}
                                    size="sm"
                                >
                                    <TournamentName>{value.name}</TournamentName>
                                </ButtonLink>

                                {isAdmin && (
                                    <Spacing right="xxs">
                                        <DragButton ghost data-movable-handle tabIndex={-1}>
                                            <DragIcon />
                                        </DragButton>
                                    </Spacing>
                                )}

                                {isAdmin && <TournamentPopover tournament={value} />}
                            </LI>
                        );
                    }}
                />
            )}

            {isAdmin && (
                <Button main size="sm" onClick={() => setModal(true)}>
                    <PlusIcon />
                    {'\u00A0'}
                    {'\u00A0'}
                    Create Tournament
                </Button>
            )}

            <Spacing bottom="md"  />

            <SocialButton href="https://twitter.com/CrakdGG">
                <TwitterIcon color="twitter" />
                <Spacing right="xs" />
                Twitter
            </SocialButton>
            <SocialButton href="https://discord.gg/mZHYP22JkQ">
                <DiscordIcon color="facebook" />
                <Spacing right="xs" />
                Discord
            </SocialButton>
        </Root>
    );
};

export default forwardRef(Sidebar);