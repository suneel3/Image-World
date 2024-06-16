import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ImageDetail from './ImageDetail';
import Navbar from './Navbar';

const accessKey = 'peKaeGdccDGZFZJ-adu3G15QLsMOslg-1CB4u_fH5lI';

function ImageGrid() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchImages = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const fetchImagesAsync = async () => {
      const response = await axios.get(
        `https://api.unsplash.com/photos?client_id=${accessKey}&page=${page}&per_page=10`
      );
      return response.data;
    };

    fetchImagesAsync()
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data]);
        setPage((prevPage) => prevPage + 1);
        if (data.length === 0) setHasMore(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, loading]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && hasMore) {
        fetchImages();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchImages, hasMore]);

  const handleImageClick = (image) => {
    navigate(`/image/${image.id}`, { state: { image } });
  };

  return (
    <div className="image-container">
      {images.map((image,index) => (
        <div key={index} className="image" onClick={() => handleImageClick(image)}>
          <img src={image.urls.small} alt={image.description} />
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="App">
    
        <Routes>
          <Route path="/" element={<ImageGrid />} />
          <Route path="/image/:id" element={<ImageDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;