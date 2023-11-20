import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import useFetchData from '../hooks/useFetchData';
import useCreateData from '../hooks/useCreateData';
import { Button, Stack, Alert, Container, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BusRouteLog, blankBusRouteLog } from '../interfaces';
import { QuickTextField, QuickDateField, QuickTimeField, QuickSelectField, PropagateToChildren, Option } from './QuickComponents'


interface ComponentState {
    fields: BusRouteLog;
    errors: BusRouteLog;
    isSubmitted: boolean;
    isLoading: boolean;
    message: string;
    busOptions?: Option[];
    driverOptions?: Option[];
    volunteerOptions?: Option[];
    yesLiberiaStaffOptions?: Option[];
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
    const navigate = useNavigate();
    const { data: busesData, error: busesError, loading: busesLoading } = useFetchData(`/Buses`, `buses`);
    const { data: staffData, error: staffError, loading: staffLoading } = useFetchData(`/Staff`, `staff`);
    const { error: createError, loading: createLoading, createData } = useCreateData(`/Bus Route Log`);

    useEffect(() => {
        setState((draft) => {
            draft.isLoading = busesLoading || staffLoading || createLoading;
        });
    }, [busesLoading, staffLoading, createLoading]);

    useEffect(() => {
        if (busesError) { console.error('Error fetching buses data:', busesError); }
        if (staffError) { console.error('Error fetching buses data:', staffError); }
    }, [busesError, staffError]);

    useEffect(() => {
        setState((draft) => {
            draft.message = createError ? createError : '';
        });
    }, [createError]);

    useEffect(() => {
        const remappedData = busesData?.map((item: any) => ({
            value: item.ID,
            name: item.Name,
        }));
        setState((draft) => {
            draft.busOptions = remappedData;
        });
    }, [busesData]);

    useEffect(() => {
        const remappedData = staffData?.map((item: any) => ({
            value: item.ID,
            name: item["_ComputedName"],
        }));
        setState((draft) => {
            draft.driverOptions = remappedData;
            draft.volunteerOptions = remappedData;
            draft.yesLiberiaStaffOptions = remappedData;
        });
    }, [staffData]);

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

        console.log(state.fields);

        const result = await createData(state.fields);

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
                                <QuickDateField name="Date" />
                                <QuickSelectField name="Bus" options={state.busOptions} />
                                <QuickTextField name="Route" />
                                <QuickSelectField name="Driver" options={state.driverOptions} />
                                <QuickSelectField name="Volunteer Monitor" options={state.volunteerOptions} />
                                <QuickSelectField name="YesLiberia Attendee" options={state.yesLiberiaStaffOptions} />
                                <QuickTimeField name="Start Time" />
                                <QuickTimeField name="End Time" />
                                <QuickTextField name="Fuel In" />
                                <QuickTextField name="Fuel Out" />
                                <QuickTextField name="Miles on Odometer" />
                                <QuickTextField name="Number of Passengers" />
                            </PropagateToChildren>
                            <QuickTextField name="Notes" />
                        </PropagateToChildren>

                        {state.message && <Alert severity="error">{state.message}</Alert>}
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            type="submit"
                            disabled={state.isLoading}
                        >
                            {mode === 'create' ? 'Create Log' : 'Update Log'}
                        </Button>
                    </Stack>
                </form>
            </Container>

        </div>
    );

};

export default Component;
