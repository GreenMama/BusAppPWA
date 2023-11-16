import { useEffect, useState } from "react";
import Api from '../Api';
import { getDataFromLocalStorage, putDataToLocalStorage } from '../utils';


const useFetchData = (url: string, localStorageKey: string) => {
    const [data, setData] = useState<{ [key: string]: any; } | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const localData = getDataFromLocalStorage(localStorageKey);
            if (localData) {
                setData(localData);
            }
            try {
                const apiResponse = await Api.get(url);
                if (!apiResponse.data) {
                    throw new Error('No data in API response');
                }
                setData(apiResponse.data);
                putDataToLocalStorage(localStorageKey, apiResponse.data);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || error.message;
                setError(errorMessage);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        })();
    }, [url, localStorageKey]);

    return { data, error, loading };
};

export default useFetchData;