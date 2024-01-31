import { useEffect, useState } from "react";
import { doQuery, doQueries, RequestMethodType } from "doquery";

export const useQuery = <T, E>(url: string | string[], method? : RequestMethodType | RequestMethodType[], header? : object | object[], body? : object | object[], DependencyList? : any[]) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<E | null>(null);
  const [response, setResponse] = useState<T | null>(null);

  const doSingleQuery = async (url: string, method? : RequestMethodType, header? : object, body? : object) => {
      setIsLoading(true);
      setError(null);
      const defaultHeader = {
        "Content-Type" : "application/json",
        ...header
      }
      const { success, error, response } = await doQuery<T, E>({
        url : url,
        method : method,
        header : defaultHeader,
        body : body
      });

      if(!success){
        setError(error);
      }else{
        setResponse(response);
      }

      setIsLoading(false);

  }

  const doMultipleQuery = async (urls: string[], methods? : RequestMethodType[], headers? : object[], bodies? : object[]) => {
      setIsLoading(true);
      setError(null);
      const { successes, errors, responses } = await doQueries<T, E>({
        urls : urls.filter((value) => value !== ""),
        methods : methods,
        headers : headers,
        bodies : bodies
      });

      const isAnyError = successes.includes(false);
      if(isAnyError){
        setError(errors);
        setIsLoading(false);
        return;
      }

      setResponse(responses);

      setIsLoading(false);
  }

  useEffect(() => {
      if(url === "" || url.length === 0) return setIsLoading(false);

      if(Array.isArray(url) || Array.isArray(method) || Array.isArray(header) || Array.isArray(body)){
        const urls = typeof url === "string" ? [] : url;
        const methods = Array.isArray(method) ? [...method] : [];
        const headers = Array.isArray(header) ? [...header] : [];
        const bodies = Array.isArray(body) ? [...body] : [];
        doMultipleQuery(urls, methods, headers, bodies);
      }else{
        doSingleQuery(url, method, header, body);
      }

    }, DependencyList || [url])

  

  return { isLoading, error, response }

}