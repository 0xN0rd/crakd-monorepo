import { FC } from 'react';

const Features: FC = () => {
    return (
        <>
            <div className="section-wrapper">
                <div className="section-container">
                    <div className="section-label">
                        <span className="section-label-number-one">1</span>
                        <h3 className="section-label-heading">
                            <span className="section-label-text-one">Enter</span>
                        </h3>
                    </div>
                    <h4 className="section-title">Choose A Contest</h4>
                    <div className="section-constainer section-description-wrapper">
                        <div className="section-container">
                            <p className="paragraph paragraph-medium paragaph-secondary">
                                There&apos;s something for every gamer. Play againsts friends or everyone. Daily or weekly tournament options make it easy to participate based on your schedule.    
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-wrapper">
                <div className="section-container">
                    <div className="section-label">
                        <span className="section-label-number-two">2</span>
                        <h3 className="section-label-heading">
                            <span className="section-label-text-two">Play</span>
                        </h3>
                    </div>
                    <h4 className="section-title">You Have A Chance</h4>
                    <div className="section-constainer section-description-wrapper">
                        <div className="section-container">
                            <p className="paragraph paragraph-medium paragaph-secondary">
                                You don&apos;t have to be a pro to win cash prizes playing League. Popping off in one game can send you to the top of the leaderboard. No more falling to the losers bracket.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-wrapper">
                <div className="section-container">
                    <div className="section-label">
                        <span className="section-label-number-three">3</span>
                        <h3 className="section-label-heading">
                            <span className="section-label-text-three">Win</span>
                        </h3>
                    </div>
                    <h4 className="section-title">So Much Winning</h4>
                    <div className="section-constainer section-description-wrapper">
                        <div className="section-container">
                            <p className="paragraph paragraph-medium paragaph-secondary">
                                Score points just by playing your favorite game. Every contest has many winners. Let out your inner sweat and become one of them.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Features;