import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { BsGlobeCentralSouthAsia } from "react-icons/bs";

import {
  AR,
  BD,
  BN,
  IN,
  PA,
  PH,
  PK,
  SA,
  US,
} from "country-flag-icons/react/3x2";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang).then(() => {
      localStorage.setItem("language", lang);
      setSelectedOption(lang.toUpperCase());
      window.location.reload();
    });
  };
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setSelectedOption(savedLanguage.toUpperCase());
    }
  }, [i18n]);
  const toggleDropdown = (option) => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div ref={dropdownRef} className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center justify-center w-full p-1 text-sm font-medium text-white bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 gap-1"
        >
          <BsGlobeCentralSouthAsia size={24} />

          {selectedOption}
        </button>
        {isOpen && (
          <div className="absolute right-0   mt-2 origin-top-right bg-black  divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className=" py-1 ">
              <div
                onClick={() => {
                  handleOptionClick("EN");
                  changeLanguage("en");
                }}
                href="#"
                className="flex px-4 gap-3 py-2 text-sm text-white hover:bg-neutral-700 cursor-pointer"
              >
                <US title="United States" className="h-auto w-6" />
                English
              </div>
              <div
                onClick={() => {
                  handleOptionClick("AR");
                  changeLanguage("ar");
                }}
                href="#"
                className="flex px-4 gap-3 py-2 text-sm text-white hover:bg-neutral-700 cursor-pointer"
              >
                <SA title="United States" className="h-auto w-6" />
                عربي
              </div>
              <div
                onClick={() => {
                  handleOptionClick("IN");
                  changeLanguage("hi");
                }}
                href="#"
                className="flex px-4 gap-3 py-2 text-sm text-white hover:bg-neutral-700 cursor-pointer"
              >
                <IN title="India" className="h-auto w-6" />
                हिन्दी
              </div>
              <div
                onClick={() => {
                  handleOptionClick("IN(ML)");
                  changeLanguage("ml");
                }}
                href="#"
                className="flex px-4 gap-3 py-2 text-sm text-white hover:bg-neutral-700 cursor-pointer"
              >
                <IN title="India" className="h-auto w-6" />
                മലയാളം
              </div>
              <div
                onClick={() => {
                  handleOptionClick("PK");
                  changeLanguage("ur");
                }}
                href="#"
                className="flex px-4 gap-3 py-2 text-sm text-white hover:bg-neutral-700 cursor-pointer"
              >
                <PK title="Pakistan" className="h-auto w-6" />
                اردو
              </div>
              <div
                onClick={() => {
                  handleOptionClick("PH");
                  changeLanguage("fil");
                }}
                href="#"
                className="flex px-4 gap-3 py-2 text-sm text-white hover:bg-neutral-700 cursor-pointer"
              >
                <PH title="Philipines" className="h-auto w-6" />
                Filipino
              </div>
              <div
                onClick={() => {
                  handleOptionClick("EN");
                  changeLanguage("bn");
                }}
                href="#"
                className="flex px-4 gap-3 py-2 text-sm text-white hover:bg-neutral-700 cursor-pointer"
              >
                <BD title="Bangladesh" className="h-auto w-6" />
                বাংলা
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageSwitcher;
