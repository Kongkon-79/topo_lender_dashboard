"use client";
import React, { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <>{children}</>;
};

export default AuthProvider;
