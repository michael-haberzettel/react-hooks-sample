import React from "react";

export function useOneTimeEffect (callback: React.EffectCallback) { React.useEffect(callback, []); }
export function useOneTimePromise<T>(promiseCallback: () => Promise<T>) {
    const [data, setData] = React.useState<T>();

    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await promiseCallback();
                setData(result);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, isLoading, isError };
}