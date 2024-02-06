import mongoose from "mongoose";

const OrderScheme = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
        maxLength: 100
    },
    adress: {
        type: String,
        required: true,
        maxLength: 250
    },
    amount: {
        type: Number,
        required: true,
    },
    state: {
        type: Number,
        required: true
    },
    payType: {
        type: Number,
        required: true
    },
    products: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                extras: {
                    type: [
                        {
                            type: String
                        }
                    ]
                }
            }
        ]
    }

    
})
//delete mongoose.connection.model['Bestellung'];

export default mongoose.models.Order || mongoose.model("Order", OrderScheme)