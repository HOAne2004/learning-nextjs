'use client'

import { useRef, useState } from "react"

export default function UseRefPage() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const focusInput = () => {
        // ❌ Cách cũ — không nên dùng trong React
        //document.querySelector('#classInput').focus();
        inputRef.current?.focus();
    }

    const [count, setCount] = useState(0);
    const renderCount = useRef(0);  // ← Đếm số lần render

    renderCount.current += 1;  // Tăng mỗi lần render

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1>useRef</h1>
            <h2>1. Truy cập DOM element trực tiếp</h2>
            <input ref={inputRef} type="text" placeholder="Tìm kiếm..." />
            <button onClick={focusInput}>Focus input</button>
            <h2>2. Lưu giá trị "ẩn" không gây re-render</h2>
            <div>
                <p>Count: {count}</p>
                <p>Số lần render: {renderCount.current}</p>
                <button onClick={() => setCount(count + 1)}>Tăng</button>

                {/* Không gây re-render => UI giữ nguyên giá trị */}
                <button onClick={() => renderCount.current++}>Tăng dùng renderCount.current++</button>
            </div>
        </div>
    )
}