import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StickyHeader from "../../components/Sticky";
import { _courseSeries, _courseFaq, _courseTag } from "../../api";
import { MakeQuerablePromise, courseHours, courseMinutes } from "../../utils";
import { Link } from "react-router-dom";
import Accordion from "../../components/Accordion";

const Home = () => {
  const [loading, setIsloading] = useState(true);
  const [courseDetail, setIsCourseDetail] = useState({ isLoading: true });
  const [videoSeries, setIsVideoSeries] = useState({ isLoading: true });
  const [otherSeries, setIsOtherSeries] = useState({ isLoading: true });
  const [faqData, setIsFaqData] = useState({ isLoading: true });
  const [tagsData, setIsTagsData] = useState({ isLoading: true });

  useEffect(() => {
    var course = MakeQuerablePromise(_courseSeries());
    course.then(function (data) {
      if (course.isFulfilled()) {
        setIsCourseDetail(data.details);
        setIsVideoSeries(data.courses);
        setIsOtherSeries(data.relatedContent);
      } else {
        setIsCourseDetail({ isLoading: true });
        setIsVideoSeries({ isLoading: true });
        setIsOtherSeries({ isLoading: true });
      }
    });
    let lang='hindi';
    var faqs = MakeQuerablePromise(_courseFaq(lang));
    faqs.then(function (data) {
        if (faqs.isFulfilled()) {
            setIsFaqData(data);
        } else {
            setIsFaqData({ isLoading: true });
        }
    });
    var tags = MakeQuerablePromise( _courseTag());
    tags.then(function (data) {
        if (tags.isFulfilled()) {
            setIsTagsData(data);
        } else {
            setIsTagsData({ isLoading: true });
        }
    });
     //_courseTag()
  }, []);
  return (
    <>
      <Header />
      <div className="content-body">
        {tagsData.isLoading?null:(<StickyHeader data={tagsData} />)}
        
        <div className="main-container">
          <div className="breadcrumbs">
            <ul className="list-none">
              <li>
                <Link to="/">
                  <span className="font-en">Home</span>
                </Link>
              </li>
              <li className="devider">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    d="M.793 10.207a1 1 0 0 1 0-1.414L4.086 5.5.793 2.207A1 1 0 0 1 2.207.793l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
                  ></path>
                </svg>
              </li>
              <li className="no-link">
                <span className="font-hi">संतवाणी</span>
              </li>
            </ul>
          </div>
          {courseDetail.isLoading ? (
            ""
          ) : (
            <>
              <div className="detail-section">
                <h2 className="section-title title-color flex">
                  <span className="font-hi">{courseDetail.title}</span>
                </h2>
                <div className="detail-content flex flex-row">
                  <div className="content-left w-full">
                    <div className="detail-img">
                      <img
                        src={`${courseDetail.thumbnail.domain}/${courseDetail.thumbnail.basePath}/${courseDetail.thumbnail.qualities[0]}/${courseDetail.thumbnail.key}`}
                        alt={courseDetail.title}
                        className="w-full rounded-md"
                      />
                    </div>
                    <div className="share-detail">
                      <div className="flex flex-col">
                        <div className="text-sm">
                          <span className="font-en">Share this series:</span>
                        </div>
                        <div className="social-share">
                          <ul className="flex">
                            <li>
                              <a href="#" target="_blank">
                                f
                              </a>
                            </li>
                            <li>
                              <a href="#" target="_blank">
                                f
                              </a>
                            </li>
                            <li>
                              <a href="#" target="_blank">
                                f
                              </a>
                            </li>
                            <li>
                              <a href="#" target="_blank">
                                f
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-right w-full">
                    <h3 className="sub-title title-color flex">
                      <span className="font-hi">{courseDetail.subtitle}</span>
                    </h3>
                    <div className="desc text-base">
                      <p>
                        <span className="font-hi">
                          {courseDetail.description}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {videoSeries.isLoading ? (
            ""
          ) : (
            <div className="videos-section">
              <h2 className="section-title">
                Video Serives ({videoSeries.length})
              </h2>
              <div className="row">
                <div className="cards-wrap">
                  {videoSeries.map((item) => (
                    <div className="cards" key={item.id}>
                      <Link to="/">
                        <div className="part">
                          <span
                            className={
                              item.language == "english" ? "font-en" : "font-hi"
                            }
                          >
                            भाग {item.series.order.seq} &nbsp;
                          </span>
                        </div>
                        <h4 className="text-lg item-title title-color">
                          <span
                            className={
                              item.language == "english" ? "font-en" : "font-hi"
                            }
                          >
                            {item.title}
                          </span>
                        </h4>
                        <div className="item-subtitle">
                          <span
                            className={
                              item.language == "english" ? "font-en" : "font-hi"
                            }
                          >
                            {item.subtitle}
                          </span>
                        </div>
                        <div className="item-duration text-sm">
                          <span
                            className={
                              item.language != "english" ? "font-en" : "font-hi"
                            }
                          >
                            {courseHours(item.courseHours) > 0 ? (
                              <>{courseHours(item.courseHours)} hour </>
                            ) : null}
                            {`${courseMinutes(item.courseHours)}`} minutes
                          </span>
                        </div>
                        <div className="item-contribution text-sm">
                          <span
                            className={
                              item.language != "english" ? "font-en" : "font-hi"
                            }
                          >
                            Contribution: &#8377; {`${item.amount}`}
                          </span>
                          <del>
                            <span
                              className={
                                item.language != "english"
                                  ? "font-en"
                                  : "font-hi"
                              }
                            >
                              &#8377; {`${item.originalAmount}`}
                            </span>
                          </del>
                        </div>
                        <div className="item-lang text-sm">
                          <span
                            className={
                              item.language == "english"
                                ? "font-en tag"
                                : "font-hi tag"
                            }
                          >
                            {`${item.language}`}
                          </span>
                        </div>
                        <div className="course-btn-wrap">
                          <button className="course-btn">
                            <span
                              className={
                                item.language != "english"
                                  ? "font-en"
                                  : "font-hi"
                              }
                            >
                              Add to Cart
                            </span>
                          </button>
                          <button className="course-btn font-en">
                            <span
                              className={
                                item.language != "english"
                                  ? "font-en"
                                  : "font-hi"
                              }
                            >
                              Enrole
                            </span>
                          </button>
                        </div>
                        <div className="bt-separator flex">
                          <div className="w-full bg-gray-separator"></div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {otherSeries.isLoading ? (
            ""
          ) : (
            <div className="videos-section">
              <h2 className="section-title">Other Helpful Video Series</h2>
              <div className="row">
                <div className="cards-wrap item-count:2">
                  {otherSeries.map((item) => (
                    <div className="cards" key={item.id}>
                      <Link to="/">
                        <div className="flex flex-row items-start">
                          {item.contentType == "CourseSeries" ? (
                            <>
                              <div className="image-wrapper">
                                <div className="layer-0">
                                  <div className="layer-inner">
                                    <img
                                      className="h-full w-full object-cover"
                                      src={`${item.thumbnail.domain}/${item.thumbnail.basePath}/${item.thumbnail.qualities[0]}/${item.thumbnail.key}`}
                                      alt={item.title}
                                    />
                                  </div>
                                </div>
                                <div className="layer-1">
                                  <div className="layer-inner">
                                    <img
                                      className="h-full w-full object-cover"
                                      src={`${item.thumbnail.domain}/${item.thumbnail.basePath}/${item.thumbnail.qualities[0]}/${item.thumbnail.key}`}
                                      alt={item.title}
                                    />
                                  </div>
                                </div>
                                <div className="layer-2">
                                  <div className="layer-inner">
                                    <img
                                      className="h-full w-full object-cover"
                                      src={`${item.thumbnail.domain}/${item.thumbnail.basePath}/${item.thumbnail.qualities[0]}/${item.thumbnail.key}`}
                                      alt={item.title}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="content-wrapper">
                                <h3 className="text-lg item-title title-color">
                                  <span
                                    className={
                                      item.language == "english"
                                        ? "font-en"
                                        : "font-hi"
                                    }
                                  >
                                    {item.title}
                                  </span>
                                </h3>
                                <div className="item-subtitle">
                                  <span
                                    className={
                                      item.language == "english"
                                        ? "font-en"
                                        : "font-hi"
                                    }
                                  >
                                    {item.subtitle}
                                  </span>
                                </div>
                                <div className="item-videos text-sm">
                                  <span
                                    className={
                                      item.language == "english"
                                        ? "font-en"
                                        : "font-en"
                                    }
                                  >
                                    {`${item.coursesCount}`} Video Series
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="image-wrapper">
                                <div className="layer-0">
                                  <div className="layer-inner">
                                    <img
                                      className="h-full w-full object-cover"
                                      src={`${item.thumbnail.domain}/${item.thumbnail.basePath}/${item.thumbnail.qualities[0]}/${item.thumbnail.key}`}
                                      alt={item.title}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="content-wrapper">
                                <h3 className="text-lg item-title title-color">
                                  <span
                                    className={
                                      item.language == "english"
                                        ? "font-en"
                                        : "font-hi"
                                    }
                                  >
                                    {item.title}
                                  </span>
                                </h3>
                                <div className="item-subtitle">
                                  <span
                                    className={
                                      item.language == "english"
                                        ? "font-en"
                                        : "font-hi"
                                    }
                                  >
                                    {item.subtitle}
                                  </span>
                                </div>
                                <div className="item-duration text-sm">
                                  <span
                                    className={
                                      item.language != "english"
                                        ? "font-en"
                                        : "font-hi"
                                    }
                                  >
                                    {courseHours(item.courseHours) > 0 ? (
                                      <>{courseHours(item.courseHours)} hour </>
                                    ) : null}
                                    {`${courseMinutes(item.courseHours)}`}{" "}
                                    minutes
                                  </span>
                                </div>
                                <div className="item-contribution text-sm">
                                  <span
                                    className={
                                      item.language != "english"
                                        ? "font-en"
                                        : "font-hi"
                                    }
                                  >
                                    Contribution: &#8377; {`${item.amount}`}
                                  </span>
                                  {item.originalAmount!=null?(<del>
                                    <span
                                      className={
                                        item.language != "english"
                                          ? "font-en"
                                          : "font-hi"
                                      }
                                    >
                                      &#8377; {`${item.originalAmount}`}
                                    </span>
                                  </del>):null}
                                  
                                </div>
                                <div className="item-lang text-sm">
                                  <span
                                    className={
                                      item.language == "english"
                                        ? "font-en tag"
                                        : "font-hi tag"
                                    }
                                  >
                                    {`${item.language}`}
                                  </span>
                                </div>
                                <div className="course-btn-wrap">
                                  <button className="course-btn">
                                    <span
                                      className={
                                        item.language != "english"
                                          ? "font-en"
                                          : "font-hi"
                                      }
                                    >
                                      Add to Cart
                                    </span>
                                  </button>
                                  <button className="course-btn font-en">
                                    <span
                                      className={
                                        item.language != "english"
                                          ? "font-en"
                                          : "font-hi"
                                      }
                                    >
                                      Enrole
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="faq-container">
            <div className="faq-wrap flex">
                <div className="faq-left">
                    <h2 className="text-lg">
                        <span className="font-en">FAQs</span>
                    </h2>
                    <div className="text-sm">
                        <span className="font-en">
                        Can’t find the answer you’re looking for? Reach out to our 
                        <a href="#" target="_blank">support</a> team
                        </span>
                    </div>
                </div>
                <div className="faq-right w-full">
                    {faqData.isLoading?null:(<Accordion data={faqData} />)}                    
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
