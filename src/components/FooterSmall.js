// src/components/FooterSmall.js

import React from 'react';

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? 'absolute w-full bottom-0 bg-gray-900'
            : 'relative w-full bg-gray-900') + ' pb-6'
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-gray-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-white font-semibold py-1">
                Copyright © {new Date().getFullYear()}{' '}
                <a
                  href="#magumba"
                  className="text-white hover:text-gray-400 text-sm font-semibold py-1"
                >
                  Magumba
                </a>
                . All rights reserved.
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end justify-center">
                <li>
                  <a
                    href="#about"
                    className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                  >
                    Über Uns
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                  >
                    Projekte
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#license"
                    className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                  >
                    Lizenz
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
