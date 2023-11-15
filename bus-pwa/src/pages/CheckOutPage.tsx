import React from 'react';
import PageWrapper from '../components/PageWrapper';
import CheckInOut from '../components/CheckInOut';


const CheckOutPage: React.FC = () => {
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} appBarTitle={'Drop Off'} >
            <CheckInOut mode={'Check out'} />
        </PageWrapper>
    );
};

export default CheckOutPage;