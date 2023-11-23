import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu, ArrowBack } from '@mui/icons-material';
import '../App.css';
import AppDrawer from '../components/AppDrawer';

interface HeaderProps {
    showMenu?: boolean;
    showLogo?: boolean;
    appBarTitle?: string;
    showBack?: boolean; // Add a new prop to control the display of the back arrow
    onBack?: () => void; // Add a new prop for the back button click handler
}

const Header: React.FC<HeaderProps> = ({ showMenu, showLogo, appBarTitle, showBack, onBack }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open);
    };


    return (
        <>
            <AppBar position="static" className="mainAppBar">
                <Toolbar>
                    {showBack && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={onBack} // Call the onBack function when the back button is clicked
                    >
                        <ArrowBack /> {/* Render the ArrowBack icon */}
                    </IconButton>}
                    {showMenu && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <Menu />
                    </IconButton>}

                    <Typography variant="h6" component="div">
                        {appBarTitle ? appBarTitle : "Radical Generosity Bus"}
                        {showLogo}
                    </Typography>
                </Toolbar>
            </AppBar>

            <AppDrawer open={isDrawerOpen} toggleDrawer={toggleDrawer} />
        </>
    );
};

export default Header;