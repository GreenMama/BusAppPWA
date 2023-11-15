import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemIcon, Divider, ButtonBase, Box, LinearProgress, Stack } from '@mui/material';
import { VideoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { VideoCategory } from '../interfaces';

const VideoCategories: React.FC = () => {
    const [categories, setCategories] = useState<VideoCategory[]>([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch video categories from API
        setIsLoading(true);
        axios.get('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videocategories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching video categories:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleCategoryClick = (category: VideoCategory) => {
        navigate(`/videos/${encodeURIComponent(category.Category)}`);
    };

    return (
        <div>
            <Stack >
                {isLoading && <LinearProgress />}
                <List>
                    {categories.map(category => (
                        <React.Fragment key={category._RowNumber}>
                            <Box sx={{ width: '100%', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                                <ButtonBase onClick={() => handleCategoryClick(category)} style={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <VideoLibrary />
                                        </ListItemIcon>
                                        {category.Category}
                                    </ListItem>
                                </ButtonBase>
                            </Box>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Stack>
        </div>
    );
};

export default VideoCategories;