import { useCallback, useState } from "react";

export const useService = (cb: any) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      await cb();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsError(true);
    }
  }, [cb]);

  return { loading, isError, fetchData };
};
