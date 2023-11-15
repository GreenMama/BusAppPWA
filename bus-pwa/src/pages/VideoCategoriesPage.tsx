import React from 'react';
import PageWrapper from '../components/PageWrapper';
import VideoCategories from '../components/VideoCategories';

const VideoCategoriesPage: React.FC = () => {
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} appBarTitle={'Video Categories'}>
            <VideoCategories />
        </PageWrapper>
    );
};

export default VideoCategoriesPage;