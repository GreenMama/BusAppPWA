import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import useFetchData from '../hooks/useFetchData';
import useCreateData from '../hooks/useCreateData';
import { Button, Stack, Alert, Container, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Video, blankVideo } from '../interfaces';
import { useLocation } from 'react-router-dom';
import { QuickTextField, QuickDateField, QuickSelectField, PropagateToChildren, Option } from './QuickComponents';
//import { convertDateFormat } from "../utils";


interface ComponentState {
    fields: Video;
    errors: Video;
    isSubmitted: boolean;
    isLoading: boolean;
    message: string;
    categoryOptions?: Option[];

}

interface ComponentProps {
    mode: 'create' | 'update';
}

const Component: React.FC<ComponentProps> = ({ mode }) => {
    const location = useLocation();
    const initialVideo = location.state?.value as Video;
    const [state, setState] = useImmer<ComponentState>({
        fields: blankVideo(),
        errors: blankVideo(),
        isSubmitted: false,
        isLoading: false,
        message: '',
    });
    const navigate = useNavigate();
    const { data: categoriesData, error: categoriesError, loading: categoriesLoading } = useFetchData(`/Videos Categories`, `videoCategories`);
    const { error: createError, loading: createLoading, createData, updateData } = useCreateData(`/Preloaded Videos`);

    useEffect(() => {
        // Initialize valus
        if (mode == "create") {
            //here you can add defaults
        } else {
            setState((draft) => {
                draft.fields = initialVideo ? initialVideo : draft.fields;
                //draft.fields['Date and Time Uploaded'] = draft.fields['Date and Time Uploaded'] ? convertDateFormat(draft.fields['Date and Time Uploaded']) : "";
            });
        }

    }, []);

    useEffect(() => {
        setState((draft) => {
            draft.isLoading = categoriesLoading || createLoading;
        });
    }, [categoriesLoading, createLoading]);

    useEffect(() => {
        if (categoriesError) { console.error('Error categories  data:', categoriesError); }
    }, [categoriesError]);

    useEffect(() => {
        setState((draft) => {
            draft.message = createError ? createError : '';
        });
    }, [createError]);

    useEffect(() => {
        const remappedData = categoriesData?.map((item: any) => ({
            value: item.Category,
            name: item.Category,
        }));
        setState((draft) => {
            draft.categoryOptions = remappedData;

        });
    }, [categoriesData]);


    useEffect(() => {
        validateFields();
    }, [state.fields]);

    const validateFields = () => {
        let isValid = true;
        let errors = blankVideo();

        if (state.fields.Description.length <= 0) {
            isValid = false;
            errors.Description = 'This entry is required';
        }

        if (state.fields.Details.length <= 0) {
            isValid = false;
            errors.Details = 'This entry is required';
        }

        if (!/^(http|https):\/\/[^ "]+$/.test(state.fields.URL)) {
            isValid = false;
            errors.URL = 'Please enter a valid URL (e.g. http://www.youtube.com/abc123)';
        }

        if (state.fields.URL.length <= 0) {
            isValid = false;
            errors.URL = 'This entry is required';
        }

        if (state.fields.Category.length <= 0) {
            isValid = false;
            errors.Category = 'This entry is required';
        }

        if (state.fields['Created By'].length <= 0) {
            isValid = false;
            errors['Created By'] = 'This entry is required';
        }

        if (state.fields['Uploaded By'].length <= 0) {
            isValid = false;
            errors['Uploaded By'] = 'This entry is required';
        }

        if (state.fields['Date and Time Uploaded'].length <= 0) {
            isValid = false;
            errors['Date and Time Uploaded'] = 'This entry is required';
        }


        setState((darft) => {
            darft.errors = errors;
        });

        return isValid;
    };

    const handleInputChange = (event: any) => { //, name?: string

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

        let result;
        if (mode === 'create') {
            result = await createData(state.fields);
        } else {
            result = await updateData(state.fields);
        }


        if (result === 200) {
            navigate(-1);
        }

        //console.log(createdData);
    };

    return (
        <div>
            {state.isLoading && <LinearProgress sx={{ position: 'sticky', top: 0 }} />}
            <Container component="main" maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
                <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                    <Stack spacing={3}>
                        <PropagateToChildren fields={state.fields} errors={state.errors} isSubmitted={state.isSubmitted} onChange={handleInputChange}>
                            <PropagateToChildren required>
                                <QuickTextField name="Description" />
                                <QuickTextField name="Details" />
                                <QuickTextField name="URL" />
                                <QuickSelectField name="Category" options={state.categoryOptions} />
                                <QuickTextField name="Created By" />
                                <QuickTextField name="Uploaded By" />
                                <QuickDateField name="Date and Time Uploaded" />
                            </PropagateToChildren>
                            <QuickTextField name="Icon" />
                        </PropagateToChildren>

                        {state.message && <Alert severity="error">{state.message}</Alert>}
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            type="submit"
                            disabled={state.isLoading}
                        >
                            {mode === 'create' ? 'Create Video' : 'Update Video'}
                        </Button>
                    </Stack>
                </form>
            </Container>

        </div>
    );

};

export default Component;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Stack, Alert, MenuItem, Container } from '@mui/material';
// //import Container from '@mui/material/Container';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { enUS } from '@mui/x-date-pickers/locales';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import 'dayjs/locale/en';
// import dayjs, { Dayjs } from 'dayjs';

