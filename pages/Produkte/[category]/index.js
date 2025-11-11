import {useRouter} from 'next/router'
import BreadCrump from '@/components/BreadCrump';
import ProductList from '@/components/ProductList';
import mongodb from '@/utils/mongodb';
import ProductModel from '@/models/ProductModel';

export default function Category({products}) {
    const router = useRouter();
    const category = router.query.category;

    return (
        <div>
            <BreadCrump></BreadCrump>
            <h2>{category}</h2>
            <ProductList products={products}></ProductList>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { category } = context.params;
    await mongodb.dbConnect();
    const products = await ProductModel.find({ category: category }).lean();
    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}
