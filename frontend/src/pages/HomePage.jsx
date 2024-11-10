import React from "react";
import Navbar from "../components/Navbar";
import Listings from "../components/Listings";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <Navbar />
      <Listings />
      <Footer />
    </div>
  );
};

export default HomePage;
