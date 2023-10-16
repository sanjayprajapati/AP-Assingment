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
                              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="34" viewBox="0 0 19 34" className="h-7 w-7"><g fill="none" fillRule="evenodd"><path d="M0 0h19v34H0z"></path><path fill="#3E6FA7" stroke="#3E6FA7" strokeWidth="1.393" d="M12.074 33H6.23l-.133-14.297H1V13.13h5.102l-.005-4.52C6.096 4.02 9.3 1 14.16 1l3.84.23v5.296h-3.394c-1.892 0-2.532 1.342-2.532 2.81v3.795h5.666l-.765 5.572h-4.9V33Z"></path></g></svg>
                              </a>
                            </li>
                            <li>
                              <a href="#" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="34" viewBox="0 0 38 34" className="h-7 w-7"><g fill="none" fillRule="evenodd"><path d="M0 0h38v34H0z"></path><path fill="#08BBEE" d="M5.213 20.363a7.251 7.251 0 0 0 3.634-.251c-3.548-.578-6.262-3.748-6.262-7.572 0-.06 0-.119.002-.178a7.22 7.22 0 0 0 3.551.995c-2.13-1.348-3.553-3.773-3.553-6.542a7.82 7.82 0 0 1 1.05-3.931c3.78 4.663 9.323 7.75 15.572 8.17a8.141 8.141 0 0 1-.175-1.683c0-4.347 3.415-7.871 7.629-7.871 2.201 0 4.184.962 5.577 2.5a11.8 11.8 0 0 0 4.735-1.898A7.398 7.398 0 0 1 33.728 6.4 12.523 12.523 0 0 0 38 5.19a12.884 12.884 0 0 1-3.712 4.008l.002.173-.004.896c0 12.279-9.647 22.233-21.549 22.233-4.329 0-8.36-1.317-11.737-3.584.6.072 1.21.109 1.83.109 3.585 0 6.89-1.24 9.532-3.326-3.384 0-6.193-2.242-7.149-5.336Z"></path></g></svg>
                              </a>
                            </li>
                            <li>
                              <a href="#" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="34" viewBox="0 0 32 34" className="h-7 w-7"><g fill="none" fillRule="evenodd"><path d="M0 0h32v34H0z"></path><path fill="#06BA27" d="M15.218 1.019c9.364-.445 17.065 7.145 16.774 16.455-.271 8.685-7.533 15.584-16.24 15.452A15.96 15.96 0 0 1 9.4 31.509l-.524-.249L.208 33l1.534-8.787A15.865 15.865 0 0 1 0 17.013C-.026 8.503 6.698 1.423 15.218 1.02Zm.781 3.098a13.055 13.055 0 0 0-9.205 3.804 12.888 12.888 0 0 0-3.812 9.184c0 1.889.393 3.7 1.17 5.392l.245.504.576 1.125-1.084 5.248 5.147-1.217 1.17.58a12.903 12.903 0 0 0 5.793 1.355 12.94 12.94 0 0 0 9.204-3.804 12.996 12.996 0 0 0 3.813-9.183c0-3.47-1.354-6.731-3.812-9.184a12.947 12.947 0 0 0-9.205-3.804ZM9.985 9.543a1.158 1.158 0 0 1 1.729.269l.075.143 1.304 2.943c.147.331.128.709-.044 1.02l-.098.15-.662.854c-.279.36-.316.854-.09 1.249.788 1.368 3.872 4.104 5.338 4.696.37.15.788.088 1.1-.147l.128-.111.758-.77c.26-.265.628-.386.989-.334l.154.033 3.1.888a1.152 1.152 0 0 1 .654 1.727c-.606.955-1.568 2.12-2.771 2.41-2.121.514-5.38.013-9.447-3.775-3.522-3.28-4.453-6.01-4.233-8.177.125-1.23 1.15-2.338 2.016-3.068Z"></path></g></svg>
                              </a>
                            </li>
                            <li>
                              <a href="#" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="34" viewBox="0 0 35 34" className="h-7 w-7"><g fill="none" fillRule="evenodd"><path d="M0 0h35v34H0z"></path><path fill="#0A66C2" fillRule="nonzero" d="M3.99 8.956c2.172 0 3.99-1.812 3.99-3.978C7.98 2.812 6.161 1 3.99 1 1.817 1 0 2.812 0 4.978c0 2.166 1.817 3.978 3.99 3.978ZM.665 33h6.65V10.9H.664V33ZM25.71 10.282c-2.926 0-5.143 1.06-6.34 2.696V10.9h-6.649V33h6.65V20.934c0-3.138 1.684-4.553 4.122-4.553 2.128 0 3.857 1.282 3.857 4.022V33H34V19.43c0-5.966-3.812-9.148-8.29-9.148Z"></path></g></svg>
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
