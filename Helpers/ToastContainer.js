'use client'
import React from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }) => {
    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
}

export default ToastProvider;