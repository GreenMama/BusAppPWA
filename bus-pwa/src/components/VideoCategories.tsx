import React, { useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import { VideoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { VideoCategory } from '../interfaces';
import { useImmer } from 'use-immer';
import useFetchData from '../hooks/useFetchData';
import { QuickList, QuickListItem } from '../components/QuickListComponents';

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
        <>
            {state.isLoading && <LinearProgress sx={{ position: 'sticky', top: 0 }} />}
            <QuickList>
                {state.categories.map(item => (
                    <QuickListItem
                        key={item._RowNumber.toString()}
                        id={item._RowNumber.toString()}
                        icon={<VideoLibrary />}
                        title={item.Category}
                        onClick={() => handleCategoryClick(item)}
                    />

                ))}
            </QuickList>
        </>
    );
};

export default VideoCategories;