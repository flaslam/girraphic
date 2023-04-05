import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-center gap-2 bg-brand px-8 py-5 font-heading text-xs text-black transition hover:bg-black hover:text-brand">
      {children}
    </div>
  );
};

export default Button;
