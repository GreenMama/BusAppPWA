import React, { useEffect } from 'react';
import { Box, Fab, LinearProgress, Avatar } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { Video } from '../interfaces';
import useFetchData from '../hooks/useFetchData';
import { QuickList, QuickListItem } from '../components/QuickListComponents';

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

    const handleEditClick = (value: Video | undefined) => {
        //console.log(value);
        if (value?.ID) {
            navigate(`/videos/update/${value.ID}`, { state: { value } });
        }

    };

    return (
        < >

            {state.isLoading && <LinearProgress sx={{ position: 'sticky', top: 0 }} />}
            <QuickList>
                {state.videos.map(item => (
                    <QuickListItem
                        key={item.ID}
                        id={item.ID}
                        showDelete={true}
                        showEdit={true}
                        icon={
                            <Avatar
                                src={item.IconURL}
                                sx={{
                                    width: { xs: 80, sm: 100, md: 142 },
                                    height: { xs: 80, sm: 56, md: 80 },
                                    borderRadius: '10%',
                                    marginRight: 2,
                                }}>
                                {item.Description}

                            </Avatar>
                        }
                        title={item.Description}
                        subtitle={item.Details}
                        onClick={() => openUrlInNewWindow(item.URL)}
                        onEdit={() => handleEditClick(item)}
                    />

                ))}
            </QuickList>


            {/* <Box m={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 'xs' }}>
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
            </Box> */}

            <Box sx={{ position: 'fixed', bottom: 72, right: 16 }}>
                <Fab color="primary" aria-label="add" onClick={() => navigate('/videos/create')}>
                    <AddRounded />
                </Fab>
            </Box>

        </>
    );
};

export default Videos;