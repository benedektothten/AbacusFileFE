import React, { useState } from 'react';
import { Box, Button, Typography, LinearProgress, Paper } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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

    try {
      await onUpload(file);
      setProgress(100);
    } catch (error) {
      console.error('Error during upload:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Upload a File
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          padding: 2,
          marginBottom: 2,
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the file here...</Typography>
        ) : (
          <Typography>Drag and drop a file here, or click to select a file</Typography>
        )}
      </Box>
      {file && <Typography variant="body1" gutterBottom>{file.name}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
        sx={{ marginBottom: 2 }}
      >
        Upload
      </Button>
      {uploading && (
        <Box width="100%">
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
    </Paper>
  );
};

export default FileUpload;