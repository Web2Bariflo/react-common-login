import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, method, data = null) => {
  const [response, setResponse] = useState(null);
  const [error,setError]=useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios({
          url,
          method,
          data,
        });
        setResponse(result.data);
      } catch (err) {
        setError(err);
      } 
    };

    fetchData();
    console.log("its from useFetch");
  }, [url, method, data]);

  return { response, error};
};

export default useFetch;
