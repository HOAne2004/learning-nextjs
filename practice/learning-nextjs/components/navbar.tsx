'use client'

import { useRouter } from "next/navigation"

export default function Navbar() {
    const router = useRouter();

    return (
        <header className="w-full bg-blue-200">
            <div className="container flex justify-start items-center gap-x-10 p-4">
                <div>
                    <img src="/favicon.ico" alt="Logo" className="w-8 h-8" onClick={() => router.push("/")}/>
                </div>
                <div>
                    <button onClick={() => router.push("/admin")}>Admin</button>
                </div>
                <div>
                    <button onClick={() => router.push("/admin/patient-management")}>
                        Patient Management
                    </button>
                </div>
            </div>
        </header>
    );
}