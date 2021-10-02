import { Button, CardContent, CardMedia, Paper, Typography } from '@material-ui/core';
import React from 'react';
import './Headlines.css';

export default function Headlines({ headline }) {

	const formattedContent = (body, url) => {
		if(body) {
			return (<Typography variant="body1">{body.split('[+')[0]} <Button size="small" href={url} target="_blank">Read More</Button></Typography>)
		}
		return (
			<Typography variant="body1"></Typography>
		)
	}

	return (
    <Paper elevation={0} square sx={{ height: "630px" }}>
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%", // 16:9
        }}
        image={headline.urlToImage}
        title={headline.title}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{ marginBottom: "2rem" }}
        >
          {new Date(headline.publishedAt).toDateString()}
        </Typography>
        <Typography
          variant="h5"
          sx={{ marginBottom: "0.5rem", fontWeight: "bold" }}
        >
          {headline.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: "2rem",
            fontWeight: "bold",
          }}
        >
          {headline.author}
        </Typography>
        {formattedContent(headline.content, headline.url)}
      </CardContent>
    </Paper>
  );
}
