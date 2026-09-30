'use client'

import { useState } from "react"
import { toast } from 'react-toastify'
import { mutate } from 'swr'

type Props = {
    onSuccess?: () => void,
    blog: IBlog
};

export default function UpdateBlogForm({ onSuccess, blog }: Props) {
    const [title, setTitle] = useState(blog.title);
    const [author, setAuthor] = useState(blog.author);
    const [content, setContent] = useState(blog.content);
    const [error, setError] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !author.trim()) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            toast.warning("Vui lòng nhập đủ dữ liệu.");
            return;
        }

        setError('');
        setIsSubmitting(true);
        const newBlog = { title, author, content };
        try {
            const res = await fetch(`http://localhost:8000/blogs/${blog.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBlog),
            });
            if (!res.ok) throw new Error('Lỗi khi gửi dữ liệu');

            const data = await res.json();
            console.log('Đã tạo: ', data);

            //reset form
            setTitle('');
            setAuthor('');
            setContent('');
            setError('');

            toast.success("Cập nhật blog thành công.");

            onSuccess?.();

            //hook tự load lại dữ liệu
            mutate("http://localhost:8000/blogs")
        } catch (err) {
            console.error(err);
            toast.error('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tiêu đề"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                </label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tác giả"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                </label>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập nội dung"
                    rows={4}
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                disabled={isSubmitting}
                className="btn bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                type='submit'
            >
                {isSubmitting ? 'Đang gửi...' : 'Submit'}
            </button>
        </form>
    )
}