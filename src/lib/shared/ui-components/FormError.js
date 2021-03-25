import React from "react";

export function FormError({ message }) {
  return (
    <p className="text-red text-sm py-2 px-4 mb-2 text-center">{message}</p>
  );
}

export default FormError;
