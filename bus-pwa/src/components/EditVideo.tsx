import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, Alert, MenuItem, Container } from '@mui/material';
//import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { enUS } from '@mui/x-date-pickers/locales';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import dayjs, { Dayjs } from 'dayjs';

import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import { VideoCategory, Video, blankVideo } from '../interfaces';
import { useLocation } from 'react-router-dom';
//import { DesktopDatePicker } from '@mui/lab';
//import { MobileDatePicker } from '@mui/lab';

interface EditVideoProps {
    mode: 'create' | 'update';

}

const EditVideo: React.FC<EditVideoProps> = ({ mode }) => {
    const location = useLocation();
    const video = location.state?.video as Video;
    const [formFields, setFormFields] = useState<Video>(video || blankVideo());
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Video>(video || blankVideo());
    const [categories, setCategories] = useState<VideoCategory[]>([]);

    useEffect(() => {
        // Fetch video categories from API
        axios.get('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videocategories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching video categories:', error);
            });
    }, []);

    useEffect(() => {
        validateFields();
    }, [formFields]);

    const validateFields = () => {
        let isValid = true;
        let errors = blankVideo();

        if (formFields.Description.length <= 0) {
            isValid = false;
            errors.Description = 'This entry is required';
        }

        if (formFields.Details.length <= 0) {
            isValid = false;
            errors.Details = 'This entry is required';
        }

        if (formFields.URL.length < 5) {
            isValid = false;
            errors.URL = 'URL must be at least 5 characters long';
        }

        if (formFields.Category.length <= 0) {
            isValid = false;
            errors.Category = 'This entry is required';
        }

        if (formFields['Created By'].length <= 0) {
            isValid = false;
            errors['Created By'] = 'This entry is required';
        }

        if (formFields['Uploaded By'].length <= 0) {
            isValid = false;
            errors['Uploaded By'] = 'This entry is required';
        }

        if (formFields['Date and Time Uploaded'].length <= 0) {
            isValid = false;
            errors['Date and Time Uploaded'] = 'This entry is required';
        }

        setErrors(errors);
        return isValid;
    };

    const handleInputChange = (event: any, name?: string) => {

        if (event instanceof dayjs) {
            if ((event as Dayjs).isValid) {
                setFormFields({
                    ...formFields,
                    [name as string]: (event as Dayjs).format('MM/DD/YYYY')
                });
            }
        } else {

            setFormFields({
                ...formFields,
                [event.target.name as string]: event.target.value
            });

        }
        //validateFields();
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);

        if (!validateFields()) {
            return;
        }

        // Send POST request to API
        try {
            // Send POST request to API
            //const response = await axios.post('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos', formFields);
            let response;
            if (mode === 'create') {
                // Send POST request to API
                response = await axios.post('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos', formFields);
            } else if (mode === 'update') {
                // Send PUT request to API
                response = await axios.put(`https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos`, formFields);
            }

            if (response && response.status === 200) {
                console.log('Video created:', response.data);
                navigate(-1);
            } else {
                console.error('Error creating video:', response?.data.message);
                setMessage(`Error creating video: ${response?.data.message}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error creating video:', error.response?.data.message);
                setMessage(`Error creating video: ${error.response?.data.message}`);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
            <form onSubmit={handleSubmit} noValidate autoComplete='off'>

                <Stack spacing={3}>
                    <TextField
                        name="Description"
                        label="Description"
                        value={formFields.Description}
                        onChange={handleInputChange}
                        helperText={submitted && errors.Description}
                        error={submitted && !!errors.Description}
                        required
                    />
                    <TextField
                        name="Details"
                        label="Details"
                        value={formFields.Details}
                        onChange={handleInputChange}
                        helperText={submitted && errors.Details}
                        error={submitted && !!errors.Details}
                        required
                    />
                    <TextField
                        name="URL"
                        label="URL"
                        value={formFields.URL}
                        onChange={handleInputChange}
                        helperText={submitted && errors.URL}
                        error={submitted && !!errors.URL}
                        required
                    />

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
                    />
                    {message && <Alert severity="error">{message}</Alert>}
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="primary"
                        type="submit"
                    >
                        {mode === 'create' ? 'Create Video' : 'Update Video'}
                    </Button>
                </Stack>

            </form>
        </Container>
    );

};

export default EditVideo;
