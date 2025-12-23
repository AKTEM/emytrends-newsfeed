import React from "react";

interface UserIconProps {
  className?: string;
}

export const UserIcon: React.FC<UserIconProps> = ({ className = "" }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.0003 10.8333C15.3936 10.8333 17.3337 8.89322 17.3337 6.49999C17.3337 4.10676 15.3936 2.16666 13.0003 2.16666C10.6071 2.16666 8.66699 4.10676 8.66699 6.49999C8.66699 8.89322 10.6071 10.8333 13.0003 10.8333Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M21.6668 18.9583C21.6668 21.6504 21.6668 23.8333 13.0002 23.8333C4.3335 23.8333 4.3335 21.6504 4.3335 18.9583C4.3335 16.2662 8.214 14.0833 13.0002 14.0833C17.7863 14.0833 21.6668 16.2662 21.6668 18.9583Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
