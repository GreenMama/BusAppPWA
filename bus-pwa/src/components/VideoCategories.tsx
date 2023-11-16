import React, { useEffect } from 'react';
import { List, ListItem, ListItemIcon, Divider, ButtonBase, Box, LinearProgress, Stack } from '@mui/material';
import { VideoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { VideoCategory } from '../interfaces';
import { useImmer } from 'use-immer';
import useFetchData from '../hooks/useFetchData';

interface ComponentState {
    categories: VideoCategory[];
    isLoading: boolean;
}

const VideoCategories: React.FC = () => {
    const [state, setState] = useImmer<ComponentState>({
        categories: [],
        isLoading: false,
    });
    const navigate = useNavigate();
    const { data: categoriesData, error: categoriesError, loading: categoriesLoading } = useFetchData(`/Videos Categories`, `videoCategories`);

    useEffect(() => {
        setState((draft) => {
            draft.categories = categoriesData as VideoCategory[] || [];
            draft.isLoading = categoriesLoading;
        });
    }, [categoriesData, categoriesLoading]);

    useEffect(() => {
        if (categoriesError) {
            console.error('Error fetching video categories data:', categoriesError);
        }
    }, [categoriesError]);

    const handleCategoryClick = (category: VideoCategory) => {
        navigate(`/videos/${encodeURIComponent(category.Category)}`);
    };

    return (
        <div>
            <Stack >
                {state.isLoading && <LinearProgress />}
                <List>
                    {state.categories.map(category => (
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