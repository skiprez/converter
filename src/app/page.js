'use client';

import { useState } from 'react';
import { Button, Typography, Box, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MdCloudUpload, MdCached, MdDownloadDone } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [conversionType, setConversionType] = useState('ico');
  const [convertedImage, setConvertedImage] = useState(null);
  const [fileName, setFileName] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
    setFileName(file.name);
    setConvertedImage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);

    const response = await fetch(`/api/convert-to-${conversionType}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setConvertedImage(url);
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 relative bg-[#f4f7fc] overflow-hidden">
      <div className="absolute inset-0 z-[0]">
        <div className="floating-shapes">
          {/* Multiple circle divs */}
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle1"></div>
          <div className="circle circle6"></div>
          <div className="circle circle6"></div>
          <div className="circle circle1"></div>
          <div className="circle circle1"></div>
          <div className="circle circle3"></div>
          <div className="circle circle3"></div>
          <div className="circle circle2"></div>
          <div className="circle circle2"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="circle circle3"></div>
          <div className="circle circle4"></div>
          <div className="circle circle1"></div>
          <div className="circle circle1"></div>
          <div className="circle circle5"></div>
          <div className="circle circle6"></div>
        </div>
      </div>
      
      <p className="font-bold text-4xl mb-6 text-center text-gray-800 z-[1]">
        Image Conversion Tool
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-md bg-gray-200 p-8 rounded-xl shadow-xl z-[1]">
        {/* Conversion Type Select */}
        <Box className="w-full mb-4">
          <FormControl fullWidth variant="outlined">
            <InputLabel>Conversion Type</InputLabel>
            <Select
              value={conversionType}
              onChange={(e) => setConversionType(e.target.value)}
              label="Conversion Type"
              className="text-gray-800"
            >
              <MenuItem value="ico">ICO</MenuItem>
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="jpeg">JPEG</MenuItem>
              <MenuItem value="webp">WEBP</MenuItem>
              <MenuItem value="tiff">TIFF</MenuItem>
              <MenuItem value="gif">GIF</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* File Input */}
        <Box className="w-full mb-4">
          <div {...getRootProps({ className: 'dropzone flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-md cursor-pointer' })}>
            <input {...getInputProps()} />
            <MdCloudUpload size={48} style={{ color: '#7f5aff', marginBottom: '8px' }} />
            <Typography variant="body1" color="textSecondary">Drag 'n' drop some files here, or click to select files</Typography>
          </div>
          {fileName && (
            <Typography variant="body2" color="textPrimary" className="mt-2">
              File uploaded: {fileName}
            </Typography>
          )}
        </Box>

        {loading && <CircularProgress />}
        {convertedImage && (
          <div className='flex flex-col items-center gap-4'>
            <img src={convertedImage} alt="Converted" />
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: '12px',
                textTransform: 'none',
                fontWeight: 600,
                backgroundColor: '#7f5aff', // pastel purple
                '&:hover': { backgroundColor: '#6a42d3' },
                position: 'relative',
              }}
              startIcon={<MdDownloadDone />}
              href={convertedImage}
              download={`converted.${conversionType}`}
            >
              Download
            </Button>
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{
            padding: '12px',
            textTransform: 'none',
            fontWeight: 600,
            backgroundColor: '#7f5aff', // pastel purple
            '&:hover': { backgroundColor: '#6a42d3' },
            position: 'relative',
          }}
        >
          Convert
        </Button>
      </form>
    </main>
  );
}