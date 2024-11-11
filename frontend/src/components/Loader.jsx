import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center text-center w-screen h-screen ">
      <img
        className="w-60 h-40 mx-auto mb-0 mt-5 animate-pulse m-auto opacity-65"
        src="/StayMate logo.png"
        alt="Staymate Logo"
      />
    </div>
  );
};

export default Loader;
