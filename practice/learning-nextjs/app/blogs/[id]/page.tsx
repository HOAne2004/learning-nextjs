'use client'
import { use } from 'react';
import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/navigation';

export default function ViewDetailBlog({
    params
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = use(params);

    console.log(">> check id: ", id);

    const router = useRouter();

    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/blogs/${id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }

    );
    if (error) return (<div className="text-red-700 bg-red-200 text-center p-4">Đã có lỗi xảy ra.</div>);
    if (isLoading) return (<div className="text-green-700, bg-green-200 text-center p-4">Đang tải...</div>)


    return (
        <div className='flex flex-col gap-4 p-4'>

            <div className='flex justify-evenly items-center container'>
                <span>View detail blog = {id}</span>
                <button className='text-red-400' onClick={() => router.push("/blogs")}>Back Blogs</button>
            </div>
            <div className='container flex flex-col gap-4'>
                <div><h1 className='font-bold text-2xl text-center'>{data?.title}</h1></div>
                <div><span>{data?.content}</span></div>
                <div><h3 className='font-bold text-right'>{data?.author}</h3></div>
            </div>

        </div>
    )
}