import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import ErrorSnackbar from './components/ErrorSnackbar';
import { getAllFiles, uploadFile, downloadFile, deleteFile } from './api/fileService';
import { Button } from '@mui/material';

const App = () => {
  const [files, setFiles] = useState([]);
  const [originalFiles, setOriginalFiles] = useState([]); // Store the original list of files
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleError = (errorResponse) => {
    const errorMessage = errorResponse?.Message || 'An unexpected error occurred.';
    setError(errorMessage);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const fileList = await getAllFiles();
        const formattedFiles = fileList.map((fileName) => ({ name: fileName }));
        setFiles(formattedFiles);
        setOriginalFiles(formattedFiles); // Save the original list
      } catch (err) {
        handleError(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleUpload = async (file, onProgress) => {
    try {
      await uploadFile(file, onProgress);
      const updatedFiles = await getAllFiles();
      setFiles(updatedFiles.map((fileName) => ({ name: fileName })));
      setOriginalFiles(updatedFiles.map((fileName) => ({ name: fileName }))); // Update original files
      setSearchQuery(''); // Clear the search field
    } catch (err) {
      handleError(err.response?.data);
    }
  };

  const handleDownload = async (fileName) => {
    setDownloadingFile(fileName);
    try {
      const downloadUrl = await downloadFile(fileName);
      setTimeout(() => {
        window.open(downloadUrl, '_blank');
        setDownloadingFile(null);
      }, 2000);
    } catch (err) {
      handleError(err.response?.data);
      setDownloadingFile(null);
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await deleteFile(fileName);
      const updatedFiles = files.filter((file) => file.name !== fileName);
      setFiles(updatedFiles);
    } catch (err) {
      handleError(err.response?.data);
    }
  };

  return (
    <Box p={4} sx={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <Typography variant="h4" gutterBottom align="center">
        File Management
      </Typography>
      <FileUpload onUpload={handleUpload} />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ overflowY: files.length > 4 ? 'auto' : 'hidden', width: '100%', maxHeight: files.length > 4 ? 'calc(100vh - 150px)' : 'auto' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb={2}>
            <Typography variant="h6">Uploaded Files</Typography>
            <Box display="flex" alignItems="center">
              <input
                type="search"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => {
                  const query = e.target.value;
                  setSearchQuery(query);
                  setFiles(originalFiles.filter((file) => file.name.toLowerCase().includes(query.toLowerCase())));
                }}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '8px', backgroundColor: '#ffffff', color: '#000000', appearance: 'textfield', WebkitAppearance: 'searchfield' }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setSearchQuery('');
                  setFiles(originalFiles);
                }}
              >
                Clear
              </Button>
            </Box>
          </Box>
          <FileList files={files} onDownload={handleDownload} onDelete={handleDelete} downloadingFile={downloadingFile} searchQuery={searchQuery} />
        </Box>
      )}
      <ErrorSnackbar open={snackbarOpen} message={error} onClose={handleCloseSnackbar} />
      <Box component="footer" mt={4} textAlign="center" bgcolor="#f5f5f5" p={2} width="100%" sx={{ position: 'relative', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <Typography variant="body2" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>Benedek Toth - 2025-11-10</Typography>
        <Typography variant="body2" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
          Frontend: 
          <a href="https://github.com/benedektothten/AbacusFileFE" target="_blank" rel="noopener noreferrer">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="20" height="20" style={{ marginLeft: '0.5rem' }} />
          </a>
        </Typography>
        <Typography variant="body2" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
          Backend: 
          <a href="https://github.com/benedektothten/AbacusFileService" target="_blank" rel="noopener noreferrer">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="20" height="20" style={{ marginLeft: '0.5rem' }} />
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
