'use client'

import { useEffect } from "react";

export default function DataTable() {

    useEffect(() =>{
        const fetchData = async() =>{
            const res = await fetch("http://localhost:8000/blogs");
            const data = await res.json();
            console.log(">>> check res: ", data);
        }
        fetchData();
    }, []);

    const data = [
        { id: 1, firstName: "Mark", lastName: "Otto", username: "@mdo" },
        { id: 2, firstName: "Jacob", lastName: "Thornton", username: "@fat" },
        { id: 3, firstName: "Jacob", lastName: "Thornton", username: "@fat" },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                {/* Header */}
                <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">First Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Last Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-700">{row.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.firstName}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.lastName}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}