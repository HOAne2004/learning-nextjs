'use client'

import { useRouter } from "next/navigation"

export default function AdminPage() {
    const router = useRouter();
    const handleBtn = () => {
        router.push("/");
    }
    return (
        <div>
            <h1>Admin Page</h1>
            <a href="admin/patient-management">Tới trang quản lý bệnh nhân</a>

            <div>
                <button className="bg-amber-300" onClick={() => handleBtn()}>Back Home</button>
            </div>
        </div>
    )
}