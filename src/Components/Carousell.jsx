import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg"

const Carousell = () => {
  return (
    <div>
    <Carousel autoPlay interval={2000} infiniteLoop showThumbs={false} showStatus={false}>  
      <div  > 
        <img src={image1} className="h-[100vmin]"/>
      </div>
      <div>
        <img src={image2} className="h-[100vmin]"/>
      </div>
      <div>
        <img src={image3}className="h-[100vmin]" />
      </div>
      <div>
        <img src={image4} className="h-[100vmin]"/>
      </div>
    </Carousel>
    </div>
  );
};

export default Carousell
