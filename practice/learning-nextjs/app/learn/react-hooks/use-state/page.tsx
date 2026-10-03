'use client' // sử dụng hooks cần khai báo

import { useState } from "react";

export default function UseStatePage() {
    // khởi tạo state
    const [color, setColor] = useState("text-red-300");
    const [count, setCount] = useState(0);

    // khởi tạo object
    const [student, setStudent] = useState({
        name: "Hoan",
        age: 24,
        gender: true
    });

    return (
        <div className="flex flex-col">
            <h1 className="font-bold text-2xl">Learning about useState</h1>
            <span className={color}>
                Đây là màu truyền từ useState: <strong>{color}</strong>
            </span>
            <button onClick={() => setColor(`text-green-500`)}>Đổi màu xanh lá</button>
            <button onClick={() => setColor("text-yellow-500")}>Đổi màu vàng</button>

            <span>Count: {count}</span>
            <button onClick={() => setCount(c => c + 1)}>Click</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <span>
                Đây là khởi tạo object với useState <br />
                Name: {student.name}, <br />
                Age: {student.age},<br />
                Gender: {student.gender ? 'Nam' : 'Nữ'} <br />
            </span>
        </div>
    )
}