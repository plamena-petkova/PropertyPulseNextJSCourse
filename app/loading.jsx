"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display:'block',
    margin:'100px auto'
}

const LoadingPage = () => {
  return <ClipLoader size={150} aria-label="Loading Spinner" color="#3b82f6" cssOverride={override} />;
};

export default LoadingPage;
