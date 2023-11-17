import React from 'react';
import PageWrapper from '../components/PageWrapper';
import EditBusRouteLog from '../components/EditBusRouteLog';

interface PageProps {
    mode: 'create' | 'update';

}

const EditVideoPage: React.FC<PageProps> = ({ mode }) => {
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} appBarTitle={'Daily Log'}>
            <EditBusRouteLog mode={mode} />
        </PageWrapper>
    );
};

export default EditVideoPage;