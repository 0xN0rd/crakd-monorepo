import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Root, ImageContainer, Image, InitialLetters, Gamertag, UserName, Format, Duration } from './style';
import { Link, Spacing } from '../ui';
import theme from '../../theme';
import { RootState } from '../../store';

interface TournamentsCardProps {
    tournament: any;
    queryKey: any;
}

const TournamentsCard: FC<TournamentsCardProps> = ({ tournament, queryKey }) => {
    const [color, setColor] = useState('');
    const authUser = useSelector((state: RootState) => state.auth.user);

    const { name, description, format, duration } = tournament;
    const image = 'https://media.comicbook.com/2017/03/richest-anime-characters-nami-and-money-238692.png';

    useEffect(() => {
        const { primary, secondary, success, error } = theme.colors.general;
        const colors = [primary, secondary, success, error];
        const randomColor = Math.floor(Math.random() * colors.length);
        setColor(colors[randomColor]);
    }, []);

    return (
        <Card>
            <Link href={`/tournament/${tournament._id}`} disableBorderOnHover>
                <ImageContainer>
                    {image ? (
                        <Image alt={tournament.name} src={image} />
                    ) : (
                        <InitialLetters color={color} />
                    )}
                </ImageContainer>
            </Link>
            
            <Spacing top="sm" bottom="xs">
                <Link href={`/profile/${tournament._id}`} disableBorderOnHover weight="bold" color="text">
                    <Gamertag>{name}</Gamertag>
                </Link>
            </Spacing>

            {description ? <UserName>{description}</UserName> : <Spacing top="sm" />}
            {format ? <Format>{format}</Format> : <Spacing top="sm" />}
            {duration ? <Duration>{duration}</Duration> : <Spacing top="sm" />}
        </Card>
    );
};

export default TournamentsCard;
