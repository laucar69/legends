import { Table, Button, CloseButton } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/dist/server/api-utils';
import { permanentRedirect } from 'next/navigation';

export default function Bestellung({ orders }) {
    const router = useRouter();
    const status = ["Eingegangen", "Zubereitung", "Unterwegs", "Ausgeliefert"];

    const statusUpdate = async (id, aktuellerStatus) => {
        try {
            if (aktuellerStatus <= 2) {
                await axios.put(`http://localhost:3000/api/orders/` + id, { state: aktuellerStatus + 1 });
                router.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/orders/` + id);
            router.reload();        
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Admin Backend</h1>
            <div className="row mt-4">
                <div className="col-12">
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Bestell Nr.</th>
                                <th>Kunde</th>
                                <th>Adresse</th>
                                <th>Status</th>
                                <th><CloseButton disabled/></th>
                            </tr>
                        </thead>
                        {orders.map((order) => (
                            <tbody key={order._id}>
                                <tr>
                                    <td>
                                        <Link legacyBehavior href={`/order/${order._id}`}>
                                            <a className='text-danger'>
                                            {order._id}
                                            </a>
                                        </Link>
                                    </td>
                                    <td>{order.customer}</td>
                                    <td>{order.adress}</td>
                                    <td>
                                        <Button onClick={() => statusUpdate(order._id, order.state)}>{status[order.state]}</Button>
                                    </td>
                                    <td>
                                    <Button variant="danger" onClick={() => deleteOrder(order._id)}>x</Button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(ctx) {
    const meinCookie = ctx.req?.cookies || "";
    const res = await axios.get(`http://localhost:3000/api/orders`);
    console.log(meinCookie);
    if (process.env.TOKEN !== meinCookie.token) {
        return {
            redirect: {
                destination: "/backend/login",
                permant : false
            }
        }
    }
    return {
        props: { orders: res.data },
    };
}