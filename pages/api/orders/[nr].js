import mongodb from "@/utils/mongodb";
import Order from "@/models/Order";

export default async function handler(req, res) {

    const {method, query: {nr}} = req;
    await mongodb.dbConnect();


    if (method == "GET"){
        try{
            const bestellung = await Order.findById(nr);
            res.status(200).json(bestellung);
            console.log(`OK ${nr}`);

        } catch(error) {
            console.log(`Error ${error}`);

            console.log(error);
            res.status(200).json(error);
        }  
    }

    if (method === "PUT") {
        try {
            console.log(req.body)

            const bestellung = await Order.findByIdAndUpdate(nr, req.body, {new:true});
            res.status(200).json(bestellung);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    if (method === "DELETE") {
        try {
            console.log(req.body)

            const bestellung = await Order.findByIdAndDelete(nr);
            res.status(200).json(bestellung);
        } catch (error) {
            res.status(500).json(error);
        }
    }
  }