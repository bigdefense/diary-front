/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import axios from 'src/Utils/api';

/**
 * axios
 * @param {url}
 * @param {method}
 * @param {body}
 * @param {routePath}
 */

const useAxios = () => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const operation = async ({
    method, url, payload, headers,
  }) => {
    try {
      setLoading(true);
      const result = await axios.request({
        method,
        url,
        data: payload,
        withCredentials: true,
        // headers,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResponse(result.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    response, error, loading, operation,
  };
};

export default useAxios;
