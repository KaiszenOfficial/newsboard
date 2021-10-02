import { Fragment, useEffect, useState } from 'react';
import { Container, createTheme, CssBaseline, Grid, ThemeProvider } from '@material-ui/core';
import './App.css';
import { AppHeader, Breadcrumb, Headlines, Loader } from './components';
import { categories } from './constants';
import { fetchHeadlines, fetchSources } from './api';

const theme = createTheme({
  typography: {
    fontFamily: "'Merriweather Sans', sans-serif",
  },
	palette: {
		mode: 'dark',
		primary: {
			main: '#673ab7'
		},
		secondary: {
			main: '#00e5ff'
		}
	}
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
				<CssBaseline />
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
						<Grid container spacing={4}>
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
