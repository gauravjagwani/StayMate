import React from "react";
import Navbar from "../components/Navbar";
import Listings from "../components/Listings";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <Navbar />
      <Listings />
    </div>
  );
};

export default HomePage;
