import {Card, Button} from  "react-bootstrap"
import Link from "next/link"
import { useDispatch} from 'react-redux';
import { useState } from 'react';
import { addProducts } from '@/redux/basketSlice';
import {v4 as uuidv4 } from 'uuid'
import styles from './ProductList.module.css'


export default function ProductList({products}) {
    const dispatch = useDispatch();


    const addToBasket = (product) => {
        const _id = uuidv4();

        const price = product.price;
        const extras = [];
        const quantity = 1;
        dispatch(addProducts({...product, extras, price, quantity, _id}))
  }
  return (
    <div className={styles.productListContainer}>
        <div className={styles.productGrid}>
            {products?.map((product) => (
                <div key={product.name} className={styles.productCard}>
                    <Card className="h-100 card">
                        <Link legacyBehavior href={`/Produkte/${product.category}/${product.id}`} passHref>
                            <a className={styles.productImageLink}>
                                <Card.Img variant="top" src={product.image} className={styles.productImage} />
                            </a>
                        </Link>
                        <Card.Body className={styles.cardBody}>
                            <Card.Title className={styles.productTitle}>
                                {product.name}
                            </Card.Title>
                            <div className={styles.productPrice}>
                                {product.price.toFixed(2)} €
                            </div>
                            <Card.Text className={styles.productCategory}>
                                Kategorie: <Link legacyBehavior href={`Produkte/${product.category}`} passHref>
                                    <a className={styles.categoryLink}>{product.category}</a>
                                </Link>
                            </Card.Text>
                            <Button 
                                className={`${styles.addButton} btn-primary`}
                                onClick={() => addToBasket(product)}>
                                Zum Warenkorb
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    </div>
  )
}
