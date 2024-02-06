import BreadCrump from '@/components/BreadCrump';
import Image from 'next/image'
import ProductModel from '@/models/ProductModel';
import mongodb from '@/utils/mongodb';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { addProducts } from '@/redux/basketSlice';
import {v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

export default function ProductDetail({product}) {

    const [price, setPrice] = useState(product.price);
    const [extras, setExtras] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();

    const addToBasket = () => {
        const _id = uuidv4();
        dispatch(addProducts({...product, extras, price, quantity, _id}));
        router.push('/basket');
    }

    const addExtra = (e,extra) => {
        const checked = e.target.checked;
        if (checked){
            setPrice(price + extra.price);
            setExtras([...extras,extra])

        } else {
            setPrice(price - extra.price);
            setExtras(extras.filter((alleExtras) => alleExtras._id !== extra._id))
        }
    }
    if(!product) {
        return (
            <div>
                <BreadCrump></BreadCrump>
                <h2>Produkt nicht gefunden</h2>
            </div>
        )
    }
    return (
        <div>
            <BreadCrump></BreadCrump>
            <div className='row row-cols-2 mt-2'>
                <div>
                    <Image className='rounded-3' src={product.image} alt={product.name} width={100} height={100} layout='responsive'/>
                </div>
                <div>
                    <h2>{product.name}</h2>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3 className='text-danger'>{price.toFixed(2)} €</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            {product.description}
                        </ListGroupItem>
                        <ListGroupItem>
                            {product.extras.length ? (<>Extras: <br/></>) : <br/>}
                            {product.extras.map((extra) => (
                               
                                <span key={extra._id}>
                                    <input className="form-check-input me-2" type="checkbox"
                                    id={extra.text} 
                                    onChange={(e) => addExtra(e,extra)}
                                    /> {extra.text} <br/>
                                </span>
                               
                            ))}                      
                        </ListGroupItem>
                        <ListGroupItem>
                            <input className='form-control w-50 ' type="number" value={quantity} min={1} max={10}
                            onChange={(e) => setQuantity(e.target.value)}/>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className='row shadow'>  
                                <Button variant="danger" onClick={addToBasket}>zum Warenkorb</Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    await mongodb.dbConnect();
    const product = await ProductModel.findOne({id}).lean();
    return {
      props: {
        product: JSON.parse(JSON.stringify(product))
      }
    }
  }
