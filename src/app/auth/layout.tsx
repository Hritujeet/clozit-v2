import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full mt-16 mb-8 flex flex-col justify-center">
      {children}
    </div>
  );
};

export default layout;
