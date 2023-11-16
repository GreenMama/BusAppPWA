import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Quote, TodaysFocus } from '../interfaces';
import { decodeToken } from '../utils';
import largeLogoImage from '../assets/BusAppHomePageLogo.png';
import useFetchData from '../hooks/useFetchData';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ComponentState {
    quotes: Quote[];
    todaysFocus: TodaysFocus[];
    isLoading: boolean;
}

const HomeComponent: React.FC = () => {
    const [state, setState] = useImmer<ComponentState>({
        quotes: [],
        todaysFocus: [],
        isLoading: false,
    });
    const token = decodeToken();
    const { data: quotesData, error: quotesError, loading: quotesLoading } = useFetchData(`/Quotes`, `quotes`);
    const { data: todaysFocusData, error: todaysFocusError, loading: todaysFocusLoading } = useFetchData(`/Todays Focus`, `todaysFocus`);

    useEffect(() => {
        if (!token || !token["Email"] || token["Email"].length === 0) {
            console.error('No email in token');
            return;
            //   throw new Error('No email in token');
        }
        const filteredData = quotesData?.filter((item: Quote) =>
            item["Related Users"] && item["Related Users"].includes(token["Email"])
        );
        setState((draft) => {
            draft.quotes = filteredData as Quote[] || [];
        });
    }, [quotesData]);

    useEffect(() => {
        if (!token || !token["Email"] || token["Email"].length === 0) {
            console.error('No email in token');
            return;
            //   throw new Error('No email in token');
        }
        const filteredData = todaysFocusData?.filter((item: TodaysFocus) =>
            item["Related Users"] && item["Related Users"].includes(token["Email"])
        );
        setState((draft) => {
            draft.todaysFocus = filteredData as TodaysFocus[] || [];
        });
    }, [todaysFocusData]);

    useEffect(() => {
        setState((draft) => {
            draft.isLoading = quotesLoading || todaysFocusLoading;
        });
    }, [quotesLoading, todaysFocusLoading]);

    useEffect(() => {
        if (quotesError) {
            console.error('Error fetching Quotes data:', quotesError);
        }
    }, [quotesError]);

    useEffect(() => {
        if (todaysFocusError) {
            console.error('Error fetching Todays Focus data:', todaysFocusError);
        }
    }, [todaysFocusError]);


    return (
        <div>
            {state.isLoading && <LinearProgress />}
            {/* {state.quotes[0] && state.quotes[0].Quote}
            <br />
            {state.todaysFocus[0] && state.todaysFocus[0].Focus} */}

            <Box
                m={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', // Center vertically
                    maxWidth: 'xs',
                    height: '70dvh', // Set a fixed height to center vertically
                }}
            >
                <Box
                    component="img"
                    src={largeLogoImage}
                    sx={{
                        width: 'auto',
                        height: 'auto',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                    }}
                    alt="Bus App Logo" // Optional alt text for accessibility
                    loading="lazy" // Optional loading attribute for lazy loading images
                    decoding="async" // Optional decoding attribute for async loading images
                    draggable="false" // Optional draggable attribute for disabling image dragging
                    style={{ pointerEvents: 'none' }} // Disable pointer events on the image to prevent accidental clicks
                    data-testid="logo-image" // Optional data-testid attribute for testing purposes
                    data-test-id="logo-image" // Optional data-testid attribute for testing purposes
                    data-test="logo-image" // Optional data-test attribute for testing purposes
                    data-test-test="logo-image" // Optional data-test attribute for testing purposes
                />
                <Box>
                    <Box m={3}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Today's teaching opportunity:
                        </Typography>
                        <Typography variant="body1" component="div">
                            {state.todaysFocus[0] && state.todaysFocus[0].Focus}
                        </Typography>
                    </Box>
                    <Box m={3}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Quote for the day:
                        </Typography>
                        <Typography variant="body1" component="div">
                            {state.quotes[0] && state.quotes[0].Quote}
                        </Typography>
                    </Box>
                </Box>
            </Box>

        </div>
    );
};

export default HomeComponent;


// Fetch quotes
// const fetchQuotes = async () => {

//     const token = decodeToken();

//     // if (!token || !token["Current Quote"] || token["Current Quote"].length === 0) {
//     //     throw new Error('No current quote in token');
//     // }

//     if (!token || !token["Email"] || token["Email"].length === 0) {
//         throw new Error('No email in token');
//     }

//     try {
//         //const response = await Api.get(`/Quotes?selector=SELECT(Quotes[ID],[ID]="${token["Current Quote"]}")`);
//         const response = await Api.get(`/Quotes`);
//         if (!response.data) {
//             throw new Error('No data in API response');
//         }
//         const filteredData = response.data.filter((item: Quote) =>
//             item["Related Users"] && item["Related Users"].includes(token["Email"])
//         );
//         return filteredData;

//     } catch (error: any) {
//         const errorMessage = error.response?.data?.message || error.message;
//         throw new Error(errorMessage);
//     }
// };

// // Fetch today's focus
// const fetchTodaysFocus = async () => {

//     const token = decodeToken();

//     // if (!token || !token["Current Focus"] || token["Current Focus"].length === 0) {
//     //     throw new Error('No current focus in token');
//     // }

//     if (!token || !token["Email"] || token["Email"].length === 0) {
//         throw new Error('No email in token');
//     }

//     try {
//         //const response = await Api.get(`/Todays Focus?selector=SELECT(Todays Focus[ID],[ID]="${token["Current Focus"]}")`);
//         const response = await Api.get(`/Todays Focus`);
//         if (!response.data) {
//             throw new Error('No data in API response');
//         }
//         const filteredData = response.data.filter((item: TodaysFocus) =>
//             item["Related Users"] && item["Related Users"].includes(token["Email"])
//         );
//         return filteredData;
//     } catch (error: any) {
//         const errorMessage = error.response?.data?.message || error.message;
//         throw new Error(errorMessage);
//     }
// };


// useEffect(() => {

//     const fetchData = async () => {
//         setState((draft) => {
//             draft.isLoading = true;
//         });

//         const localQuotes = getDataFromLocalStorage("quotes");
//         const localTodaysFocus = getDataFromLocalStorage("todaysFocus");

//         if (localQuotes) {
//             setState((draft) => {
//                 draft.quotes = localQuotes as Quote[];
//             });
//         }

//         if (localTodaysFocus) {
//             setState((draft) => {
//                 draft.todaysFocus = localTodaysFocus as TodaysFocus[];
//             });
//         }

//         try {
//             const quotes = await fetchQuotes();
//             const todaysFocus = await fetchTodaysFocus();

//             setState((draft) => {
//                 draft.quotes = quotes;
//                 draft.todaysFocus = todaysFocus;
//                 draft.isLoading = false;
//             });

//             putDataToLocalStorage("quotes", quotes);
//             putDataToLocalStorage("todaysFocus", todaysFocus);

//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setState((draft) => {
//                 draft.isLoading = false;
//             });
//         }
//     };

//     fetchData();

// }, []);

