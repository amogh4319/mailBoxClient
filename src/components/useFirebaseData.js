import { useEffect, useState } from 'react';

const useFirebaseData = (fetchUrl, onDataLoaded) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        if (onDataLoaded) {
          onDataLoaded(fetchedData);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [fetchUrl, onDataLoaded]);

  return data;
};

export default useFirebaseData;
