import React from 'react';
import { Box, Button } from '@mui/material';

const FileFilter = ({ searchQuery, setSearchQuery, originalFiles, setFiles }) => {
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFiles(originalFiles.filter((file) => file.name.toLowerCase().includes(query.toLowerCase())));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFiles(originalFiles);
  };

  return (
    <Box display="flex" alignItems="center">
      <input
        type="search"
        placeholder="Search files..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginRight: '8px',
          backgroundColor: '#ffffff',
          color: '#000000',
          appearance: 'textfield',
          WebkitAppearance: 'searchfield',
        }}
      />
      <Button variant="contained" color="secondary" onClick={handleClearSearch}>
        Clear
      </Button>
    </Box>
  );
};

export default FileFilter;