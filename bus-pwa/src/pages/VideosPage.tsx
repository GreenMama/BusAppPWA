import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Videos from '../components/Videos';
import { useNavigate } from 'react-router-dom';

const VideosPage: React.FC = () => {
    const { categoryid = '' } = useParams<{ categoryid: string }>();
    const navigate = useNavigate();

    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} appBarTitle={'Videos'} showBack={true} onBack={() => navigate(-1)}>
            <Videos categoryid={categoryid} />
        </PageWrapper>
    );
};

export default VideosPage;