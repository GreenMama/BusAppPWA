import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Fab, Stack } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
//import { useParams } from 'react-router-dom';
//import axios from 'axios';
import { Video } from '../interfaces';
import VideoCard from './VideoCard';


interface VideosProps {
    categoryid: string;
}

const Videos: React.FC<VideosProps> = ({ categoryid }) => {
    const [videos, setVideos] = useState<Video[]>([]);
    // const [showAddVideoForm, setShowAddVideoForm] = useState(false);
    // const [newVideoTitle, setNewVideoTitle] = useState('');
    const navigate = useNavigate();
    //const { categoryid } = useParams<{ categoryid: string }>();

    // useEffect(() => {
    //     // Fetch videos from API
    //     axios.get('/api/videos')
    //         .then(response => {
    //             setVideos(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching videos:', error);
    //         });
    // }, []);

    useEffect(() => {


        axios.get('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos')
            .then(response => {
                const filteredVideos = response.data.filter((video: Video) => video.Category === categoryid);
                // Convert URL attribute of each video from string to JSON and extract URL parameter
                filteredVideos.forEach((video: Video) => {
                    let urlObject = JSON.parse(video.URL);
                    if (urlObject && urlObject.Url) {
                        video.URL = urlObject.Url;  // Assuming the URL parameter in the JSON object is named "URL"
                    }
                });
                setVideos(filteredVideos);
            })
            .catch(error => {
                console.error('Error fetching videos: ', error);
            });
    }, []);

    // const handleEditClick = (video: Video) => {
    //     navigate(`/videos/update/${video.ID}`, { state: { video } });
    // };

    const openUrlInNewWindow = (url: string) => {
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            newWindow.opener = null;
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

            {/* {state.isLoading && <LinearProgress />} */}

            <Box m={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 'xs' }}>
                <Stack spacing={3}>
                    {videos.map((video) => (
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