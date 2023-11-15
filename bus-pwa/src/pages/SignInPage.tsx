import React from 'react';
import PageWrapper from '../components/PageWrapper';

import SignIn from '../components/SignIn';

const VideoCategoriesPage: React.FC = () => {
    return (
        <PageWrapper showHeader={true} showFooter={false} showFooterIcons={false} >
            <SignIn />
        </PageWrapper>
    );
};

export default VideoCategoriesPage;