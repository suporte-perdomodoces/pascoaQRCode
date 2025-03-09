import type React from "react";
import "./Label.css";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className: string;
}

export default function Label({ htmlFor, children, className }:LabelProps){
  return <label htmlFor={htmlFor} className={className}>
    {children}
    </label>;
}