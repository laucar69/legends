import {CloseButton, Table, Card, Button} from 'react-bootstrap'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/Link'
import { removeProduct, clearBasket } from '@/redux/basketSlice'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useState } from 'react'
import { useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/router'



export default function Basket() {

    const endpointOrder = "http://localhost:3000/api/orders"; 
    const router = useRouter();

    const PaypalClientId = "Ab79JIh5IQ1l3zLjIdAxz8xn18rcPxlmyL45wrGKuMXoyqYR4JoUGRZeq7tkaAw9AFCgIr1rhK-EwPh0"

    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basket);
    const [kasse, setKasse] = useState(false);


    const removePosition = (product) => {
      dispatch(removeProduct(product));
    }

    const createOrder = async (data) => {
      try{
        const res = await axios.post(endpointOrder, data);
        if (res.status === 201){
          dispatch(clearBasket());
          router.push(`/order/${res.data._id}`);
        }
      } catch(error) {
        console.log(error);
      }
    }

    const amount = basket.totalAmount;
    const currency = "EUR";
    const style = { "layout": "vertical" };

    const ButtonWrapper = ({ currency, showSpinner }) => {
      // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
      // This is the main reason to wrap the PayPalButtons in a new component
      const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  
      useEffect(() => {
        dispatch({
          type: "resetOptions",
          value: {
            ...options,
            currency: currency,
          },
        });
      }, [currency, showSpinner]);

      return (<>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const customer = details.purchase_units[0].shipping;
              createOrder({
                customer: customer.name.full_name,
                adress: customer.address.address_line_1 + ", " + customer.address.admin_area_1,
                amount: basket.totalAmount,
                state: 0,
                payType: 1,
                products: basket.products.map(product => (
                  {
                    name: product.name,
                    quantity: product.quantity,
                    extras: product.extras.map(extra => (extra.text))
                  }
                ))
              })
            });
          }}
        />
      </>
      );
    }

    return (
      <div>
      {basket.b_quantity === 0 ? (
        <h2>Warenkorb ist leer</h2>
      ) : (
      <div>
        <h1>Warenkorb</h1>
        <div className="row mt-4">
          <div className="col-9">
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Bild</th>
                  <th>Name</th>
                  <th>Extras</th>
                  <th>Menge</th>
                  <th>Betrag</th>
                  <th><CloseButton disabled/></th>
                </tr>
              </thead>
              <tbody>
                {basket.products.map((product) => (
                  <tr key={product._id}>
                      <td>
                        <Image src={product.image} alt={product.name} height={50} width={50}/>
                      </td>
                      <td>
                        <Link legacyBehavior href={`/Produkte/${product.category}/${product.id}`}>
                          <a className='text-danger'>
                            {product.name}
                          </a>
                        </Link>
                      </td>
                      <td>
                        {product.extras.map(extra => (
                          <span key={extra._id}>{extra.text} </span>
                        ))}
                      </td>
                      <td>
                        {product.quantity}
                      </td>
                      <td>
                        {(product.price * product.quantity).toFixed(2)} €
                      </td>
                      <td>
                      <Button className='btn-sm' variant='dark' onClick={() => removePosition(product)}>x</Button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col-3 p-2">
            <div className='shadow'>
              <Card>
                <Card.Header as="h5" >Gesamt</Card.Header>
                <Card.Body className='text-center'>
                  <Card.Title>
                    {basket.totalAmount.toFixed(2)}
                    </Card.Title>
                    {kasse ? (
                      <PayPalScriptProvider
                        options={{
                          "client-id": PaypalClientId,
                          components: "buttons",
                          currency: currency,
                        }}
                      >
                        <ButtonWrapper
                          currency={currency}
                          showSpinner={false}
                        />
                      </PayPalScriptProvider>
                    ) : (
                      <Button variant="primary" onClick={()=>setKasse(true)}>Zur Kasse</Button>
                    )}
                </Card.Body>
              </Card>
            </div>
          </div>
       </div>
       </div>
       )}
      </div>
    )
  }
  

  // sb-4dac328855840@business.example.com
  // T!KKdg-8