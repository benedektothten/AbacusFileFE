import React, { useState } from 'react';
import { Box, Button, Typography, LinearProgress, Paper } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [savingMessage, setSavingMessage] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setSavingMessage(false);

    try {
      await onUpload(file, (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
          if (percentComplete === 100) {
            const savingTimeout = setTimeout(() => {
              if (savingMessage === false) {
                setSavingMessage(true);
              }
            }, 1200); // Show message after 2 seconds if still waiting

            // Clear timeout if upload completes
            setTimeout(() => {
              clearTimeout(savingTimeout);
              setSavingMessage(false); // Ensure saving message is cleared
            }, 2000);
          }
        }
      });
    } catch (error) {
      console.error('Error during upload:', error);
      handleError(error.response?.data); // Call handleError to show error snackbar
    } finally {
      setUploading(false);
      setSavingMessage(false); // Ensure saving message is cleared in case of errors
    }
  };

  return (
    <Paper elevation={3} className="fileUploadContainer">
      <Typography variant="h6" gutterBottom>
        Upload a File
      </Typography>
      <Box
        {...getRootProps()}
        className={`fileDropZone ${isDragActive ? 'fileDropZoneActive' : ''}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the file here...</Typography>
        ) : (
          <Typography>Drag and drop a file here, or click to select a file</Typography>
        )}
      </Box>
      {file && <Typography variant="body1" className="fileName">{file.name}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
        className="uploadButton"
      >
        Upload
      </Button>
      {uploading && (
        <Box className="progressBar">
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
      {savingMessage && (
        <Typography variant="body2" className="savingMessage">
          Upload is done. Saving the file to cloud storage, please wait...
        </Typography>
      )}
    </Paper>
  );
};

export default FileUpload;