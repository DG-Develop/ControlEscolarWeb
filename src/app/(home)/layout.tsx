import React, { ReactNode } from "react";
import Navbar from "src/components/Navbar/Navbar";

const WebAppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="home-layout">
      <Navbar />
      {children}
    </main>
  );
};

export default WebAppLayout;