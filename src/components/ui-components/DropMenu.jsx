import { useState, useEffect, useRef } from "react";

export default function DropMenu ({ children, trigger, pos}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div onClick={toggleDropdown}>{trigger}</div>

      {isOpen && (
        <div className={`dark:bg-drkbg dark:text-drkcol dark:border-drkbrd absolute mt-2 w-fit rounded-md border border-gray-200 bg-white p-4 shadow-lg z-[100] ${pos}`}>
          {children}
        </div>
      )}
    </div>
  );
}