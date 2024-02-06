// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongodb from "@/utils/mongodb"
import jsondb from "@/jsondb/productsData";
import product from "@/models/ProductModel";

export default async function handler(req, res) {
  await mongodb.dbConnect();
  await product.deleteMany();
  await product.insertMany(jsondb.products);

  const products = await product.find();
  await mongodb.dbDisconnect();
  res.send(products)
}
