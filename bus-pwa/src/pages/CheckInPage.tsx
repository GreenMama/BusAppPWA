import React from 'react';
import PageWrapper from '../components/PageWrapper';
import CheckInOut from '../components/CheckInOut';


const CheckInPage: React.FC = () => {
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} appBarTitle={'Pick Up'} >
            <CheckInOut mode={'Check in'} />
        </PageWrapper>
    );
};

export default CheckInPage;