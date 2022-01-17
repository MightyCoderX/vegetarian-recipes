import { useEffect, useState } from "react";

function useFetch(url)
{
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() =>
    {
        const abortController = new AbortController();

        fetch(url, { signal: abortController.signal })
        .then(res =>
        {
            if(!res.ok) throw Error('Could not fetch data for that resource');

            return res.json();
        })
        .then(data =>
        {
            setIsPending(false);
            setData(data);
            setError(null);
        })
        .catch(err =>
        {
            if(err.name === 'AbortError') return;
            setIsPending(false);
            setError(err.message);
        });
        
        return () => abortController.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;