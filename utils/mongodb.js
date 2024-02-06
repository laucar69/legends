import mongoose from "mongoose";

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = {
        con: null, promise: null
    }
}

async function dbConnect() {
    if(cached.con){
        console.log('DB Connection active')
        return cached.con
    }

    if(!cached.promise) {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        }
        cached.promise = mongoose.connect(process.env.MONGODB_URI, options).then(mongoose => {
            console.log('DB Verbindung gestartet')
            return mongoose
        })
    }

    cached.con = await cached.promise
    return cached.con
}


async function dbDisconnect() {
    await mongoose.disconnect();
    console.log('DB Verbindung getrennt')
}

const mongodb = {dbConnect, dbDisconnect}
export default mongodb