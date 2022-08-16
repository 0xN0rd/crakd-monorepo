import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Root, ImageContainer, Image, InitialLetters, Gamertag, UserName } from './style';
import { Link, Spacing } from '../ui';
import theme from '../../theme';
import { RootState } from '../../store';

interface UsersCardProps {
    user: any;
    queryKey: any;
}

const UsersCard: FC<UsersCardProps> = ({ user, queryKey }) => {
    const [color, setColor] = useState('');
    const authUser = useSelector((state: RootState) => state.auth.user);

    const { fullName, username, image, gamertag } = user;

    useEffect(() => {
        const { primary, secondary, success, error } = theme.colors.general;
        const colors = [primary, secondary, success, error];
        const randomColor = Math.floor(Math.random() * colors.length);
        setColor(colors[randomColor]);
    }, []);

    const splitFullName = () => {
        const splitWords = fullName.split(' ').slice(0, 2).join(' ');
        const firstLetters = splitWords.split(' ').map((a) => a.charAt(0)).join(' ');

        return firstLetters;
    };

    return (
        <Root>
            <Link href={`/profile/${user._id}`} disableBorderOnHover>
                <ImageContainer>
                    {image ? (
                        <Image alt={user.fullName} src={image} />
                    ) : (
                        <InitialLetters color={color}>{splitFullName()}</InitialLetters>
                    )}
                </ImageContainer>
            </Link>

            <Spacing top="sm" bottom="xs">
                <Link href={`/profile/${user._id}`} disableBorderOnHover weight="bold" color="text">
                    <Gamertag>{gamertag}</Gamertag>
                </Link>
            </Spacing>

            {username ? <UserName>@{username}</UserName> : <Spacing top="sm" />}
        </Root>
    );
};

export default UsersCard;