// import { DesktopDatePicker } from '@mui/x-date-pickers';
// import { useNavigate } from 'react-router-dom';
// import { VideoCategory, Video, blankVideo } from '../interfaces';
// import { useLocation } from 'react-router-dom';
// //import { DesktopDatePicker } from '@mui/lab';
// //import { MobileDatePicker } from '@mui/lab';

// interface EditVideoProps {
//     mode: 'create' | 'update';

// }

// const EditVideo: React.FC<EditVideoProps> = ({ mode }) => {
//     const location = useLocation();
//     const video = location.state?.video as Video;
//     const [formFields, setFormFields] = useState<Video>(video || blankVideo());
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
//     const [submitted, setSubmitted] = useState(false);
//     const [errors, setErrors] = useState<Video>(video || blankVideo());
//     const [categories, setCategories] = useState<VideoCategory[]>([]);

//     useEffect(() => {
//         // Fetch video categories from API
//         axios.get('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videocategories')
//             .then(response => {
//                 setCategories(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching video categories:', error);
//             });
//     }, []);

//     useEffect(() => {
//         validateFields();
//     }, [formFields]);

//     const validateFields = () => {
//         let isValid = true;
//         let errors = blankVideo();

//         if (formFields.Description.length <= 0) {
//             isValid = false;
//             errors.Description = 'This entry is required';
//         }

//         if (formFields.Details.length <= 0) {
//             isValid = false;
//             errors.Details = 'This entry is required';
//         }

//         if (formFields.URL.length < 5) {
//             isValid = false;
//             errors.URL = 'URL must be at least 5 characters long';
//         }

//         if (formFields.Category.length <= 0) {
//             isValid = false;
//             errors.Category = 'This entry is required';
//         }

//         if (formFields['Created By'].length <= 0) {
//             isValid = false;
//             errors['Created By'] = 'This entry is required';
//         }

//         if (formFields['Uploaded By'].length <= 0) {
//             isValid = false;
//             errors['Uploaded By'] = 'This entry is required';
//         }

//         if (formFields['Date and Time Uploaded'].length <= 0) {
//             isValid = false;
//             errors['Date and Time Uploaded'] = 'This entry is required';
//         }

//         setErrors(errors);
//         return isValid;
//     };

//     const handleInputChange = (event: any, name?: string) => {

//         if (event instanceof dayjs) {
//             if ((event as Dayjs).isValid) {
//                 setFormFields({
//                     ...formFields,
//                     [name as string]: (event as Dayjs).format('MM/DD/YYYY')
//                 });
//             }
//         } else {

//             setFormFields({
//                 ...formFields,
//                 [event.target.name as string]: event.target.value
//             });

//         }
//         //validateFields();
//     };


//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         setSubmitted(true);

//         if (!validateFields()) {
//             return;
//         }

