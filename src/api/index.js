import axios from 'axios';

const baseUrl = 'https://newsapi.org';
const apiKey = '926d02d121654bb892523ce9f97ed854';
const headlinesPath = '/v2/top-headlines';
const sourcesPath = '/v2/top-headlines/sources';

export const fetchSources = async (category, country) => {
  try {
    let params = {
      apiKey,
      category,
      country,
    };
    const { data: { sources }} = await axios.get(`${baseUrl}/${sourcesPath}`, { params });
    return sources;
  } catch (error) {
    console.error(error);
  }
};

export const fetchHeadlines = async (sources, category, country) => {
  try {
    let params = sources ? { apiKey, sources } : {
      apiKey,
      category,
      country,
    };
    const { data: { articles }} = await axios.get(`${baseUrl}/${headlinesPath}`, { params });
    return articles;
  } catch (error) {
    console.error(error);
  }
};