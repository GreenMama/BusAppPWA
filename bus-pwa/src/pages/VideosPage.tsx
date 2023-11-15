import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Videos from '../components/Videos';

const VideosPage: React.FC = () => {
    const { categoryid = '' } = useParams<{ categoryid: string }>();

    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} appBarTitle={'Videos'}>
            <Videos categoryid={categoryid} />
        </PageWrapper>
    );
};

export default VideosPage;