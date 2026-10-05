'use client';

import { useState, createContext, useContext } from 'react';

// ═══════════════════════════════════════════════════════════
// PHẦN 1: KHÔNG DÙNG CONTEXT (Prop Drilling)
// ═══════════════════════════════════════════════════════════

function PropDrilling1() {
    const [user, setUser] = useState('Linus');

    return (
        <>
            <h1>{`Hello ${user}!`}</h1>
            {/* Phải truyền user xuống Component2 */}
            <PropDrilling2 user={user} />
        </>
    );
}

function PropDrilling2({ user }: { user: string }) {
    return (
        <>
            <h1>Component 2</h1>
            {/* Component2 không dùng user, nhưng vẫn phải nhận và truyền tiếp */}
            <PropDrilling3 user={user} />
        </>
    );
}

function PropDrilling3({ user }: { user: string }) {
    // Cuối cùng cũng dùng user ở đây
    return (
        <>
            <h1>Component 3</h1>
            <h2>{`Hello ${user} again!`}</h2>
        </>
    );
}

// ═══════════════════════════════════════════════════════════
// PHẦN 2: DÙNG CONTEXT
// ═══════════════════════════════════════════════════════════

// Tạo Context (đặt ngoài component để không bị tạo lại mỗi render)
const UserContext = createContext<string | null>(null);

function Context1() {
    const [user, setUser] = useState('Linus');

    return (
        // Provider cung cấp user cho toàn bộ cây con bên trong
        <UserContext.Provider value={user}>
            <h1>{`Hello ${user}!`}</h1>
            {/* Không cần truyền props gì cả */}
            <Context2 />
        </UserContext.Provider>
    );
}

function Context2() {
    // Component2 không cần biết gì về user
    return (
        <>
            <h1>Component 2</h1>
            <Context3 />
        </>
    );
}

function Context3() {
    // Tự lấy user từ Context — không qua trung gian
    const user = useContext(UserContext) ?? 'Guest';

    return (
        <>
            <h1>Component 3</h1>
            <h2>{`Hello ${user} again!`}</h2>
        </>
    );
}

// ═══════════════════════════════════════════════════════════
// PAGE CHÍNH — render cả 2 ví dụ cạnh nhau
// ═══════════════════════════════════════════════════════════

export default function Page() {
    return (
        <div className="p-8 flex flex-col gap-8">
            <h1 className="text-3xl font-bold">
                So sánh: Prop Drilling vs Context
            </h1>

            <div className="grid grid-cols-2 gap-8">
                {/* Cột trái: Không dùng Context */}
                <div className="border-2 border-red-400 rounded p-4">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">
                        ❌ Không dùng Context (Prop Drilling)
                    </h2>
                    <PropDrilling1 />
                </div>

                {/* Cột phải: Dùng Context */}
                <div className="border-2 border-green-400 rounded p-4">
                    <h2 className="text-xl font-semibold text-green-600 mb-4">
                        ✅ Dùng Context
                    </h2>
                    <Context1 />
                </div>
            </div>
        </div>
    );
}