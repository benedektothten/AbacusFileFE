import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:8080';

export const getAllFiles = async () => {
  const response = await axios.get(`${BASE_URL}/api/file`);
  return response.data;
};

export const uploadFile = async (file, onUploadProgress, blobName) => {
  const formData = new FormData();
  formData.append('file', file);
  if (blobName) {
    formData.append('blobName', blobName);
  }

  const config = {
    onUploadProgress: (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        if (onUploadProgress) {
          onUploadProgress(event);
        }
      }}
  };
  const response = await axios.post(`${BASE_URL}/api/file/upload`, formData, config);
  return response.data;
};

export const downloadFile = async (blobName) => {
  const response = await axios.get(`${BASE_URL}/api/file/${blobName}`);
  return response.data; // Return the URL directly
};

export const deleteFile = async (blobName) => {
  await axios.delete(`${BASE_URL}/api/file/${blobName}`);
};