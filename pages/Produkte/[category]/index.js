import {useRouter} from 'next/router'
import BreadCrump from '@/components/BreadCrump';

export default function Category() {
    const router = useRouter();
    const category = router.query.category;

    return (
        <div>
            <BreadCrump></BreadCrump>
            <h2>{category}</h2>
        </div>
    )
}
