import { useState, forwardRef, ForwardRefRenderFunction, useRef, RefObject, useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import {
    Root,
    Wrapper,
    Hamburger,
    Container,
    SearchContainer,
    AvatarContainer,
    Logo,
} from './style';
import { MenuIcon } from '../ui/icons';
import { Link, Button, Avatar, Spacing } from '../ui';
import { openAuthPopup, PopupType } from '../../store/auth';
import HeaderUser from './HeaderUser';
import Search from '../Search';
import { RootState } from '../../store';
import { useBreakpoints } from '../../utils';

interface HeaderProps {
    toggleSidebar?: () => void;
    ref: RefObject<HTMLButtonElement>;
}

const Header: ForwardRefRenderFunction<HTMLButtonElement, HeaderProps> = ({ toggleSidebar }, ref) => {
    const breakpoint = useBreakpoints();
    const dispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.auth.user);
    const logo = useSelector((state: RootState) => state.settings.communityLogo);
    const router = useRouter();
    const authUserRef = useRef(null);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    useEffect(() => {
        Router.events.on('routeChangeComplete', () => {
            if (isUserDropdownOpen) {
                setIsUserDropdownOpen(false);
            }
        });
    }, [isUserDropdownOpen]);

    const closeDropDown = () => {
        setIsUserDropdownOpen(false);
    };

    const isSmallScreen = breakpoint === 'xs' || breakpoint === 'sm';

    return (
        <Root>
            <Wrapper>
                <Container>
                    <Hamburger ref={ref} onClick={toggleSidebar}>
                        <MenuIcon />
                    </Hamburger>
                    <Logo>
                        <Link href="/" disableBorderOnHover>
                            <img alt="logo" style={{ height: 30 }} src={logo} />
                        </Link>
                    </Logo>
                    <Spacing left="sm" />
                    <SearchContainer>
                        <Search
                            hideBorder
                            backgroundColor={5}
                            placeholder="Search for users and tournaments"
                            onItemClick={(item) =>
                                item.fullName ? router.push(`/profile/${item._id}`) : router.push(`/entry/${item._id}`)
                            }
                        />
                    </SearchContainer>
                </Container>
                
                <Spacing right="sm" />

                <AvatarContainer>
                    <div ref={authUserRef}>
                        {authUser ? (
                            <Button ghost onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                                <Avatar image={authUser.image} />
                            </Button>
                        ) : (
                            <Button
                                main
                                ghost={isSmallScreen}
                                size="sm"
                                weight="bold"
                                color="primaryGradient"
                                onClick={() => dispatch(openAuthPopup(PopupType.Log_In))}
                            >
                                {isSmallScreen ? <Avatar /> : 'Log in'}
                            </Button>
                        )}
                        {isUserDropdownOpen && (
                            <HeaderUser
                                isUserDropdownOpen={isUserDropdownOpen}
                                authUserRef={authUserRef}
                                closeDropDown={closeDropDown}
                            />
                        )}
                    </div>
                </AvatarContainer>
            </Wrapper>
        </Root>
    );
};

export default forwardRef(Header);