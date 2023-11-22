import React from 'react';
import PageWrapper from '../components/PageWrapper';
import EditBusRouteLog from '../components/EditBusRouteLog';
import { useNavigate } from 'react-router-dom';

interface PageProps {
    mode: 'create' | 'update';

}

const EditVideoPage: React.FC<PageProps> = ({ mode }) => {
    const navigate = useNavigate();
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} appBarTitle={'Daily Log'} showBack={true} onBack={() => navigate(-1)}>
            <EditBusRouteLog mode={mode} />
        </PageWrapper>
    );
};

export default EditVideoPage;