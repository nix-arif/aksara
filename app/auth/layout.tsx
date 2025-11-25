import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-radial from-pink-200 from-40% to-fuchsia-200">
      {children}
    </div>
  );
};

export default AuthLayout;
