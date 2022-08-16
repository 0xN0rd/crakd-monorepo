import React, { FC } from 'react';
import { H1, P, Container, Spacing } from '../ui';

interface TournamentInfoProps {
    name: string;
    description?: string;
    format: string;
    duration: string;
}

const TournamentInfo: FC<TournamentInfoProps> = ({ name, description, format, duration }) => {
    return (
        <Container paddingHorizontal="sm" paddingVertical="xs" bgColor="black" shadow="sm">
            <H1 size="md">{name}</H1>
            {description && (
                <Spacing top="xxs">
                    <P color="textSecondary" size="xs">
                        {description}
                    </P>
                </Spacing>
            )}
            
            <Spacing top="xxs">
                <P color="textSecondary" size="xs">
                    {format}
                </P>
            </Spacing>

            <Spacing top="xxs">
                <P color="textSecondary" size="xs">
                    {duration}
                </P>
            </Spacing>
        </Container>
    );
};

export default TournamentInfo;