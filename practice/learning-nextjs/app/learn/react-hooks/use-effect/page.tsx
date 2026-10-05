'use client';

import { useEffect, useState } from 'react';

export default function UseEffectPage() {
    // ─────────────────────────────────────────────────────────
    // 3 state riêng biệt để minh họa 3 kiểu dependency array
    // ─────────────────────────────────────────────────────────
    const [count, setCount] = useState(0);   // Dùng cho effect KHÔNG có deps
    const [count1, setCount1] = useState(0); // Dùng cho effect có deps []
    const [count2, setCount2] = useState(0); // Dùng cho effect có deps [count2]

    const [unrelated, setUnrelated] = useState(0);
    // ═══════════════════════════════════════════════════════════
    // EFFECT 1: KHÔNG có dependency array
    // ─────────────────────────────────────────────────────────
    // → Chạy SAU MỖI LẦN RENDER, dù chẳng liên quan
    // → Mỗi lần count đổi → re-render → effect chạy lại → tạo setTimeout mới
    // → Kết quả: count tăng mãi mãi, mỗi giây 1 lần
    // ═══════════════════════════════════════════════════════════
    useEffect(() => {
        console.log('[Effect 1 - no deps] chạy. count =', count);

        const id = setTimeout(() => {
            setCount((c) => c + 1);
        }, 1000);

        // Cleanup: chạy TRƯỚC khi effect tiếp theo chạy, hoặc khi unmount
        // Ở đây vẫn còn setTimeout cũ nếu không clear → nhưng vì timeout chỉ fire 1 lần
        // nên không gây hại nghiêm trọng, chỉ là không gọn.
        return () => clearTimeout(id);
    });
    // ↑ Không có [] → effect chạy mỗi render

    // ═══════════════════════════════════════════════════════════
    // EFFECT 2: dependency array RỖNG []
    // ─────────────────────────────────────────────────────────
    // → Chạy ĐÚNG 1 LẦN sau lần render đầu tiên (mount)
    // → Sau đó dù count1 có đổi (do chính nó gây ra), effect KHÔNG chạy lại
    // → Kết quả: count1 tăng đúng 1 lần rồi DỪNG
    // ═══════════════════════════════════════════════════════════
    useEffect(() => {
        console.log('[Effect 2 - deps []] chạy. count1 =', count1);

        const id = setTimeout(() => {
            setCount1((c) => c + 1);
        }, 1000);

        return () => clearTimeout(id);
    }, []);
    // ↑ Mảng rỗng → không bao giờ chạy lại

    // ═══════════════════════════════════════════════════════════
    // EFFECT 3: dependency array CÓ GIÁ TRỊ [count2]
    // ─────────────────────────────────────────────────────────
    // → Chạy lần đầu sau mount
    // → Chạy LẠI mỗi khi count2 thay đổi
    // → Kết quả: count2 tăng mãi mãi, mỗi giây 1 lần (giống effect 1)
    //   NHƯNG khác ở chỗ: effect chỉ chạy lại khi count2 đổi,
    //   không phải mỗi lần bất kỳ state nào khác đổi.
    // ═══════════════════════════════════════════════════════════
    useEffect(() => {
        console.log('[Effect 3 - deps [count2]] chạy. count2 =', count2);

        const id = setTimeout(() => {
            setCount2((c) => c + 1);
        }, 1000);

        return () => clearTimeout(id);
    }, [count2]);
    // ↑ Chạy lại mỗi khi count2 đổi

    // ═══════════════════════════════════════════════════════════
    // UI
    // ═══════════════════════════════════════════════════════════
    return (
        <div className="flex flex-col gap-4 p-6">
            <h1 className="font-bold text-2xl">So sánh 3 kiểu useEffect</h1>

            {/* ── Effect 1: Không deps → đếm mãi mãi ── */}
            <div className="border p-4 rounded">
                <h2 className="font-semibold text-lg">
                    Effect 1 — Không có dependency array
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                    Chạy sau MỖI lần render → count tăng mãi mãi
                </p>
                <span className="text-xl">
                    count = <strong>{count}</strong>
                </span>
            </div>

            {/* ── Effect 2: [] → đếm 1 lần rồi dừng ── */}
            <div className="border p-4 rounded">
                <h2 className="font-semibold text-lg">
                    Effect 2 — Dependency array rỗng []
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                    Chạy đúng 1 lần sau mount → count1 tăng 1 lần rồi DỪNG
                </p>
                <span className="text-xl">
                    count1 = <strong>{count1}</strong>
                </span>
            </div>

            {/* ── Effect 3: [count2] → đếm mãi mãi, nhưng có kiểm soát ── */}
            <div className="border p-4 rounded">
                <h2 className="font-semibold text-lg">
                    Effect 3 — Dependency array [count2]
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                    Chạy lại mỗi khi count2 đổi → count2 tăng mãi mãi
                </p>
                <span className="text-xl">
                    count2 = <strong>{count2}</strong>
                </span>
            </div>

            {/* Khi click button, effect 1 sẽ bị khựng lại do timeout sẽ reset lại đếm từ đầu
            nhưng effect 3 thì không ảnh hưởng do đã truyền cụ thể [count2] */}
            <button onClick={() => setUnrelated((u) => u + 1)}>
                Tăng unrelated: {unrelated}
            </button>
        </div>
    );
}