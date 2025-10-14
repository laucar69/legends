import {Carousel} from "react-bootstrap"
import Image from "next/image"
import styles from './Slider.module.css'

export default function Slider() {
  return (
    <div className={styles.sliderContainer}>
      <Carousel controls={false} fade={true} interval="3000" className={styles.carousel}>
          <Carousel.Item>
              <Image 
                className={`d-block w-100 ${styles.sliderImage}`} 
                src="/img/slider/img1.avif" 
                alt="Leckere Burger" 
                width={3000} 
                height={500}
                priority
              />
              <Carousel.Caption className={styles.carouselCaption}>
                <h2 className={styles.captionTitle}>Herzlich willkommen bei Legends</h2>
                <p className={styles.captionText}>Entdecken Sie unsere köstlichen Gerichte</p>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
              <Image 
                className={`d-block w-100 ${styles.sliderImage}`} 
                src="/img/slider/img2.jpg" 
                alt="Frische Zutaten" 
                width={3000} 
                height={500}
              />
              <Carousel.Caption className={styles.carouselCaption}>
                <h2 className={styles.captionTitle}>Frische Qualität</h2>
                <p className={styles.captionText}>Täglich frisch zubereitet</p>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
              <Image 
                className={`d-block w-100 ${styles.sliderImage}`} 
                src="/img/slider/img3.webp"  
                alt="Gesunde Wraps" 
                width={3000} 
                height={500}
              />
              <Carousel.Caption className={styles.carouselCaption}>
                <h2 className={styles.captionTitle}>Schnelle Lieferung</h2>
                <p className={styles.captionText}>In 30-45 Minuten bei Ihnen</p>
              </Carousel.Caption>
          </Carousel.Item>
      </Carousel>
    </div>
  )
}
