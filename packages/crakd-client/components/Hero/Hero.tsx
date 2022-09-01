import { FC } from 'react';

const Hero: FC = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <div className="hero-texts">
                    <div className="hero appear appear-first">
                        <h1 className="first-gradient">
                            WEEKLY CONTESTS.
                        </h1>
                    </div>
                    <div className="hero appear appear-second">
                        <h1 className="second-gradient">
                            MULTPILE GAMES.
                        </h1>
                    </div>
                    <div className="hero appear appear-third">
                        <h1 className="third-gradient">
                            CASH PRIZES.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;