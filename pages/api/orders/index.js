import mongodb from "@/utils/mongodb";
import Order from "@/models/Order";

export default async function handler(req, res) {

    const {method} = req;
    await mongodb.dbConnect();


    if (method == "GET"){
        try{
            const bestellungen = await Order.find();
            res.status(201).json(bestellungen);
        } catch(error) {
            console.log(error);
            res.status(500).json(error);
        }  
    }
    if (method == "POST"){
        try{
            const bestellung = await Order.create(req.body);
            res.status(201).json(bestellung);
        } catch(error) {
            console.log(error);

            res.status(500).json(error);
        }
    }
  }