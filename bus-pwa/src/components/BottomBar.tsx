import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { HomeRounded, VideoLibraryRounded, Checklist, LockOpenRounded, LoginRounded, LogoutRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface ComponentProps {
    showIcons?: boolean;
}

const BottomBar: React.FC<ComponentProps> = ({ showIcons = true }) => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = React.useState('home');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSelectedMenu(newValue);
        navigate(`/${newValue}`);
    };

    return (
        <BottomNavigation
            value={selectedMenu}
            onChange={handleChange}
            showLabels
            className='mainBottomBar'  >
            {showIcons && <BottomNavigationAction label="Home" value="" icon={<HomeRounded />} />}
            {showIcons && <BottomNavigationAction label="Pick Up" value="checkin" icon={<LoginRounded />} />}
            {showIcons && <BottomNavigationAction label="Drop Off" value="checkout" icon={<LogoutRounded />} />}
            {showIcons && <BottomNavigationAction label="Videos" value="videocategories" icon={<VideoLibraryRounded />} />}
            {showIcons && <BottomNavigationAction label="Daily Log" value="busroutelogs" icon={<Checklist />} />}
            {showIcons && <BottomNavigationAction label="Sign In" value="signin" icon={<LockOpenRounded />} />}
        </BottomNavigation>
    );
};

export default BottomBar;


//, position: 'fixed', bottom: 0, left: 0, right: 0
//style={{ backgroundColor: 'lightgray', height: '56px' }}