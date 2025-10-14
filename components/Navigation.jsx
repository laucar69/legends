import Link from 'next/link'
import Image from 'next/image'
import {Badge} from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function Navigation() {

    const basketQuantity = useSelector((state) => state.basket.b_quantity);

    return (
      <div className="shadow sticky-top p-2 mb-2 bg-dark">
        <div className="d-flex justify-content-between align-items-center">
            <Link legacyBehavior href="/">
                <a>
                    <Image src={'/img/layout/logo.jpg'} alt='logo' width={80} height={80} />
                </a>
            </Link>
            <Link legacyBehavior href="/basket">
                <a>
                    <Image src={'/img/layout/basket.png'} alt='logo' width={30} height={30} />
                    <Badge pill bg='secondary'>{basketQuantity}</Badge>
                </a>
            </Link>
        </div>
      </div>
    )
  }
  