import React, { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export default function Breadcrumb({
  category,
  source,
  categories,
  sources,
  onCategoryChange,
  onSourceChange,
}) {
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
  };

  const handleCloseSource = () => {
    setAnchorElSource(null);
  };

  const handleSelectSource = (source) => {
    setAnchorElSource(null);
    onSourceChange(source);
  };

  return (
    <Box sx={{ margin: '1rem 0' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
            {category}
          </Typography>
          <IconButton onClick={handleClickCategory}>
            <MoreVert />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant="h5">{source.name}</Typography>
          <IconButton onClick={handleClickSource}>
            <MoreVert />
          </IconButton>
        </Box>
      </Breadcrumbs>
      <Menu
        id="categories"
        anchorEl={anchorElCategory}
        open={openCategory}
        onClose={handleCloseCategory}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSelectCategory(category)}
            sx={{ textTransform: 'capitalize' }}
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
          'aria-labelledby': 'basic-button',
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
