import React, { ReactNode, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import BottomBar from './BottomBar';
import { decodeToken } from '../utils';
import { VisualViewport } from './VisualViewport';



//import { Container } from '@mui/material';

interface PageWrapperProps {
    showHeader?: boolean;
    showFooter?: boolean;
    showFooterIcons?: boolean;
    showMenu?: boolean;
    showLogo?: boolean;
    appBarTitle?: string;
    showBack?: boolean; // Add a new prop to control the display of the back arrow
    onBack?: () => void; // Add a new prop for the back button click handler
    children?: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ showHeader, showFooter, showFooterIcons, showMenu, showLogo, appBarTitle, showBack, onBack, children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = decodeToken();
        if (!token) {
            navigate(`/signin`);
            //return null;
        }

        if (token !== null) {

            const currentTime = Date.now() / 1000;

            if (!token.exp || token.exp < currentTime) {
                navigate(`/signin`);
                //return null;
            }
        }


    }, []);

    return (

        <VisualViewport   >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
                {showHeader && <Header showMenu={showMenu} showLogo={showLogo} appBarTitle={appBarTitle} showBack={showBack} onBack={onBack} />}
                <Box sx={{ flexGrow: 1, overflow: 'auto', bgcolor: 'background.paper' }}>
                    {children}
                </Box>
                {showFooter && <BottomBar showIcons={showFooterIcons} />}
            </Box>
        </VisualViewport>
    );
};

export default PageWrapper;

//, height: '100vh'  display: 'flex',