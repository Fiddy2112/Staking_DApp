import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Custom404() {
  return (
    <div className="w-full h-full bg-black py-4">
      <div className="text-center mt-4 font-mono">
        <span className="text-base">Oop! 404 Error!</span>
        <h1 className="text-6xl font-bold">404 - Page Not Found</h1>
        <div className="text-center flex items-center justify-center mt-4">
          <Image src="/404.png" alt="404_image" width={500} height={500} />
        </div>
        <div className="my-4 flex justify-center">
          <a
            href="/"
            className="px-4 py-1 rounded-md text-black font-bold bg-white text-base flex items-center gap-3"
          >
            Back to Home
            <FaArrowRight className="text-base" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Custom404;
