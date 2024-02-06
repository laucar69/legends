import mongodb from '@/utils/mongodb'
import Slider from '../components/Slider'
import ProductList from '@/components/ProductList';
import ProductModel from '@/models/ProductModel';

export default function Home({products}) {
  return (
    <div>
      <Slider></Slider>
     <ProductList products={products}></ProductList>
    </div>
  )
}

export async function getServerSideProps() {
  await mongodb.dbConnect();
  const products = await ProductModel.find({}).lean();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