//         // Send POST request to API
//         try {
//             // Send POST request to API
//             //const response = await axios.post('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos', formFields);
//             let response;
//             if (mode === 'create') {
//                 // Send POST request to API
//                 response = await axios.post('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos', formFields);
//             } else if (mode === 'update') {
//                 // Send PUT request to API
//                 response = await axios.put(`https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/videos`, formFields);
//             }

//             if (response && response.status === 200) {
//                 console.log('Video created:', response.data);
//                 navigate(-1);
//             } else {
//                 console.error('Error creating video:', response?.data.message);
//                 setMessage(`Error creating video: ${response?.data.message}`);
//             }
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 console.error('Error creating video:', error.response?.data.message);
//                 setMessage(`Error creating video: ${error.response?.data.message}`);
//             } else {
//                 console.error('An unexpected error occurred:', error);
//             }
//         }
//     };

//     return (
//         <Container component="main" maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
//             <form onSubmit={handleSubmit} noValidate autoComplete='off'>

//                 <Stack spacing={3}>
//                     <TextField
//                         name="Description"
//                         label="Description"
//                         value={formFields.Description}
//                         onChange={handleInputChange}
//                         helperText={submitted && errors.Description}
//                         error={submitted && !!errors.Description}
//                         required
//                     />
//                     <TextField
//                         name="Details"
//                         label="Details"
//                         value={formFields.Details}
//                         onChange={handleInputChange}
//                         helperText={submitted && errors.Details}
//                         error={submitted && !!errors.Details}
//                         required
//                     />
//                     <TextField
//                         name="URL"
//                         label="URL"
//                         value={formFields.URL}
//                         onChange={handleInputChange}
//                         helperText={submitted && errors.URL}
//                         error={submitted && !!errors.URL}
//                         required
//                     />

//                     <TextField
//                         name="Category"
//                         label="Category"
//                         value={formFields.Category}
//                         onChange={handleInputChange}
//                         required
//                         select
//                         helperText={submitted && errors.Category}
//                         error={submitted && !!errors.Category}
//                     >
//                         {categories.map((category) => (
//                             <MenuItem key={category.Category} value={category.Category}>
//                                 {category.Category}
//                             </MenuItem>
//                         ))}
//                         <MenuItem value="">
//                             <em>Empty</em>
//                         </MenuItem>
//                     </TextField>

//                     <TextField
//                         name="Created By"
//                         label="Created By"
//                         value={formFields["Created By"]}
//                         onChange={handleInputChange}
//                         required
//                         helperText={submitted && errors['Created By']}
//                         error={submitted && !!errors['Created By']}
//                     />
//                     <TextField
//                         name="Uploaded By"
//                         label="Uploaded By"
//                         value={formFields["Uploaded By"]}
//                         onChange={handleInputChange}
//                         required
//                         helperText={submitted && errors['Uploaded By']}
//                         error={submitted && !!errors['Uploaded By']}
//                     />

//                     <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
//                         <DesktopDatePicker
//                             label="Date and Time Uploaded"
//                             value={dayjs(formFields["Date and Time Uploaded"])}
//                             //onChange={}
//                             onChange={(value) => handleInputChange(value, "Date and Time Uploaded")}
//                             slots={{
//                                 textField: textFieldProps => <TextField required
//                                     helperText={submitted && errors["Date and Time Uploaded"]}
//                                     error={submitted && !!errors["Date and Time Uploaded"]}

//                                     {...textFieldProps} />
//                             }}

//                         />
//                     </LocalizationProvider>

//                     <TextField
//                         name="Icon"
//                         label="Icon"
//                         value={formFields.Icon}
//                         onChange={handleInputChange}
//                         helperText={submitted && errors.Icon}
//                         error={submitted && !!errors.Icon}
//                     />
//                     {message && <Alert severity="error">{message}</Alert>}
//                     <Button
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                         color="primary"
//                         type="submit"
//                     >
//                         {mode === 'create' ? 'Create Video' : 'Update Video'}
//                     </Button>
//                 </Stack>

//             </form>
//         </Container>
//     );

// };

// export default EditVideo;
