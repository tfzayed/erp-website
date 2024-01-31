import Axios from "@/lib/axios";
import { useEffect, useReducer } from "react";
import { assetReducer } from "./assetReducer";

const assetsState = () => {
  const initialState = {
    loading: true,
    assets: [],
    error: false,
  };

  const [assetState, assetDispatch] = useReducer(assetReducer, initialState);
  useEffect(() => {
    assetDispatch({
      type: "FETCHING_START",
    });
    Axios.get("asset")
      .then((data) =>
        assetDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.result.map((aset) => {
            return { ...aset, expand: false };
          }),
        }),
      )
      .catch(() => assetDispatch({ type: "FETCHING_FAILED" }));
  }, []);
  return {
    assetState: assetState,
    assetDispatch: assetDispatch,
  };
};

export default assetsState;
