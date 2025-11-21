import React from "react";

type Props = {
  error: string;
};

const Error: React.FC<Props> = ({ error }) => {
  return <p className="text-error text-sm mb-4">{error}</p>;
};

export default Error;
