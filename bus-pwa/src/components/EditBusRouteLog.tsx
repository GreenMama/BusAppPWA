import React, { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import useFetchData from '../hooks/useFetchData';
import { TextField, Button, Stack, Alert, MenuItem, Container } from '@mui/material';
//import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { enUS } from '@mui/x-date-pickers/locales';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import dayjs, { Dayjs } from 'dayjs';

import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import { BusRouteLog, blankBusRouteLog } from '../interfaces';
import { useLocation } from 'react-router-dom';

import { QuickTextField, PropagateToChildren } from './QuickComponents'


interface ComponentState {
    fields: BusRouteLog;
    errors: BusRouteLog;
    isSubmitted: boolean;
    isLoading: boolean;
    message: string;
}

interface ComponentProps {
    mode: 'create' | 'update';
}

const Component: React.FC<ComponentProps> = ({ mode }) => {
    const [state, setState] = useImmer<ComponentState>({
        fields: blankBusRouteLog(),
        errors: blankBusRouteLog(),
        isSubmitted: false,
        isLoading: false,
        message: '',
    });
    const { data: busesData, error: busesError, loading: busesLoading } = useFetchData(`/Buses`, `buses`);

    useEffect(() => {
        setState((draft) => {
            draft.isLoading = busesLoading;
        });
    }, [busesLoading]);

    useEffect(() => {
        if (busesError) {
            console.error('Error fetching buses data:', busesError);
        }
    }, [busesError]);

    // const location = useLocation();
    // const video = location.state?.video as Video;
    // const [formFields, setFormFields] = useState<Video>(video || blankVideo());
    // const [message, setMessage] = useState('');
    // const navigate = useNavigate();
    // const [submitted, setSubmitted] = useState(false);
    // const [errors, setErrors] = useState<Video>(video || blankVideo());
    // const [categories, setCategories] = useState<VideoCategory[]>([]);

    // useEffect(() => {
    //     // Fetch video categories from API
    //     axios.get('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videocategories')
    //         .then(response => {
    //             setCategories(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching video categories:', error);
    //         });
    // }, []);

    useEffect(() => {
        validateFields();
    }, [state.fields]);

    const validateFields = () => {
        let isValid = true;
        let errors = blankBusRouteLog();

        if (state.fields.Date.length <= 0) {
            isValid = false;
            errors.Date = 'This entry is required';
        }

        if (state.fields.Bus.length <= 0) {
            isValid = false;
            errors.Bus = 'This entry is required';
        }

        if (state.fields.Route.length <= 0) {
            isValid = false;
            errors.Route = 'This entry is required';
        }

        if (state.fields.Driver.length <= 0) {
            isValid = false;
            errors.Driver = 'This entry is required';
        }

        if (state.fields['Volunteer Monitor'].length <= 0) {
            isValid = false;
            errors['Volunteer Monitor'] = 'This entry is required';
        }

        if (state.fields['YesLiberia Attendee'].length <= 0) {
            isValid = false;
            errors['YesLiberia Attendee'] = 'This entry is required';
        }

        if (state.fields['Start Time'].length <= 0) {
            isValid = false;
            errors['Start Time'] = 'This entry is required';
        }

        if (state.fields['End Time'].length <= 0) {
            isValid = false;
            errors['End Time'] = 'This entry is required';
        }

        if (!/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(state.fields['Fuel In'])) {
            isValid = false;
            errors['Fuel In'] = 'This entry is invalid, must be a number';
        }

        if (state.fields['Fuel In'].length <= 0) {
            isValid = false;
            errors['Fuel In'] = 'This entry is required';
        }

        if (!/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(state.fields['Fuel Out'])) {
            isValid = false;
            errors['Fuel Out'] = 'This entry is invalid, must be a number';
        }

        if (state.fields['Fuel Out'].length <= 0) {
            isValid = false;
            errors['Fuel Out'] = 'This entry is required';
        }

        if (!/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(state.fields['Miles on Odometer'])) {
            isValid = false;
            errors['Miles on Odometer'] = 'This entry is invalid, must be a number';
        }

        if (state.fields['Miles on Odometer'].length <= 0) {
            isValid = false;
            errors['Miles on Odometer'] = 'This entry is required';
        }

        if (!/^[1-9]\d*$/.test(state.fields['Number of Passengers'])) {
            isValid = false;
            errors['Number of Passengers'] = 'This entry is invalid, must be an integer';
        }

        if (state.fields['Number of Passengers'].length <= 0) {
            isValid = false;
            errors['Number of Passengers'] = 'This entry is required';
        }






        // if (formFields.URL.length < 5) {
        //     isValid = false;
        //     errors.URL = 'URL must be at least 5 characters long';
        // }



        setState((darft) => {
            darft.errors = errors;
        });

        return isValid;
    };

    const handleInputChange = (event: any, name?: string) => {

        // if (event instanceof dayjs) {
        //     if ((event as Dayjs).isValid) {
        //         setFormFields({
        //             ...formFields,
        //             [name as string]: (event as Dayjs).format('MM/DD/YYYY')
        //         });
        //     }
        // } else {

        //     setFormFields({
        //         ...formFields,
        //         [event.target.name as string]: event.target.value
        //     });

        // }
        //validateFields();
        setState((draft) => {
            // Use type assertion to inform TypeScript that the key exists
            (draft.fields as Record<string, string>)[event.target.name] = event.target.value;
        });
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setState((draft) => {
            draft.isSubmitted = true;
        });

        if (!validateFields()) {
            return;
        }

        // // Send POST request to API
        // try {
        //     // Send POST request to API
        //     //const response = await axios.post('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos', formFields);
        //     let response;
        //     if (mode === 'create') {
        //         // Send POST request to API
        //         response = await axios.post('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos', formFields);
        //     } else if (mode === 'update') {
        //         // Send PUT request to API
        //         response = await axios.put(`https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos`, formFields);
        //     }

        //     if (response && response.status === 200) {
        //         console.log('Video created:', response.data);
        //         navigate(-1);
        //     } else {
        //         console.error('Error creating video:', response?.data.message);
        //         setMessage(`Error creating video: ${response?.data.message}`);
        //     }
        // } catch (error) {
        //     if (axios.isAxiosError(error)) {
        //         console.error('Error creating video:', error.response?.data.message);
        //         setMessage(`Error creating video: ${error.response?.data.message}`);
        //     } else {
        //         console.error('An unexpected error occurred:', error);
        //     }
        // }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
            <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                <Stack spacing={3}>
                    <PropagateToChildren required fields={state.fields} errors={state.errors} isSubmitted={state.isSubmitted}>
                        <QuickTextField name="Driver" />
                    </PropagateToChildren>
                    <TextField
                        name="Date"
                        label="Date"
                        value={state.fields.Date}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors.Date}
                        error={state.isSubmitted && !!state.errors.Date}
                        required
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="Bus"
                        label="Bus"
                        value={state.fields.Bus}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors.Bus}
                        error={state.isSubmitted && !!state.errors.Bus}
                        required
                        select>
                        {busesData?.map((item: any) => (
                            <MenuItem value={item.ID}>
                                {item.Name}
                            </MenuItem>
                        ))}
                        <MenuItem value="">
                            <em>Empty</em>
                        </MenuItem>
                    </TextField>
                    <TextField
                        name="Route"
                        label="Route"
                        value={state.fields.Route}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors.Route}
                        error={state.isSubmitted && !!state.errors.Route}
                        required
                    />
                    <TextField
                        name="Driver"
                        label="Driver"
                        value={state.fields.Driver}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors.Driver}
                        error={state.isSubmitted && !!state.errors.Driver}
                        required
                    />
                    <TextField
                        name="Volunteer Monitor"
                        label="Volunteer Monitor"
                        value={state.fields['Volunteer Monitor']}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors['Volunteer Monitor']}
                        error={state.isSubmitted && !!state.errors['Volunteer Monitor']}
                        required
                    />
                    <TextField
                        name="YesLiberia Attendee"
                        label="YesLiberia Attendee"
                        value={state.fields['YesLiberia Attendee']}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors['YesLiberia Attendee']}
                        error={state.isSubmitted && !!state.errors['YesLiberia Attendee']}
                        required
                    />

                    <TextField
                        name="Start Time"
                        label="Start Time"
                        value={state.fields['Start Time']}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors['Start Time']}
                        error={state.isSubmitted && !!state.errors['Start Time']}
                        required
                        type="time"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="End Time"
                        label="End Time"
                        value={state.fields['End Time']}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors['End Time']}
                        error={state.isSubmitted && !!state.errors['End Time']}
                        required
                        type="time"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="Fuel In"
                        label="Fuel In"
                        value={state.fields['Fuel In']}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors['Fuel In']}
                        error={state.isSubmitted && !!state.errors['Fuel In']}
                        required
                    />
                    <TextField
                        name="Fuel Out"
                        label="Fuel Out"
                        value={state.fields['Fuel Out']}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors['Fuel Out']}
                        error={state.isSubmitted && !!state.errors['Fuel Out']}
                        required
                    />
                    <TextField
                        name="Miles on Odometer"
                        label="Miles on Odometer"
                        value={state.fields['Miles on Odometer']}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors['Miles on Odometer']}
                        error={state.isSubmitted && !!state.errors['Miles on Odometer']}
                        required
                    />
                    <TextField
                        name="Number of Passengers"
                        label="Number of Passengers"
                        value={state.fields['Number of Passengers']}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors['Number of Passengers']}
                        error={state.isSubmitted && !!state.errors['Number of Passengers']}
                        required
                    />
                    <TextField
                        name="Notes"
                        label="Notes"
                        value={state.fields.Notes}
                        onChange={handleInputChange}
                        helperText={state.isSubmitted && state.errors.Notes}
                        error={state.isSubmitted && !!state.errors.Notes}

                    />
                    {/* 

                    <TextField
                        name="Category"
                        label="Category"
                        value={formFields.Category}
                        onChange={handleInputChange}
                        required
                        select
                        helperText={submitted && errors.Category}
                        error={submitted && !!errors.Category}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.Category} value={category.Category}>
                                {category.Category}
                            </MenuItem>
                        ))}
                        <MenuItem value="">
                            <em>Empty</em>
                        </MenuItem>
                    </TextField>

                    <TextField
                        name="Created By"
                        label="Created By"
                        value={formFields["Created By"]}
                        onChange={handleInputChange}
                        required
                        helperText={submitted && errors['Created By']}
                        error={submitted && !!errors['Created By']}
                    />
                    <TextField
                        name="Uploaded By"
                        label="Uploaded By"
                        value={formFields["Uploaded By"]}
                        onChange={handleInputChange}
                        required
                        helperText={submitted && errors['Uploaded By']}
                        error={submitted && !!errors['Uploaded By']}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                        <DesktopDatePicker
                            label="Date and Time Uploaded"
                            value={dayjs(formFields["Date and Time Uploaded"])}
                            //onChange={}
                            onChange={(value) => handleInputChange(value, "Date and Time Uploaded")}
                            slots={{
                                textField: textFieldProps => <TextField required
                                    helperText={submitted && errors["Date and Time Uploaded"]}
                                    error={submitted && !!errors["Date and Time Uploaded"]}

                                    {...textFieldProps} />
                            }}

                        />
                    </LocalizationProvider>

                    <TextField
                        name="Icon"
                        label="Icon"
                        value={formFields.Icon}
                        onChange={handleInputChange}
                        helperText={submitted && errors.Icon}
                        error={submitted && !!errors.Icon}
                    /> */}
                    {state.message && <Alert severity="error">{state.message}</Alert>}
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="primary"
                        type="submit"
                    >
                        {mode === 'create' ? 'Create Log' : 'Update Log'}
                    </Button>
                </Stack>
            </form>
        </Container>
    );

};

export default Component;
