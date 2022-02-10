import { FC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

type Props = {
  data?: any;
};

const Slider: FC<Props> = ({ data }) => {
  const slides = data?.slice(1);
  const delay =
    slides?.find((item: any) => item?.delay !== undefined)?.delay * 1000;

  return (
    <div className="page">
      <Carousel
        interval={delay}
        autoPlay
        infiniteLoop
        stopOnHover={false}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        animationHandler="fade"
      >
        {slides?.map((item: any) => (
          <div key={item?.img} className="slider-item">
            <img src={item?.img} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
