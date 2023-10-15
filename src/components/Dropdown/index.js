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
      <button className="dropdown-label" aria-expanded={isOpen ? "true" : "false"} onClick={toggleIsOpen}>{label}</button>
      {isOpen && <ul className="submenu">{children}</ul>}
    </li>
  );
};

export default Dropdown;