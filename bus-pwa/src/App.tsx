import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import SlideRoutes from 'react-slide-routes';
import SignInPage from './pages/SignInPage';
import VideosPage from './pages/VideosPage';
import VideosCategoriesPage from './pages/VideoCategoriesPage';
import EditVideoPage from './pages/EditVideoPage';
import CheckInPage from './pages/CheckInPage';
import CheckOutPage from './pages/CheckOutPage';
import BusRouteLogsPage from './pages/BusRouteLogsPage';
import EditBusRouteLogPage from './pages/EditBusRouteLogPage';
import HomePage from './pages/HomePage';
import './App.css';


const App: React.FC = () => {

    return (
        <Router>

            <SlideRoutes>
                <Route path="/" element={<HomePage />} />
                <Route path="/checkin" element={<CheckInPage />} />
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/videocategories" element={<VideosCategoriesPage />} />
                <Route path="/videos/:categoryid" element={<VideosPage />} />
                <Route path="/videos/create" element={<EditVideoPage mode="create" />} />
                <Route path="/videos/update/:ID" element={<EditVideoPage mode="update" />} />
                <Route path="/busroutelogs" element={<BusRouteLogsPage />} />
                <Route path="/busroutelogs/create" element={<EditBusRouteLogPage mode="create" />} />
                <Route path="/busroutelogs/update/:ID" element={<EditBusRouteLogPage mode="update" />} />
                <Route path="/signin" element={<SignInPage />} />
            </SlideRoutes>

        </Router>
    );
};

export default App;
