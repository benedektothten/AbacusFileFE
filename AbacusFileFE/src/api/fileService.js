import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:8080';

export const getAllFiles = async () => {
  try {
    console.log('env:', import.meta.env.VITE_REACT_APP_BASE_URL);
    const response = await axios.get(`${BASE_URL}/api/file`);
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

export const uploadFile = async (file, blobName) => {
  const formData = new FormData();
  console.log('Uploading filedata:', file);
  formData.append('file', file);
  if (blobName) {
    formData.append('blobName', blobName);
  }

  try {
    const response = await axios.post(`${BASE_URL}/api/file/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const downloadFile = async (blobName) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/file/${blobName}`);
    return response.data; // Return the URL directly
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

export const deleteFile = async (blobName) => {
  try {
    await axios.delete(`${BASE_URL}/api/file/${blobName}`);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};