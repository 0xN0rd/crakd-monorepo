import { FC, ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Events } from '../../constants';
import { Alert, GlobalStyle, Loading } from '../ui';
import { useAuth, useFetchSettings, useSocket } from '../../utils';
import { Theme } from '../../theme';

interface AppProps {
    children: ReactNode;
    setTheme: (theme?: Theme) => void;
}

const App: FC<AppProps> = ({ children, setTheme }) => {
    const authUser = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const { authError, isAuthFetching } = useAuth();
    const { isSettingsFetching } = useFetchSettings(setTheme);
    const socket = useSocket();

    if (isAuthFetching || isSettingsFetching) return <Loading top="md" />;
    if (authError) {
        const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (isDevelopment) {
            console.error(authError);
        }
        const devErrorMessage =
            'Sorry, something went wrong. Please open the browser console to view the detailed error message.';
        const prodErrorMessage = "Sorry, something went wrong. We're working on getting this fixed as soon as we can.";
        return <div>{isDevelopment ? devErrorMessage : prodErrorMessage}</div>;
    }

    return (
        <>
            {children}

            <GlobalStyle />
        </>
    );
};

export default App;