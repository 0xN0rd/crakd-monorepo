import React, { FC } from 'react';
import { Cookies, setCookie } from '../../utils';
import { Root, StyledButton, Link } from './style';
import { Follow } from 'react-twitter-widgets';

interface AnnouncementProps {
    setIsAnnouncementOpen: (isOpen: boolean) => void;
}

const Announcement: FC<AnnouncementProps> = ({ setIsAnnouncementOpen }) => {
    const onCloseClick = () => {
        setCookie(Cookies.Announcement_Disabled, 'true', 7);
        setIsAnnouncementOpen(false);
    };

    return (
        <Root>
            <div>
                ☆ If you like Crakd, give us a follow on{' '}
                <Link href="https://twitter.com/CrakdGG" target="__blank" rel="noreferrer noopener">
                    Twitter
                </Link>{' '}
                ☆
            </div>

            <div>
                <Follow username="CrakdGG" />
            </div>

            <StyledButton ghost color="white" onClick={onCloseClick}>
                x
            </StyledButton>
        </Root>
    );
};

export default Announcement;