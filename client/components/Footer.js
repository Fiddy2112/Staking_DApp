import Link from "next/link";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="mx-auto max-w-screen-xl py-7">
      <div className="grid grid-cols-3 justify-between">
        <div className="flex flex-col">
          <Link className="text-3xl font-bold" href="/">
            Stak
          </Link>
          <div className="mb-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              <FaPhoneAlt />
              000.000.000.0
            </span>
            <span className="flex items-center gap-2">
              <MdEmail />
              xxXx@gmail.com
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold font-mono mb-2">Quick Menu</h3>
          <div>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link className="text-base font-normal font-mono" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-normal font-mono"
                  href="/staking"
                >
                  Staking
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-normal font-mono"
                  href="/crypto"
                >
                  Crypto
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-normal font-mono"
                  href="/partners"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold font-mono mb-2">Subscribes</h3>
          <div>
            <div className="w-full flex items-center p-1 rounded-md bg-white text-black">
              <input
                className="w-full outline-none px-2"
                type="text"
                placeholder="Email"
              />
              <button className="outline-none bg-black text-white p-2 w-8 h-8 flex items-center justify-center rounded-md">
                /
              </button>
            </div>
          </div>
          <div>
            <ul className="flex items-center gap-2 mt-2">
              <li className="p-2 rounded-lg bg-white text-black">
                <Link className="text-base" href="#">
                  <FaFacebookF />
                </Link>
              </li>
              <li className="p-2 rounded-lg bg-white text-black">
                <Link className="text-base" href="#">
                  <AiFillInstagram />
                </Link>
              </li>
              <li className="p-2 rounded-lg bg-white text-black">
                <Link className="text-base" href="#">
                  <FaTwitter />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" border-t border-t-[#fff] mt-2">
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm font-mono">
            &copy; Copyright 2024.All rights reserved.
          </div>
          <div>
            <ul className="flex items-center gap-4">
              <li>
                <Link className="text-sm font-mono" href="#">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="text-sm font-mono" href="#">
                  License
                </Link>
              </li>
              <li>
                <Link className="text-sm font-mono" href="#">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
