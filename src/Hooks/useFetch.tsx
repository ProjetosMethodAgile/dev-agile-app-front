import { PropsApiReturn } from "@/types/api/apiTypes";
import React from "react";

const useFetch = () => {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const request = React.useCallback(
    async (url: string, options?: PropsApiReturn | RequestInit | any) => {
      let response;
      let json: Promise<any> | any;
      try {
        setError(null);
        setLoading(true);
        response = await fetch(url, options);
        json = await response.json();
        setData(json);
        if (response.ok === false) throw new Error(json.message);
      } catch (err: any) {
        json = null;
        setError(err?.message || "An error occurred");
      } finally {
        setLoading(false);
        return { response, json };
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    request,
    setLoading,
    setError,
  };
};

export default useFetch;
