import React, { useEffect } from 'react';
import { List, ListItem, ListItemIcon, Divider, ButtonBase, Box, LinearProgress, Stack, Fab } from '@mui/material';
import { VideoLibrary, AddRounded } from '@mui/icons-material';
//import { useNavigate } from 'react-router-dom';
import { BusRouteLog } from '../interfaces';
import { useImmer } from 'use-immer';
import useFetchData from '../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

interface ComponentState {
    busRouteLogs: BusRouteLog[];
    isLoading: boolean;
}

const Component: React.FC = () => {
    const [state, setState] = useImmer<ComponentState>({
        busRouteLogs: [],
        isLoading: false,
    });
    // const navigate = useNavigate();
    const { data: busRouteLogsData, error: busRouteLogsError, loading: busRouteLogsLoading } = useFetchData(`/Bus Route Log`, `busRouteLogs`);
    const navigate = useNavigate();

    useEffect(() => {
        setState((draft) => {
            draft.busRouteLogs = busRouteLogsData as BusRouteLog[] || [];
            draft.isLoading = busRouteLogsLoading;
        });
    }, [busRouteLogsData, busRouteLogsLoading]);

    useEffect(() => {
        if (busRouteLogsError) {
            console.error('Error fetching bus route logs data:', busRouteLogsError);
        }
    }, [busRouteLogsError]);

    // const handleCategoryClick = (category: VideoCategory) => {
    //     navigate(`/videos/${encodeURIComponent(category.Category)}`);
    // };

    return (
        <div>
            <Stack >
                {state.isLoading && <LinearProgress />}
                <List>
                    {state.busRouteLogs.map(busRouteLog => (
                        <React.Fragment key={busRouteLog._RowNumber}>
                            <Box sx={{ width: '100%', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                                {/* <ButtonBase onClick={() => handleCategoryClick(category)} style={{ width: '100%' }}> */}
                                <ButtonBase style={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <VideoLibrary />
                                        </ListItemIcon>
                                        {busRouteLog.Route}
                                    </ListItem>
                                </ButtonBase>
                            </Box>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Stack>
            <Box sx={{ position: 'fixed', bottom: 72, right: 16 }}>
                <Fab color="primary" aria-label="add" onClick={() => navigate('/busroutelogs/create')}>
                    <AddRounded />
                </Fab>
            </Box>
        </div>
    );
};

export default Component;