import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Paper, CircularProgress } from '@mui/material';

const FileList = ({ files, onDownload, onDelete, downloadingFile }) => {
  const [deletingFile, setDeletingFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = async (fileName) => {
    setDeletingFile(fileName); // Set the file being deleted
    try {
      await onDelete(fileName);
    } finally {
      setDeletingFile(null); // Reset the deleting state
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <List>
        {filteredFiles.map((file, index) => (
          <ListItem key={index} divider sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText primary={decodeURIComponent(file.name)} sx={{ marginRight: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {downloadingFile === file.name && <CircularProgress size={24} sx={{ marginLeft: 1 }} />} {/* Show progress bar */}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onDownload(file.name)}
                sx={{ marginRight: 1 }}
                disabled={downloadingFile === file.name} // Disable button while downloading
              >
                Download
              </Button>
              {deletingFile === file.name && <CircularProgress size={24} sx={{ marginLeft: 1 }} />} {/* Show progress bar */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteClick(file.name)}
                disabled={deletingFile === file.name} // Disable button while deleting
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FileList;