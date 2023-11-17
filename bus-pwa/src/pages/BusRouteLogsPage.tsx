import React from 'react';
import PageWrapper from '../components/PageWrapper';
import BusRouteLogs from '../components/BusRouteLogs';

const Page: React.FC = () => {
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} appBarTitle={'Daily Log'}>
            <BusRouteLogs />
        </PageWrapper>
    );
};

export default Page;