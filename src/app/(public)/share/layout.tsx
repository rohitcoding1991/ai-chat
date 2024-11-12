import { appConfig } from "@/app-config";
import Link from "next/link";
import React from "react";

const ShareLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <div className="w-full h-[calc(100%_-_100px)] overflow-y-auto">
        {children}
      </div>
      <div className="h-[100px]">
        <div className="h-full flex justify-center items-center">
          <h1>
            Get Started with{" "}
            <Link
              href="/"
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              {appConfig.name}
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ShareLayout;
