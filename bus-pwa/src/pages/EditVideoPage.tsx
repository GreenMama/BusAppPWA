import React from 'react';
import PageWrapper from '../components/PageWrapper';
import EditVideo from '../components/EditVideo';
import { useNavigate } from 'react-router-dom';

interface EditVideoPageProps {
    mode: 'create' | 'update';

}

const EditVideoPage: React.FC<EditVideoPageProps> = ({ mode }) => {
    const navigate = useNavigate();
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} showBack={true} onBack={() => navigate(-1)}>
            <EditVideo mode={mode} />
        </PageWrapper>
    );
};

export default EditVideoPage;