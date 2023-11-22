

export interface VideoCategory {
    _RowNumber: number;
    Category: string;
    // other video category properties
}

export const blankVideoCategory = (): VideoCategory => ({
    _RowNumber: 0,
    Category: ''
});


export interface Video {
    "_RowNumber": string;
    ID: string;
    Description: string;
    Details: string;
    URL: string;
    Category: string;
    "Created By": string;
    "Uploaded By": string;
    "Date and Time Uploaded": string;
    Icon: string;
    IconURL: string;
}

export const blankVideo = (): Video => ({
    "_RowNumber": '',
    ID: '',
    Description: '',
    Details: '',
    URL: '',
    Category: '',
    "Created By": '',
    "Uploaded By": '',
    "Date and Time Uploaded": '',
    Icon: '',
    IconURL: '',
});

export interface SignInFields {
    UserTable: string;
    UserNameField: string;
    UserName: string;
    PasswordField: string;
    Password: string;
}


export const blankSignInFields = (): SignInFields => ({
    UserTable: '',
    UserNameField: '',
    UserName: '',
    PasswordField: '',
    Password: ''
});

export interface Person {
    "_RowNumber": string;
    "ID": string;
    "First Name": string;
    "Last Name": string;
    "Type": string;
    "DOB": string;
    "Age": string;
    "Gender": string;
    "Grade": string;
    "School": string;
    "Community of Residence": string;
    "Student ID": string;
    "Barcode": string;
    "QR Code": string;
    "Picture": string;
    "Name": string;
    "Subtitle": string;
    "Related Boardings": string;
    "Notes": string;
    "Last Status": string;
    "Last Status Time": string;
    "Related BoardingOffs": string;
    "PictureURL": string;
    "CountCheckIn": number;
    "CountCheckOut": number;
}

export const blankPerson = (): Person => ({
    "_RowNumber": '',
    "ID": '',
    "First Name": '',
    "Last Name": '',
    "Type": '',
    "DOB": '',
    "Age": '',
    "Gender": '',
    "Grade": '',
    "School": '',
    "Community of Residence": '',
    "Student ID": '',
    "Barcode": '',
    "QR Code": '',
    "Picture": '',
    "Name": '',
    "Subtitle": '',
    "Related Boardings": '',
    "Notes": '',
    "Last Status": '',
    "Last Status Time": '',
    "Related BoardingOffs": "",
    "PictureURL": "",
    "CountCheckIn": 0,
    "CountCheckOut": 0
});

export interface Quote {
    "_RowNumber": string;
    "ID": string;
    "Quote": string;
    "Related Users": string;
}

export const blankQuote = (): Quote => ({
    "_RowNumber": '',
    "ID": '',
    "Quote": '',
    "Related Users": '',
});

export interface TodaysFocus {
    "_RowNumber": string;
    "ID": string;
    "Focus": string;
    "Related Users": string;
}

export const blankTodaysFocus = (): TodaysFocus => ({
    "_RowNumber": '',
    "ID": '',
    "Focus": '',
    "Related Users": '',
});

export interface BusRouteLog {
    "_RowNumber": string;
    "ID": string;
    "Date": string;
    "Bus": string;
    "Route": string;
    "Driver": string;
    "Volunteer Monitor": string;
    "YesLiberia Attendee": string;
    "Start Time": string;
    "End Time": string;
    "Fuel In": string;
    "Fuel Out": string;
    "Miles on Odometer": string;
    "Number of Passengers": string;
    "Notes": string;
}

export const blankBusRouteLog = (): BusRouteLog => ({
    "_RowNumber": '',
    "ID": '',
    "Date": '',
    "Bus": '',
    "Route": '',
    "Driver": '',
    "Volunteer Monitor": '',
    "YesLiberia Attendee": '',
    "Start Time": '',
    "End Time": '',
    "Fuel In": '',
    "Fuel Out": '',
    "Miles on Odometer": '',
    "Number of Passengers": '',
    "Notes": ''
});