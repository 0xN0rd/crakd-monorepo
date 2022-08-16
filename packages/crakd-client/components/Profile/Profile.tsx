import React, { FC, useReducer, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
    CoverPhoto,
    CoverLoading,
    ProfilePhoto,
    CoverImageWrapper,
    ProfileImageWrapper,
    Info,
    Actions,
    Count,
    ProfileInfoCard,
    ProfileInfo1,
    Bold,
    ProfileInfoWrapper,
} from './style';
import { useBreakpoints } from '../../utils';
import UploadImage from '../UploadImage';
import { RootState } from '../../store';
import { Loading, H1, H5, Spacing, ButtonLink, Avatar, Container } from '../ui';
import dynamic from 'next/dynamic';

interface ProfileProps {
    user: any;
    queryKey: any;
}

export enum ProfileLoading {
    ProfilePicture,
    CoverPicture,
}

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
    ssr: false,
});

const TwitchContainer = styled(Container)`
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.theme.colors.general.black};
    border-radius: ${(p) => p.theme.radius.sm};
    box-shadow: ${(p) => p.theme.shadows.sm};
    height: 25rem;

    @media (max-width: 768px) {
        height: 14rem;
    }
`;

const Profile: FC<ProfileProps> = ({ user, queryKey }) => {
    const authUser = useSelector((state: RootState) => state.auth.user);
    const [isLoading,setIsLoading] = useState<ProfileLoading>(null);
    const breakpoint = useBreakpoints();

    const isSmallScreen = breakpoint === 'xs' || breakpoint === 'sm';

    const useSpecificTwitchComponent = () => {
        if (isSmallScreen) {
            return <ReactTwitchEmbedVideo channel="rush" layout="video" height="180" width="350" />;
        } else if (!isSmallScreen) {
            return <ReactTwitchEmbedVideo channel="rush" layout="video" height="360" width="600" />;
        }
    };

    return (
        <>
            <CoverPhoto isLoading={isLoading} image={authUser?._id === user._id ? authUser.coverImage : user.coverImage}>
                {isLoading === ProfileLoading.CoverPicture && (
                    <CoverLoading>
                        <Loading />
                    </CoverLoading>
                )}
                {authUser?._id === user._id && (
                    <CoverImageWrapper>
                        <UploadImage isCover setIsLoading={setIsLoading} />
                    </CoverImageWrapper>
                )}
                <ProfilePhoto>
                    {isLoading === ProfileLoading.ProfilePicture ? (
                        <Loading top="lg" />
                    ) : (
                        <Avatar
                            isOnline={authUser?._id !== user._id && user.isOnline}
                            image={authUser?._id === user._id ? authUser.image : user.image}
                            size={4}
                        />
                    )}
                    {authUser?._id === user._id && (
                        <ProfileImageWrapper>
                            <UploadImage setIsLoading={setIsLoading} />
                        </ProfileImageWrapper>
                    )}
                </ProfilePhoto>
            </CoverPhoto>

            <Info>
                <H1>{user.username}</H1>
                <H5>{user.gamertag}</H5>
            </Info>

            <Spacing top="sm" />

            <TwitchContainer maxWidth="sm">{useSpecificTwitchComponent()}</TwitchContainer>
        </>
    );
};

export default Profile;