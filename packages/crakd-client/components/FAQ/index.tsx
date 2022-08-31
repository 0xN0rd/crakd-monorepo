import React, { FC, useState } from 'react';
import { H1, P, Spacing } from '../ui';
import { Root, FAQButton, StyledButton, StyledFAQ } from './style';
import { FAQColorfulIcon } from '../ui/icons';
import { Faqs } from '../../constants';

const ToggleItem = ({ title, description, id }) => {
    const [toggleElement, setToggleElement] = useState(false);
    return (
        <>
            <Root key={id}>
                <FAQButton>
                    <StyledButton fullWidth text color="text" size="sm" weight="bold" onClick={() => setToggleElement((prev) => !prev)}>
                        {title}
                    </StyledButton>
                </FAQButton>
                {toggleElement && (
                    <StyledFAQ>
                        <Spacing top="md">
                            <P color="textSecondary" size="md">
                                {description}
                            </P>
                        </Spacing>
                    </StyledFAQ>
                )}
            </Root>
            <Spacing top="md" />
        </>
    )
}

const Faq: FC = () => {

    return (
        <>
            <Root paddingHorizontal="sm" paddingVertical="xs" bgColor="black" shadow="sm">
                <FAQColorfulIcon />
                <H1 size="md">And It Was Called Crakd...</H1>
                <Spacing top="md">
                    <P color="textSecondary" size="md">
                        Crakd was born out of a desire to find a way to support playing video games competitively.
                        For most people, it is difficult to find people to team up with regularly to enter into traditional tournaments or tournaments are simply too far away to participate in.
                    </P>
                    <Spacing bottom="md" />
                    <P color="textSecondary" size="md">
                        We wanted to create a way for ourselves, and everyone else, to be able to compete and win real prizes from the comfort of our homes without the stress of having to find a team to squad up with.
                        Competitive video games are huge passion for us at Crakd. People ask us what casual game we like to play when we are not building and we always respond with our favorite battle royale or MOBA.
                        The gamer urge to get sweaty in solo queue is too strong. You will definitely be seeing us dropping hot on Worlds End or W keying mid lane out on the Rift.
                        This platform is built by gamers for gamers and we are looking forward building something cool with the gaming community.
                    </P>
                    <Spacing bottom="md" />
                    <P color="textSecondary" size="md">
                        If you want to know more about how the platform works, check out the FAQ below or pop into Discord! GLHF!
                    </P>
                </Spacing>
            </Root>
            <Spacing top="md" />

            {Faqs.map((data, id) => {
                return <ToggleItem key={id} id={id} title={data.title} description={data.description} />;
            })}
            {/*
            <Root>
                <FAQButton isFAQSectionOpen={isFAQSectionOpen}>
                    <StyledButton fullWidth text color="text" size="xs" weight="bold" onClick={isFAQSectionOpen ? toggleFAQSection : toggleFAQSection}>
                        How Does Crakd Work
                    </StyledButton>
                </FAQButton>
                {showFAQ && !showNext && (
                    <StyledFAQ>
                        <Spacing top="md">
                            <P color="textSecondary" size="xs">
                                These are the basics of tournaments.
                            </P>
                        </Spacing>
                    </StyledFAQ>
                )}
            </Root>
            <Spacing top="md" />
            <Root>
                <FAQButton isFAQSectionOpen={isFAQSectionOpen}>
                    <StyledButton fullWidth text color="text" size="xs" weight="bold" onClick={isFAQSectionOpen ? toggleFAQSection : toggleFAQSection}>
                        How Do Cash and GPP Formats Work?
                    </StyledButton>
                </FAQButton>
                {!showFAQ && showNext && (
                    <StyledFAQ>
                        <Spacing top="md">
                            <P color="textSecondary" size="xs">
                                These are the basics of tournaments.
                            </P>
                        </Spacing>
                    </StyledFAQ>
                )}
            </Root>
                */}
        </>
    )
}

export default Faq;
