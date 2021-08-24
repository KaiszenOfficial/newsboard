import React, { useState } from 'react'
import { Box, Breadcrumbs, Link, Menu, MenuItem, Typography } from '@material-ui/core';

export default function Breadcrumb({ category, source, categories, sources, onCategoryChange, onSourceChange }) {

	const [anchorElCategory, setAnchorElCategory] = useState(null);
  const openCategory = Boolean(anchorElCategory);

	const [anchorElSource, setAnchorElSource] = useState(null);
  const openSource = Boolean(anchorElSource);

  const handleClickCategory = (event) => {
    setAnchorElCategory(event.currentTarget);
  };

	const handleClickSource = (event) => {
    setAnchorElSource(event.currentTarget);
  };

  const handleCloseCategory = () => {
    setAnchorElCategory(null);
  };

	const handleSelectCategory = (category) => {
		setAnchorElCategory(null);
		onCategoryChange(category);
	}

	const handleCloseSource = () => {
    setAnchorElSource(null);
  };
	
	const handleSelectSource = (source) => {
    setAnchorElSource(null);
		onSourceChange(source);
	}

	return (
    <Box sx={{ margin: "1rem 0" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          aria-controls="categories"
          aria-haspopup="true"
          aria-expanded={openCategory ? "true" : undefined}
          onClick={handleClickCategory}
        >
          <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
            {category}
          </Typography>
        </Link>
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          aria-controls="sources"
          aria-haspopup="true"
          aria-expanded={openSource ? "true" : undefined}
          onClick={handleClickSource}
        >
          <Typography variant="h5">{source.name}</Typography>
        </Link>
      </Breadcrumbs>
      <Menu
        id="categories"
        anchorEl={anchorElCategory}
        open={openCategory}
        onClose={handleCloseCategory}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSelectCategory(category)}
            sx={{ textTransform: "capitalize" }}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="sources"
        anchorEl={anchorElSource}
        open={openSource}
        onClose={handleCloseSource}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {sources.map((source, index) => (
          <MenuItem key={index} onClick={() => handleSelectSource(source)}>
            {source.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
