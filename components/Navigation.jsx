import Link from 'next/link'
import Image from 'next/image'
import {Badge} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styles from './Navigation.module.css'

export default function Navigation() {

    const basketQuantity = useSelector((state) => state.basket.b_quantity);

    const categories = ['Burger', 'Beilagen', 'Salate', 'Wraps', 'Pasta'];

    return (
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
            <Link legacyBehavior href="/">
                <a className={styles.logoLink}>
                    <Image src={'/img/layout/logo.jpg'} alt='Legends Logo' width={80} height={80} />
                </a>
            </Link>
            
            <div className={styles.navLinks}>
                {categories.map((category) => (
                    <Link key={category} legacyBehavior href={`/Produkte/${category}`}>
                        <a className={styles.navLink}>
                            {category}
                        </a>
                    </Link>
                ))}
            </div>

            <Link legacyBehavior href="/basket">
                <a className={styles.basketLink}>
                    <Image src={'/img/layout/basket.png'} alt='Warenkorb' width={30} height={30} />
                    {basketQuantity > 0 && (
                        <Badge pill bg='danger' className={styles.basketBadge}>{basketQuantity}</Badge>
                    )}
                </a>
            </Link>
        </div>
      </nav>
    )
  }
  