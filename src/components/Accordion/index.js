import React, { useState } from "react";

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="accordion-wrap">
      {data.map((item, index) => (
        <div className={`accordion-item`} key={item.question}>
          <div
            className="accordion-head title-color"
            onClick={() => handleClick(index)}
          >
            <span className="font-hi">{item.question}</span>
            {index === activeIndex ? (
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.207 6.207a1 1 0 0 1-1.414 0L5.5 2.914 2.207 6.207A1 1 0 0 1 .793 4.793l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414Z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    d="M.793.793a1 1 0 0 1 1.414 0L5.5 4.086 8.793.793a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          {index === activeIndex && (
            <div className="accordion-body">
              <span
                className="font-hi"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              ></span>
            </div>
          )}

          <div className="accordion-footer">
            <div className="bt-separator flex">
              <div className="w-full bg-gray-separator"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
