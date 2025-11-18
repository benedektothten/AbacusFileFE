import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import ErrorSnackbar from './components/ErrorSnackbar';
import { getAllFiles, uploadFile, downloadFile, deleteFile } from './api/fileService';

const App = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
      } catch (err) {
        handleError(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleUpload = async (file) => {
    try {
      await uploadFile(file);
      const updatedFiles = await getAllFiles();
      setFiles(updatedFiles.map((fileName) => ({ name: fileName })));
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
    <Box p={4} sx={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom align="center">
        File Management
      </Typography>
      <FileUpload onUpload={handleUpload} />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <FileList files={files} onDownload={handleDownload} onDelete={handleDelete} downloadingFile={downloadingFile} />
      )}
      <ErrorSnackbar open={snackbarOpen} message={error} onClose={handleCloseSnackbar} />
    </Box>
  );
};

export default App;
