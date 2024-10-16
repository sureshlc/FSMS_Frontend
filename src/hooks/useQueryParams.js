import { useSearchParams } from "react-router-dom";
import { getDefaultValue } from "../constants/default";
function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getQueryParam = (name) => {
    return searchParams.get(name) || getDefaultValue(name);
  };

  // Function to get all query parameters
  const getAllQueryParams = () => {
    const paramsObject = {};
    searchParams.forEach((value, key) => {
      paramsObject[key] = value;
    });
    return paramsObject;
  };

  const setQueryParam = (name, value) => {
    setSearchParams(
      (prev) => {
        prev.set(name, value);
        return prev;
      },
      { replace: true }
    );
  };

  // setting default values
  const setDefaultQueryParam = (name) => {
    let currentValue = getQueryParam(name);
    setQueryParam(name, currentValue);
  };

  // Function to delete a query parameter
  const deleteQueryParam = (name) => {
    setSearchParams(
      (prev) => {
        prev.delete(name);
        return prev;
      },
      { replace: true }
    );
  };

  return {
    searchParams,
    getQueryParam,
    setQueryParam,
    setDefaultQueryParam,
    getAllQueryParams,
    deleteQueryParam,
  };
}

export default useQueryParams;
