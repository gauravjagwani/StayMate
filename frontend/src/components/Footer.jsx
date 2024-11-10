import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
const support = [
  "Help Centre",
  "StayCover",
  "Anti-discrimination",
  "Disability support",
  "Cancellation options",
  "Report neighbourhood concern",
];
const hosting = [
  "StayMate your home",
  "StayCover for Hosts",
  "Hosting resources",
  "Community forum",
  "Hosting responsibly",
  "Join a free Hosting class",
  "Find a co‑host",
];

const staymate = [
  "Newsroom",
  "New features",
  "Careers",
  "Investors",
  "StayMate.org emergency stays",
];

const Footer = () => {
  return (
    <div className="mt-4">
      <div className="bg-primary w-full flex justify-between items-center px-4 py-3">
        <div className="text-white">
          Get Connected with us on Social Network
        </div>
        <div className="flex items-center gap-3 text-white w-[15] h-[15] cursor-pointer">
          <FaFacebook />
          <FaXTwitter />
          <FaInstagram />
          <FaGoogle />
        </div>
      </div>
      <div className="bg-gray-200 py-[40px] px-[70px]">
        <div className="flex justify-evenly">
          <div>
            <p className="font-medium text-base">Support</p>
            <ul className="mt-1">
              {support.map((item, i) => {
                return (
                  <li key={i} className="mt-2 hover:underline">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="font-medium text-base">Hosting</p>
            <ul className="mt-1 ">
              {hosting.map((item, i) => {
                return (
                  <li key={i} className="mt-2 hover:underline">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="font-medium text-base">StayMate</p>
            <ul className="mt-1">
              {staymate.map((item, i) => {
                return (
                  <li key={i} className="mt-2 hover:underline">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-slate-300 text-base py-3 text-center">
        &#169; 2024 Copyright: StayMate
      </div>
    </div>
  );
};

export default Footer;
