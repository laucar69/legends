import {Card, Button} from  "react-bootstrap"
import Link from "next/link"
import { useDispatch} from 'react-redux';
import { useState } from 'react';
import { addProducts } from '@/redux/basketSlice';
import {v4 as uuidv4 } from 'uuid'


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
    <div>
        <div className="row row-cols-3">
            {products?.map((product) => (
                <div key={product.name} className="mt-3 col">
                    <Card>
                        <Link legacyBehavior href={`/Produkte/${product.category}/${product.id}`} passHref>
                            <a>
                                <Card.Img variant="top" src={product.image} />
                            </a>
                        </Link>
                        <Card.Body>
                            <Card.Title>
                                {product.name} {product.price.toFixed(2)} €
                            </Card.Title>
                            <Card.Text>
                                Kategory: <Link legacyBehavior href={`/Produkte/${product.category}`} passHref><a>{product.category}</a></Link>
                            </Card.Text>
                            <Button variant="danger"onClick={() => addToBasket(product)}>zum Warenkorb</Button>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
        <br></br>
        <br></br>
        <br></br>
    </div>
  )
}
