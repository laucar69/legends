import {Spinner, Table, Card, Button} from 'react-bootstrap'
import {useRouter} from 'next/router'
import axios from 'axios';

export default function Bestellung({ order }) {
    const router = useRouter();
    const {nummer} = router.query;

    let status;
    switch (order.state) {
        case 0:
            status = "Eingegangen";
            break;
        case 1:
            status = "Zubereitung";
            break;
        case 2:
            status = "Unterwegs";
            break;
        case 3:
            status = "Ausgeliefert";
            break;
    }

    if (nummer !== order._id) {  
    return (
        <div>
          <h2>Bestellnummer {nummer} nicht vorhanden</h2>
          <button variant="primary" onClick={() => router.push("/")}>zur Karte</button>
        </div>
      )
    } else {
      return (
        <>
          <h1>Bestellstatus</h1>
          <div className="row mt-4">
            <div className="col-9">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Bestell Nr</th>
                    <th>Kunde</th>
                    <th>Adresse</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {order._id}
                    </td>
                    <td>
                      {order.customer}
                    </td>
                    <td>
                      {order.adress}
                    </td>
                    <td>
                      <span>{status} </span>
                      {order.state < 3 ? (
                        <Spinner animation='border' variant='success' size='sm' />
                      ) : (<span>✔️</span>)}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Produktname</th>
                                    <th>Extras</th>
                                    <th>Menge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map(product => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>
                                        {product.extras.map(extra => (
                                            <span key={extra._id}>
                                                {extra}
                                            </span>
                                        ))}
                                    </td>
                                    <td>{product.quantity}</td>
                                    
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
                    <Card.Title>{order.amount}</Card.Title>
                    {order.payType === 0 ? (
                      <Button variant='danger disabled'>offen</Button>
                    ) : (<Button variant='success disabled'>bezahlt</Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </>
      )
    }
}

export async function getServerSideProps({params}){
  const endpointOrder = "http://localhost:3000/api/orders"; 
  const res = await axios.get(endpointOrder + `/${params.nummer}`);

  return{
    props: {order: res.data}
  }
}
  