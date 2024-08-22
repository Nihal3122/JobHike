import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 border-t border-gray-300">
      <div className="container mx-auto px-4 md:px-20 lg:px-44">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <motion.div
            className="w-full md:w-1/3 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900">JobHike</h2>
            <p className="text-gray-600">
              Connecting job seekers with top employers globally.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="w-full md:w-1/3 mb-6 md:px-10 lg:pl-36"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900">Quick Links</h2>
            <ul className="ml-2">
              <li className="mb-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                About Us
              </li>
              <li className="mb-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                Contact Us
              </li>
              <li className="mb-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                Privacy Policy
              </li>
              <li className="mb-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="w-full md:w-1/3 mb-6 md:px-5 lg:px-32"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900">Follow Us</h2>
            <div className="flex space-x-4">
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.734 0-1.325.591-1.325 1.325v21.351c0 .733.591 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.462.099 2.795.143v3.24h-1.917c-1.504 0-1.796.715-1.796 1.763v2.314h3.587l-.467 3.622h-3.12v9.294h6.113c.733 0 1.324-.591 1.324-1.324v-21.351c0-.734-.591-1.325-1.324-1.325z" />
                </svg>
              </span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.607 1.794-1.569 2.163-2.724-.951.565-2.005.974-3.127 1.195-.896-.959-2.173-1.557-3.591-1.557-2.717 0-4.923 2.206-4.923 4.923 0 .385.045.76.127 1.122-4.09-.205-7.719-2.165-10.148-5.144-.422.725-.666 1.567-.666 2.465 0 1.701.868 3.201 2.188 4.078-.806-.026-1.564-.247-2.228-.616v.062c0 2.373 1.688 4.348 3.93 4.799-.412.112-.848.171-1.296.171-.316 0-.624-.031-.924-.089.631 1.953 2.445 3.376 4.604 3.416-1.68 1.319-3.809 2.105-6.115 2.105-.397 0-.788-.023-1.175-.068 2.179 1.396 4.768 2.209 7.548 2.209 9.051 0 14.001-7.496 14.001-13.986 0-.21-.004-.423-.013-.634.961-.695 1.8-1.562 2.46-2.549z" />
                </svg>
              </span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.568c0-1.328-.027-3.042-1.854-3.042-1.856 0-2.14 1.448-2.14 2.942v5.668h-3.554v-11.452h-3.554v11.452h-3.554v-11.452h-3.554v11.452h-3.554v-13.354h3.554v1.826c.497-.828 1.762-2.021 4.117-2.021 4.398 0 5.214 2.896 5.214 6.668v7.881z" />
                </svg>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-8 pt-4">
          <motion.p
            className="text-center text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            &copy; {new Date().getFullYear()} JobHike. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
