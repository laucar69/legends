import {Carousel} from "react-bootstrap"
import Image from "next/image"

export default function Slider() {
  return (
    <Carousel controls={false} fade={true} interval="1000">
        <Carousel.Item>
            <Image className="d-block w-100 rounded-3" src="/img/slider/img1.avif" alt="burger" width={3000} height={500}/>
        </Carousel.Item>
        <Carousel.Item>
            <Image className="d-block w-100 rounded-3" src="/img/slider/img2.jpg" alt="burger" width={3000} height={500}/>
        </Carousel.Item>
        <Carousel.Item>
            <Image className="d-block w-100 rounded-3" src="/img/slider/img3.webp"  alt="wrap" width={3000} height={500}/>
        </Carousel.Item>
    </Carousel>
  )
}
