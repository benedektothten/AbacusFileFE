import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import ErrorSnackbar from './components/ErrorSnackbar';
import { getAllFiles, uploadFile, downloadFile, deleteFile } from './api/fileService';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import FileFilter from './components/FileFilter';
import Footer from './components/Footer';

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
    <Box p={4} sx={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#ffffff', position: 'relative', overflow: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        File Management
      </Typography>
      <FileUpload onUpload={handleUpload} />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            flexGrow: 1, // Allow the FileList to grow naturally within the layout
          }}
        >
          <Box mb={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="h6" sx={{ color: '#000', marginLeft: '20px' }}>
              Uploaded Files
            </Typography>
            <FileFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              originalFiles={originalFiles}
              setFiles={setFiles}
            />
          </Box>
          <FileList
            files={files}
            onDownload={handleDownload}
            onDelete={handleDelete}
            downloadingFile={downloadingFile}
            searchQuery={searchQuery}
          />
        </Box>
      )}
      <ErrorSnackbar
        open={snackbarOpen}
        message={error}
        onClose={handleCloseSnackbar}
      />
      <Box sx={{ marginTop: 'auto', marginBottom: '40px', width: '100%' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default App;
