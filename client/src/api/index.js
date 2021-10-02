import axios from 'axios';

const baseUrl = window.location.origin;
const headlinesPath = 'v2/top-headlines';
const sourcesPath = 'v2/top-headlines/sources';

export const fetchSources = async (category, country) => {
  try {
    let params = {
      category,
      country,
    };
    const { data } = await axios.get(`${baseUrl}/${sourcesPath}`, { params });
    console.log('sources', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchHeadlines = async (sources, category, country) => {
  try {
    let params = sources ? { sources } : {
      category,
      country,
    };
    const { data } = await axios.get(`${baseUrl}/${headlinesPath}`, { params });
    console.log('headlines', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};