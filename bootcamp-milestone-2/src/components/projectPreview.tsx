import React from 'react';
import style from './projectPreview.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectPreview(props: any) {
  return (
    <>
      <h2>{(props.title)}</h2>

    <span className="project-container">
        <div className="video-container">
          <iframe  src={props.video} allowFullScreen /> 
        </div>
        
        <span className="description-container">
          <h3>Description:</h3>
          <div>
            {props.description}
          </div>
        </span>

        
      </span>
    </>

  );
}