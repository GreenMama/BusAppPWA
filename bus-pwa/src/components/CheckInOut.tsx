import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, LinearProgress, Stack, Fab, Snackbar, Alert, Avatar } from '@mui/material';
import { QrCode2Rounded, CloseRounded } from '@mui/icons-material';
import { Person } from '../interfaces';
import PersonCard from '../components/PersonCard';
import QRCodeComponent from '../components/QRCodeComponent';
import { useImmer } from 'use-immer';
import '../App.css';
import { decodeToken } from '../utils';

interface NotificationProps {
    message?: string;
    severity?: "success" | "error" | "info" | "warning";
    showImage?: boolean;
}

interface ComponentProps {
    mode?: "Check in" | "Check out";
}

interface ComponentState {
    persons: Person[];
    scannedPerson: Person | null;
    isLoading: boolean;
    isQRCodeMode: boolean;
    scannedValue: string;
    notificationProps: NotificationProps;
    counter: number;
    isNotificationOpen: boolean;  //  If the Snack bar 
    qrCodeHistory: Record<string, boolean>;  //Array of QR codes, that have already been scanned
}

const CheckInOut: React.FC<ComponentProps> = ({ mode = "Check in" }) => {
    const [state, setState] = useImmer<ComponentState>({
        persons: [],
        scannedPerson: null,
        isLoading: false,
        isQRCodeMode: false,
        scannedValue: "",
        notificationProps: {},
        counter: 0,
        isNotificationOpen: false,
        qrCodeHistory: {},
    });
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [datetime, setDateTime] = useState(new Date());

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        getLocation();
        const timerId = setInterval(() => {
            getLocation();
            setDateTime(new Date());
        }, 30000); // Update every minute
        console.log(datetime);
        return () => clearInterval(timerId); // Clear interval on component unmount
    }, []);

    useEffect(() => {
        // Fetch persons from API
        setState((draft) => {
            draft.isLoading = true;
        });

        axios.get('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/Passengers')
            .then((response) => {
                setState((draft) => {
                    draft.persons = response.data;
                    draft.isLoading = false;
                });
            })
            .catch((error) => {
                console.error('Error fetching persons:', error);
                setState((draft) => {
                    draft.isLoading = false;
                });
            });
    }, []);

    const handleClose = () => {
        setState((draft) => {
            draft.isNotificationOpen = false;
        });
    };

    // Function to check in a person
    const checkInOutPerson = async (personId: string, status: string) => {

        const errorPhrase = (status === "Check in") ? "Error checking in" : "Error checking out";
        const urlEnding = (status === "Check in") ? "/Boarding" : "/BoardingOff";


        const token = decodeToken();
        if (!token || !token["Current Bus"] || token["Current Bus"].length == 0) {
            return `${errorPhrase}: current bus is not defined for the user`;
        }

        setState((draft) => { draft.isLoading = true; });

        try {
            const response = await axios.post(`https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api${urlEnding}`, {
                Passenger: personId,
                Bus: token["Current Bus"],
                Status: status,
                Location: `${location.latitude}, ${location.longitude}`,
            });

            if (!response || response.status !== 200) {
                setState((draft) => { draft.isLoading = false; });
                return `${errorPhrase}: ${response?.data.message}`;
            }

        } catch (error) {

            if (axios.isAxiosError(error)) {
                setState((draft) => { draft.isLoading = false; });
                return `${errorPhrase}: ${error.response?.data.message}`;
            } else {
                setState((draft) => { draft.isLoading = false; });
                return `An unexpected error occurred: ${error}`;
            }
        }

        setState((draft) => { draft.isLoading = false; });
    }

    // const testQRCodeScan1 = () => {
    //     const testQRCode1 = 'S1H4T6Q9';
    //     onNewScanResult(testQRCode1);
    // }

    const isOperationNotAllowed = (countCheckIn: number, countCheckOut: number, mode0: "Check in" | "Check out") => {
        if (mode0 === "Check in") {
            return countCheckIn > countCheckOut;
        } else {
            return countCheckIn <= countCheckOut;
        }
    }

    const isThumbsUp = (countCheckIn: number, countCheckOut: number) => {

        return countCheckIn > countCheckOut;

    }

    const onNewScanResult = async (decodedText: string) => {



        // setState((draft) => {
        if (decodedText.length > 0) {
            const foundPerson = state.persons.find((person) => person.ID === decodedText || person["QR Code"] === decodedText);
            const foundPersonIndex = state.persons.findIndex((person) => person.ID === decodedText || person["QR Code"] === decodedText);

            if (foundPerson) {


                if ((state.qrCodeHistory[foundPerson.ID] === true) || isOperationNotAllowed(foundPerson.CountCheckIn, foundPerson.CountCheckOut, mode)) {

                    setState((draft) => {
                        draft.isNotificationOpen = true;
                        draft.notificationProps = { severity: "info", message: `${foundPerson["First Name"]} ${foundPerson["Last Name"]} is already ${(mode === "Check in") ? "checked in" : "checked out"}` };
                        draft.notificationProps.showImage = true;
                        draft.scannedPerson = null;
                        draft.scannedPerson = { ...foundPerson };
                    });
                } else {

                    const errorMessage = await checkInOutPerson(foundPerson.ID, mode);

                    if (errorMessage) {
                        if (errorMessage.includes("failed 'Valid_If' condition")) {
                            setState((draft) => {
                                draft.isNotificationOpen = true;
                                draft.notificationProps = { severity: "info", message: `${foundPerson["First Name"]} ${foundPerson["Last Name"]} is already ${(mode === "Check in") ? "checked in" : "checked out"}!` };
                                draft.notificationProps.showImage = true;
                                draft.scannedPerson = null;
                                draft.scannedPerson = { ...foundPerson };
                            });
                        } else {
                            setState((draft) => {
                                draft.isNotificationOpen = true;
                                draft.notificationProps = { severity: "error", message: `${errorMessage}` };
                                draft.notificationProps.showImage = false;
                            });
                        }
                    } else {

                        setState((draft) => {
                            draft.qrCodeHistory[foundPerson.ID] = true;
                            draft.isNotificationOpen = true;
                            draft.notificationProps = { severity: "success", message: `${foundPerson["First Name"]} ${foundPerson["Last Name"]} has been ${(mode === "Check in") ? "checked in" : "checked out"} successfully` };
                            draft.notificationProps.showImage = true;
                            draft.scannedPerson = { ...foundPerson };
                            if (mode === "Check in") {
                                draft.persons[foundPersonIndex].CountCheckIn++;
                            } else {
                                draft.persons[foundPersonIndex].CountCheckOut++;
                            }

                        });
                    }

                }
            } else {

                setState((draft) => {
                    draft.isNotificationOpen = true;
                    draft.notificationProps = { severity: "error", message: `Incorrect QR code "${decodedText}". Student is not found.` };
                    draft.notificationProps.showImage = false;
                    draft.scannedPerson = null;
                });
            }
        }

        setState((draft) => {
            draft.counter++;
            draft.scannedValue = decodedText;
        });
        //  });


    };

    return (
        <div>
            {state.isLoading && <LinearProgress />}
            {!state.isQRCodeMode && (
                <>

                    <Box m={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 'xs' }}>
                        <Stack spacing={3}>
                            {state.persons.map((person) => (
                                <PersonCard
                                    key={person.ID}
                                    firstName={person['First Name']}
                                    lastName={person['Last Name']}
                                    image={person.PictureURL}
                                    subtitle={person.Subtitle}
                                    isThumbsUp={isThumbsUp(person.CountCheckIn, person.CountCheckOut)}
                                    isWaivingHand={isThumbsUp(person.CountCheckIn, person.CountCheckOut) && (mode === "Check out")}
                                    isVisible={(isThumbsUp(person.CountCheckIn, person.CountCheckOut) || (mode === "Check in"))}
                                    personId={person.ID}
                                    thumbsUpClick={onNewScanResult}
                                />
                            ))}
                        </Stack>
                    </Box>


                    <Box sx={{ position: 'fixed', bottom: 72, right: 16 }}>
                        <Fab color="primary" aria-label="add" onClick={() => setState((draft) => { draft.isQRCodeMode = true; })}>
                            <QrCode2Rounded />
                        </Fab>
                    </Box>
                </>
            )}
            {state.isQRCodeMode && (
                <>
                    <Box m={2}>
                        <Box
                            sx={{
                                maxWidth: 500,
                                margin: '0 auto',
                            }}>
                            <p>QR: {state.scannedValue}<br />
                                GPS: {location.latitude}, {location.longitude}<br />
                                {/* Time: {datetime.toTimeString()} */}
                            </p>
                            <QRCodeComponent showBox={true} qrCodeSuccessCallback={onNewScanResult} delay={3000} />
                        </Box>
                    </Box>
                    <Box sx={{ position: 'fixed', bottom: 72, right: 16 }}>
                        <Fab color="primary" aria-label="add" onClick={() => setState((draft) => { draft.isQRCodeMode = false; })}>
                            <CloseRounded />
                        </Fab>
                    </Box>
                </>
            )}
            {state.isNotificationOpen && <Snackbar
                open={state.isNotificationOpen}
                autoHideDuration={7000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={state.notificationProps.severity} sx={{ width: '100%' }}>
                    <Box display="flex" alignItems="center">
                        {state.notificationProps.showImage && (<Avatar
                            src={state.scannedPerson?.PictureURL}
                            sx={{
                                width: { xs: 40, sm: 40, md: 40 },
                                height: { xs: 40, sm: 40, md: 40 },
                                marginRight: '16px' // Add margin to the right
                            }}>
                        </Avatar>)}
                        {state.notificationProps.message}
                    </Box>
                </Alert>

            </Snackbar>}
            {/* <Box sx={{ position: 'fixed', bottom: 144, right: 16 }}>
                <Fab color="primary" aria-label="test" onClick={testQRCodeScan1}>
                    <TextsmsTwoTone />
                </Fab>
            </Box> */}
        </div>
    );
};

export default CheckInOut;


