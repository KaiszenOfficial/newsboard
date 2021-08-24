import './App.css';
import { AppHeader, Breadcrumb, Headlines, Loader } from './components';
import { categories } from './constants';
import { Fragment, useEffect, useState } from 'react';
import { fetchHeadlines, fetchSources } from './api';
import { Container, createTheme, Grid } from '@material-ui/core';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Baloo 2"',
      'cursive'
    ].join(','),
  },
});

function App() {
	const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
	const [country, setCountry] = useState(null);
  const [sources, setSources] = useState([]);
	const [currentSource, setCurrentSource] = useState(null);
	const [currentSourceId, setCurrentSourceId] = useState(null);
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
		setLoading(true);
    const fetchDataFromApi = async () => {
      const sourcesData = await fetchSources(currentCategory, country);
      setSources(sourcesData);
			setCurrentSource(sourcesData.find((source) => source.id === currentSourceId) || sourcesData[0]);

			const headlinesData = await fetchHeadlines(currentSourceId || sourcesData[0].id, currentCategory, country);
			setHeadlines(headlinesData);
			setLoading(false);
    };

    fetchDataFromApi();
  }, [currentCategory, country, currentSourceId]);


  const handleCountryChange = (country) => {
		setCountry(country.code);
	};
	const handleCategoryChange = (category) => {
		setCurrentCategory(category);
	};
	const handleSourceChange = (source) => {
		setCurrentSource(source);
		setCurrentSourceId(source.id);
	};

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <AppHeader onCountryChange={handleCountryChange} />
				{!loading && currentSource && headlines.length ? 
					(<Container fixed sx={{ padding: "1rem" }}>
						<Breadcrumb
							category={currentCategory}
							source={currentSource}
							categories={categories}
							sources={sources}
							onCategoryChange={handleCategoryChange}
							onSourceChange={handleSourceChange}
						/>
						<Grid container spacing={2}>
							{headlines.length
								? headlines.map((headline, index) => (
										<Grid key={index} item xs={12} md={6}>
											<Headlines headline={headline} key={headline.id} />
										</Grid>
									))
								: null}
						</Grid>
					</Container>) : <Loader loading={loading} />
				}
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
