import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import '../App.css';

interface HeaderProps {
    showMenu?: boolean;
    showLogo?: boolean;
    appBarTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ showMenu, showLogo, appBarTitle }) => {
    return (
        <AppBar position="static" className="mainAppBar">
            <Toolbar>
                {showMenu && <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}

                >
                    <Menu />
                </IconButton>}

                <Typography variant="h6" component="div">
                    {appBarTitle ? appBarTitle : "Radical Generosity Bus"}
                    {showLogo}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;