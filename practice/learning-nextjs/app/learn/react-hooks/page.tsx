'use client'
import { useRouter } from "next/navigation";

export default function ReactHooks(){
    const router = useRouter();
    return(
        <div className="flex flex-col gap-4 py-4">
            <button onClick={() => router.push("/learn/react-hooks/use-state")}>useState</button>
            <button onClick={() => router.push("/learn/react-hooks/use-effect")}>useEffect</button>
        </div>
    )
}