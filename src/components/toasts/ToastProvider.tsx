"use client"

import { ToastContainer } from "react-toastify"

export const ToastProvider = () => {
  return (
    <ToastContainer
      closeButton={true}
      position="top-center"
      newestOnTop={true}
      autoClose={3000}
      pauseOnHover={true}
      draggable
    />
  )
}