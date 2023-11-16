import React, { useEffect } from 'react';
import { Box, Fab, Stack, LinearProgress } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { Video } from '../interfaces';
import VideoCard from './VideoCard';
import useFetchData from '../hooks/useFetchData';

interface ComponentState {
    videos: Video[];
    isLoading: boolean;
}


interface VideosProps {
    categoryid: string;
}

const Videos: React.FC<VideosProps> = ({ categoryid }) => {
    const [state, setState] = useImmer<ComponentState>({
        videos: [],
        isLoading: false,
    });

    const navigate = useNavigate();

    const { data: videosData, error: videosError, loading: videosLoading } = useFetchData(`/Preloaded Videos`, `videos`);

    useEffect(() => {

        const filteredVideos = videosData?.filter((video: Video) => video.Category === categoryid);
        // Convert URL attribute of each video from string to JSON and extract URL parameter
        if (filteredVideos) {
            filteredVideos.forEach((video: Video) => {
                try {
                    const urlObject = JSON.parse(video.URL);
                    if (urlObject && urlObject.Url) {
                        video.URL = urlObject.Url; // Assuming the URL parameter in the JSON object is named "Url"
                    }
                } catch (error) {
                    // Handle JSON parsing error here
                    console.error(`Skipped ${video.URL}:`);
                }
            });
        }
        setState((draft) => {
            draft.videos = filteredVideos as Video[] || [];
            draft.isLoading = videosLoading;
        });
    }, [videosData, videosLoading]);

    useEffect(() => {
        if (videosError) {
            console.error('Error fetching videos data:', videosError);
        }
    }, [videosError]);


    // const handleEditClick = (video: Video) => {
    //     navigate(`/videos/update/${video.ID}`, { state: { video } });
    // };

    const openUrlInNewWindow = (url: string) => {
        try {
            const newWindow = window.open(url, '_blank');
            if (newWindow) {
                newWindow.opener = null;
            }
        } catch (error) {
            // Handle JSON parsing error here
            console.error(`Open Url in New Window Warning`);
        }
    }

    return (
        <div >

            {/* <List>
                {videos.map(video => (
                    <React.Fragment key={video.ID}>
                        <Box sx={{ width: '100%', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                            <ButtonBase onClick={() => handleEditClick(video)} style={{ width: '100%' }}>
                                <ListItem>
                                    <ListItemIcon>
                                        <VideoLibrary />
                                    </ListItemIcon>
                                    {video.Description}
                                </ListItem>
                            </ButtonBase>
                        </Box>
                        <Divider />
                    </React.Fragment>
                ))}
            </List> */}

            {state.isLoading && <LinearProgress />}
            <Box m={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 'xs' }}>
                <Stack spacing={3}>
                    {state.videos.map((video) => (
                        <VideoCard
                            key={video.ID}
                            title={video.Description}
                            image={video.IconURL}
                            subtitle={video.Details}
                            isVisible={true}
                            onClick={openUrlInNewWindow}
                            URL={video.URL}
                        />
                    ))}
                </Stack>
            </Box>

            <Box sx={{ position: 'fixed', bottom: 72, right: 16 }}>
                <Fab color="primary" aria-label="add" onClick={() => navigate('/videos/create')}>
                    <AddRounded />
                </Fab>
            </Box>
            {/* {showAddVideoForm && (
                <div style={{ padding: '20px' }}>
                    <TextField label="Video Title" value={newVideoTitle} onChange={(e) => setNewVideoTitle(e.target.value)} />
                    <Button variant="contained" color="primary" onClick={handleAddVideo}>Save</Button>
                </div>
            )} */}
        </div>
    );
};

export default Videos;