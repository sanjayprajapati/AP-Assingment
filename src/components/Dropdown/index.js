import React, { useCallback, useEffect, useRef, useState } from "react";

const Dropdown = ({ onOpen, label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef();

  const onMouseDown = useCallback(
    (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    [containerRef, setIsOpen]
  );

  useEffect(() => {
    if (isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);

    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [onMouseDown]);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <li ref={containerRef} className="dropdown">
      <button className="dropdown-label" aria-expanded={isOpen ? "true" : "false"} onClick={toggleIsOpen}>{label}
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" className="fill-current text-white tab-hidden"><path fillRule="evenodd" d="M.793 10.207a1 1 0 0 1 0-1.414L4.086 5.5.793 2.207A1 1 0 0 1 2.207.793l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"></path></svg>
      </button>
      {isOpen && <ul className="submenu">
        <li className="close-row tab-hidden"><button className="closeMenu-back" aria-expanded={isOpen ? "true" : "false"} onClick={toggleIsOpen}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13"><path fillRule="evenodd" d="M7.244 12.249a.888.888 0 0 1-1.238 0L.756 7.106a.845.845 0 0 1 0-1.212L6.006.75a.888.888 0 0 1 1.238 0 .845.845 0 0 1 0 1.212l-3.757 3.68h10.138c.483 0 .875.384.875.857a.866.866 0 0 1-.875.857H3.487l3.757 3.68a.845.845 0 0 1 0 1.212Z"></path></svg></button></li>
        {children}
        </ul>}
    </li>
  );
};

export default Dropdown;