import axios from 'axios';

export interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export default axios.create({
    baseURL: 'https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api'
});