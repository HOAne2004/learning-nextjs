'use client'
import { useRouter } from "next/navigation";

export default function Learn(){
    const router = useRouter();
    return(
        <div>
            <button onClick={() => router.push("/learn/react-hooks")}>React Hooks</button>
        </div>
    )
}