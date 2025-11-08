import React from "react";

interface ErrorAlertProps {
  message?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <>
    {message ? (
      <div className="w-full mb-4 px-4 py-2 rounded bg-red-100 text-red-700 border border-red-300 text-sm font-medium">
        {message}
      </div>
    ) : null}
  </>
);

export default ErrorAlert;
