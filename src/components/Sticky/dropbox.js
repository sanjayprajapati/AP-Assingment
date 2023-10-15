import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Subdropbox from "./subdropbox";

const Dropbox = ({ onOpen, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef();

  const [dataParent, setDataParen] = useState(null);
  const [dataChild, setDataChild] = useState(null);

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
  useEffect(() => {
    data.map((item, index) => {
      if (index == 0) setDataParen(item);
      else setDataChild(item);
    });
  }, []);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="search-btn-left" ref={containerRef}>
      <button
        className=""
        aria-expanded={isOpen ? "true" : "false"}
        onClick={toggleIsOpen}
      >
        <span className="font-en">All</span>
      </button>
      {isOpen && (
        <div className="tabs-dropdown">
          <ul>
            <li>
              <Link to="/">
                <span className="font-en">All</span>
              </Link>
            </li>
            {dataParent &&
              dataParent.map((item) => (
                item.hasChildren?(
                <Subdropbox item={item} dataChild={dataChild} key={item.tagId}/>):(
                    <li key={item.tagId}>
                        <Link to="/">
                    <span className="font-en">
                      {item.name.english}
                    </span>
                    </Link>
                  </li>
                )
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropbox;
