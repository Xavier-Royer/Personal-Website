import React from 'react';
import style from './blogPreview.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPreview(props: any) {
  return (
		// replace everything between the <div> & </div> tags
		// with your code from earlier milestones
    <>
      <h2>
        <Link href={`/blog/${props.slug}`}>{props.title}</Link>
      </h2>
      <span className="post-container">

        <span className="image-container">
          <img src={props.image} alt={props.imageAlt} />
        </span>
        <span className="description-container"> 
          <h3>Description:</h3>
          <div>
            {props.description}
          </div>

          <div><Link href={`/blog/${props.slug}`}>Click here for more info!</Link></div>;
          
          <div className="date">{(props.date.toDateString())}</div>
        </span>

        
      </span>
    </>

  );
}