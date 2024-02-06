import Link from 'next/link'
import {useRouter} from 'next/router'


export default function BreadCrump() {
    const router = useRouter();

    function generateBreadCrump() {
        
        const asPathWithoutQuery = router.asPath.split("?")[0];

        const asPathWithNestedRoutes = asPathWithoutQuery.split("/").filter(v => v.length > 0);

        const crumpList = asPathWithNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathWithNestedRoutes.slice(0, idx + 1).join("/");
        
            return {href, subpath};
        })
        return crumpList;
    }

    const breadCrump = generateBreadCrump();
    const breadCrumpLength = breadCrump.length;


    let out = <Link href={"/"}>Home</Link>;


    for (let x = 0; x <= breadCrumpLength -2; x++){
          out = <>{out} <span> | </span> <Link href={breadCrump[x].href}>{breadCrump[x].subpath}</Link></>
    } 

    return (
        <div>
            {out}
        </div>
    );
}
