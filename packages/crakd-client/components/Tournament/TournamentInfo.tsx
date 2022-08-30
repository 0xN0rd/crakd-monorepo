import React, { FC, useState } from 'react';
import { H1, P, Divider, Spacing, Text } from '../ui';
import { RulesIcon } from '../ui/icons';
import { Root, RulesButton, StyledButton, StyledRules } from './style';
import { Rules } from '../../constants/Rules';

interface TournamentInfoProps {
    name: string;
    description?: string;
    format: string;
    duration: string;
    game: string;
}

const TournamentInfo: FC<TournamentInfoProps> = ({ name, description, format, duration, game }) => {
    const [isRulesSectionOpen, setIsRulesSectionOpen] = useState(false);

    const toggleRulesSection = () => setIsRulesSectionOpen(!isRulesSectionOpen);

    const showRules = isRulesSectionOpen;

    return (
        <Root paddingHorizontal="sm" paddingVertical="xs" bgColor="black" shadow="sm">
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

            <Divider />

            <Spacing bottom="xxs" />

            <RulesButton isRulesSectionOpen={isRulesSectionOpen}>
                <StyledButton fullWidth text size="xs" weight="bold" onClick={isRulesSectionOpen ? toggleRulesSection : toggleRulesSection}>
                    <RulesIcon />
                    <Spacing left="xxs" /> Rules
                </StyledButton>
            </RulesButton>

            {game === 'Warzone' && showRules && (
                <StyledRules>
                    <Spacing top="md">
                        <Text>{Rules.warzone.overview}</Text>
                    </Spacing>
                    <Spacing top="xs">
                        <Text>- {Rules.warzone.first}</Text>
                    </Spacing>
                    <Spacing top="xxs">
                        <Text>- {Rules.warzone.second}</Text>
                    </Spacing>
                    <Spacing top="xxs">
                        <Text>- {Rules.warzone.third}</Text>
                    </Spacing>
                    <Spacing top="xxs">
                        <Text>- {Rules.warzone.fourth}</Text>
                    </Spacing>
                </StyledRules>
            )}
            {game === 'Apex' && showRules && (
                <StyledRules>
                    <Spacing top="md">
                        <Text>{Rules.apex.overview}</Text>
                    </Spacing>
                    <Spacing top="xs">
                        <Text>- {Rules.apex.first}</Text>
                    </Spacing>
                </StyledRules>
            )}
            {game === 'CSGO' && showRules && (
                <StyledRules>
                    <Spacing top="md">
                        <Text>{Rules.csgo.overview}</Text>
                    </Spacing>
                    <Spacing top="xs">
                        <Text>- {Rules.csgo.first}</Text>
                    </Spacing>
                    <Spacing top="xxs">
                        <Text>- {Rules.csgo.second}</Text>
                    </Spacing>
                    <Spacing top="xxs">
                        <Text>- {Rules.csgo.third}</Text>
                    </Spacing>
                    <Spacing top="xxs">
                        <Text>- {Rules.csgo.fourth}</Text>
                    </Spacing>
                </StyledRules>
            )}
            {game === 'LoL' && showRules && (
                <StyledRules>
                    <Spacing top="md">
                        <Text>{Rules.lol.overview}</Text>
                    </Spacing>
                    <Spacing top="xs">
                        <Text>- {Rules.lol.first}</Text>
                    </Spacing>
                    <Spacing top="xxs">
                        <Text>- {Rules.lol.second}</Text>
                    </Spacing>
                    <Spacing top="xxs">
                        <Text>- {Rules.lol.third}</Text>
                    </Spacing>
                    <Spacing top="xxs">
                        <Text>- {Rules.lol.fourth}</Text>
                    </Spacing>
                </StyledRules>
            )}
        </Root>
    );
};

export default TournamentInfo;