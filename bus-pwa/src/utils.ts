import { jwtDecode } from 'jwt-decode';

const storageKeyPrefix = 'bus_app_';

export function decodeToken(): null | { [key: string]: any } {
    const token = localStorage.getItem(`${storageKeyPrefix}token`);
    if (token == null) {
        return null;
    }
    if (token != null) {
        const decodedToken = jwtDecode(token);
        if (decodedToken == null) {
            return null;
        } else {
            return decodedToken;
        }
    }
    return null;
}

export function getDataFromLocalStorage(name: string): null | { [key: string]: any } {
    const data = localStorage.getItem(`${storageKeyPrefix}${name}`);
    if (data == null) {
        return null;
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error('Error parsing JSON from local storage', e);
        return null;
    }
}

export function putDataToLocalStorage(name: string, jsonData: { [key: string]: any }): void {
    const data = JSON.stringify(jsonData);
    localStorage.setItem(`${storageKeyPrefix}${name}`, data);
}

export function convertDateFormat(inputDate: string): string {
    const parts = inputDate.split('/');

    if (parts.length === 3) {
        const [month, day, year] = parts;
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return formattedDate;
    } else {
        return ""; // Invalid input format
    }
}