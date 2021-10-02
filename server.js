const http = require('http');
const express = require('express');
const path = require('path');
const axios = require('axios').default;
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

const apiKey = process.env.API_KEY;
const baseUrl = process.env.NEWS_API_URL;
const headlinesPath = process.env.HEADLINES_PATH;
const sourcesPath = process.env.SOURCE_PATH;

app.get('/v2/top-headlines', async (req, res) => {
	let params = { apiKey, ...req.query }
	console.log(params);

	try {
		const { data: { articles }} = await axios.get(`${baseUrl}/${headlinesPath}`, { params });
		return res.status(200).json(articles);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.message || error.toString());
	}
});

app.get('/v2/top-headlines/sources', async (req, res) => {
	let params = { apiKey, ...req.query };

	try {
		const { data: { sources }} = await axios.get(`${baseUrl}/${sourcesPath}`, { params });
		return res.status(200).json(sources);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.message || error.toString());
	}
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Newsboard server started on ${port}`);
});