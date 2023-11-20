import React, { useEffect } from 'react';
import { Box, LinearProgress, Fab } from '@mui/material';
import { AddRounded, Wifi } from '@mui/icons-material';
import { BusRouteLog } from '../interfaces';
import { useImmer } from 'use-immer';
import useFetchData from '../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import { QuickList, QuickListItem } from '../components/QuickListComponents';

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

    const handleEditClick = (value: BusRouteLog | undefined) => {
        console.log(value);
    };


    return (
        <div>
            {state.isLoading && <LinearProgress sx={{ position: 'sticky', top: 0 }} />}
            <QuickList>
                {state.busRouteLogs.map(item => (
                    <QuickListItem
                        key={item.ID}
                        value={item}
                        icon={<Wifi />}
                        title={item.Route}
                        subtitle={item.Date}
                        showDelete={true}
                        showEdit={true}
                        onEdit={() => handleEditClick(item)}
                    />


                ))}

            </QuickList>

            <Box sx={{ position: 'fixed', bottom: 72, right: 16 }}>
                <Fab color="primary" aria-label="add" onClick={() => navigate('/busroutelogs/create')}>
                    <AddRounded />
                </Fab>
            </Box>
        </div>
    );
};

export default Component;

