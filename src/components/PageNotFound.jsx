import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-gray-800">
            <h1 className="text-8xl font-extrabold text-pink-500">404</h1>
            <p className="text-2xl font-semibold mt-4">Page Not Found</p>
            <p className="text-lg mt-2 text-gray-600 max-w-md text-center">
                Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted.
            </p>
            <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-3 bg-pink-500 text-white text-lg font-medium rounded-md shadow-md hover:bg-pink-600 transition duration-300"
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default PageNotFound;
