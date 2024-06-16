import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./image.css"

function ImageDetail() {
  const { id } = useParams();
  const location = useLocation();
  const image = location.state?.image;
  console.log(image)

  if (!image) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container">
        <div className="left">
          <img src={image.urls.regular} alt={image.description} s />
        </div>
        <div className="right">
          <p><span>Description : </span>{image.alt_description || "No Description"}</p>
          <p><span>Original Height : </span>{image.width} px</p>
          <p><span>Original Width : </span>{image.height} px</p>
          <div>
            <a
              href={image.links.download}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Download</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageDetail;