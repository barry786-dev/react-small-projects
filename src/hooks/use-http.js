import { useCallback, useState } from 'react';

const UseHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dataRequest = useCallback(
    async (requestConfig, applyData, taskText) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        });

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const data = await response.json();
        applyData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    []
  );
  return {
    isLoading,
    error,
    dataRequest,
  };
};

export default UseHttp;
