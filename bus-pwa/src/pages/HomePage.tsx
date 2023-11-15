import React from 'react';
import PageWrapper from '../components/PageWrapper';
import HomeComponent from '../components/HomeComponent';

const HomePage: React.FC = () => {
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true}>
            <HomeComponent />
        </PageWrapper>
    );
};

export default HomePage;