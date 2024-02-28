import React from 'react';
import './NewsBox.css';

const NewsBox = ({
  imgSrc,
  title,
  description,
  buttonText,
  link,
}) => {
  return (
    <div className="newscard-container">
      {imgSrc && (
        <img src={imgSrc} className="newscard-img" />
      )}
      {title && <h1 className="newscard-title">{title}</h1>}
      {description && <p className="newscard-description">{description}</p>}
      {buttonText && link && (
        <a href={link} className="newscard-btn">
          {buttonText}
        </a>
      )}
    </div>
  );
};

export default NewsBox;
