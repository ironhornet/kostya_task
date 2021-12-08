import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);
        const source = axios.CancelToken.source();
        axios.get(url, { cancelToken: source.token })
            .then(response => {
                setLoading(false);
                setData(response.data)
            })
            .catch(err => {
                setLoading(false)
                setError('Something went wrong...')
            }).finally(() => setLoading(false))
        return () => {
            source.cancel();
        }
    }, [url])

    return { data, loading, error }
}

