'use client'

//import { useEffect } from "react";
import useSWR from 'swr';
import Modal from './create.modal';
import { useState } from 'react';
import CreateBlogForm from './create.form';

export default function DataTable() {

    const [show, setShow] = useState(false);

    //Cách  tự viết logic fetch bằng useEffect thường dẫn đến việc lặp lại code, 
    // quản lý trạng thái thủ công và dễ gặp lỗi. 
    // useEffect(() =>{
    //     const fetchData = async() =>{
    //         const res = await fetch("http://localhost:8000/blogs");
    //         const data = await res.json();
    //         console.log(">>> check res: ", data);
    //     }
    //     fetchData();
    // }, []);

    // SWR:
    //- Tự động Cache.
    //- Tự fetch dữ liệu khi người dùng quay lại tab hoặc khi có kết nối mạng trở lại
    // - Nếu nhiều components cùng gọi 1 API, chỉ thực hiện 1 request duy nhất và chia sẻ kết quả cho tất cả.
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }

    );
    if (error) return (<div className="text-red-700 bg-red-200 text-center p-4">Đã có lỗi xảy ra.</div>);
    if (isLoading) return (<div className="text-green-700, bg-green-200 text-center p-4">Đang tải...</div>)

    //console.log(">>> check res: ", data);

    const blogs: IBlog[] = data?.sort((a: any, b: any) => b.id - a.id);


    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between m-2 container">
                <span className="text-2xl font-bold">Table Blogs {data.length}</span>
                <button className="btn bg-green-500 text-white hover:bg-green-600"
                    onClick={() => { console.log('clicked'); setShow(true) }}>Add new</button>
            </div>
            <table className="container border-collapse">
                {/* Header */}
                <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {blogs?.map((row) => (
                        <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-700">{row.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.title}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.author}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 flex gap-4">
                                <button className="btn btn-primary">View</button>
                                <button className="btn btn-secondary">Edit</button>
                                <button className="btn btn-danger">Delete</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                title='Create Modal'

                backdrop='static'>
                <CreateBlogForm onSuccess={() => setShow(false)} />
            </Modal>
        </div>
    );
}