import React from "react";

interface TruncateStringProps {
  text: string;
  maxLength: number;
}

export const TruncateString: React.FC<TruncateStringProps> = ({
  text,
  maxLength,
}) => {
  if (text.length > maxLength) {
    return <div>{text.substring(0, maxLength)}...</div>;
  }
  return <div>{text}</div>;
};
