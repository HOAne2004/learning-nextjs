'use client'

import { ReactNode, useEffect } from "react";

type ModalProps = {
    show: boolean,
    onHide: () => void,
    title: string,
    children: ReactNode,
    footer?: ReactNode,
    keyboard?: boolean,
    backdrop?: 'static' | true,
};

export default function Modal({ show, onHide, title, children, footer, keyboard= true, backdrop = true }: ModalProps) {
    // Xử lý phím Escape
    useEffect(() => {
        if (!show || !keyboard) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onHide();
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [show, keyboard, onHide]);

    // Khóa scroll của body khi modal mở
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    if (!show) return null;

    const handleBackdropClick = () => {
        if(backdrop === 'static') return;
        onHide();
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 p-4 flex justify-center items-center"
            onClick={handleBackdropClick}>

            {/* onClick={(e) => e.stopPropagation() Chặn bug click vào nội dung modal, thấy nó cũng đóng */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-4 flex flex-col gap-2"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-xl">
                        {title}
                    </h2>
                    <button className="btn text-4xl" onClick={onHide}>x</button>
                </div>

                <hr />
                <div className="p-4">
                    {children}
                </div>
                {footer && (
                    <div className="flex justify-evenly items-center gap-4">
                        {footer}
                    </div>
                )}

            </div>
        </div>
    )
}