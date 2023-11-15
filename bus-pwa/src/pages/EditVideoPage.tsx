import React from 'react';
import PageWrapper from '../components/PageWrapper';
import EditVideo from '../components/EditVideo';

interface EditVideoPageProps {
    mode: 'create' | 'update';

}

const EditVideoPage: React.FC<EditVideoPageProps> = ({ mode }) => {
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true}>
            <EditVideo mode={mode} />
        </PageWrapper>
    );
};

export default EditVideoPage;