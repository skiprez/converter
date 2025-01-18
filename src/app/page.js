'use client';

import { useState } from 'react';
import { Button, TextField, Typography, Box, CircularProgress, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { MdCloudUpload, MdCached, MdDownloadDone } from 'react-icons/md';

export default function Home() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [conversionType, setConversionType] = useState('ico');
  const [convertedImage, setConvertedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
    setConvertedImage(null);
  };

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

    setLoading(false);

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setConvertedImage(url);
    } else {
      alert('Failed to convert the image');
    }
  };

  const handleConversionChange = (e) => {
    setConversionType(e.target.value);
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
              onChange={handleConversionChange}
              label="Conversion Type"
              className="text-gray-800"
            >
              <MenuItem value="ico">ICO</MenuItem>
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="jpeg">JPEG</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* File Input */}
        <Box className="w-full mb-4">
          <TextField
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
            helperText="Select an image to convert"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <MdCloudUpload size={24} style={{ color: '#7f5aff', marginRight: '8px' }} />
              ),
            }}
            className="border-2 border-gray-300 focus:border-purple-500"
          />
        </Box>

        {/* Submit Button */}
        <Box className="w-full flex justify-center">
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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ position: 'absolute' }} />
            ) : (
              <>
                <MdCached size={24} style={{ marginRight: '8px' }} />
                Convert
              </>
            )}
          </Button>
        </Box>
      </form>

      {/* Success Message and Download Link */}
      {convertedImage && !loading && (
        <Box mt={4} className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md z-[1]">
          <MdDownloadDone size={40} style={{ color: '#66bb6a' }} />
          <Typography variant="h6" className="ml-2 text-green-500 font-semibold">
            Conversion Complete! Click below to download.
          </Typography>
          <Button
            variant="contained"
            color="success"
            href={convertedImage}
            download={`converted.${conversionType}`}
            sx={{
              marginTop: '10px',
              padding: '10px 20px',
              textTransform: 'none',
              backgroundColor: '#66bb6a',
              '&:hover': { backgroundColor: '#388e3c' },
            }}
          >
            Download Converted Image
          </Button>
        </Box>
      )}
    </main>
  );
}