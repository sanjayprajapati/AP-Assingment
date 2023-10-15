
const courseSeries = 'https://api.acharyaprashant.org/v2/legacy/courses/series/optuser/course-series-eeb9d3';
const courseFaq = 'https://api.acharyaprashant.org/v2/legacy/courses/faqs?language=';
const courseTag = 'https://api.acharyaprashant.org/v2/legacy/courses/tags';

export const _courseSeries = async () => {
    try {
      const response = await fetch(courseSeries, {mode:'cors'});
      const data = await response.json();
      //console.log({ data })
      return data;
    }
    catch (e) {
      //console.log(e.message)
      return e.message;
    }
}
export const _courseFaq = async (lang) => {
    try {
      const response = await fetch(`${courseFaq}${lang}`, {mode:'cors'});
      const data = await response.json();
      //console.log({ data })
      return data;
    }
    catch (e) {
        //console.log(e.message)
        return e.message;
      }
}
export const _courseTag = async () => {
    try {
      const response = await fetch(courseTag, {mode:'cors'});
      const data = await response.json();
      //console.log({ data })
      return data;
    }
    catch (e) {
       // console.log(e.message)
        return e.message;
      }
}