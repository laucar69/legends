import {useRouter} from 'next/router'

export default function Category() {
    const router = useRouter();
    const category = router.query.category;

    return (
        <div>
            <h2>wurstbrot</h2>
        </div>
    )
}
