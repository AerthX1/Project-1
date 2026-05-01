// src/pages/ErrorPage.jsx
import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="mb-4">{error?.statusText || error?.message || "Page not found"}</p>
      <Link to="/" className="text-blue-600 underline">Go Home</Link>
    </div>
  );
};

export default ErrorPage;
