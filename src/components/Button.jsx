import {forwardRef } from "react";

export const Button = forwardRef(
  (
    { className, disabled, ...props },
    ref
  ) => {
    return (
      <button
        disabled={disabled}
        className={`bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded text-center ${className}`}
        {...props}
      />
    );
  }
);