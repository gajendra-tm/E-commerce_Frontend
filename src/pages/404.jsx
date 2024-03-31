import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderSuccessful() {
  return (
    <>
    <div className="flex flex-col justify-center items-center max-w-full h-screen">
        <div className="text-blue-700 text-xl font-medium">404</div>
        <div className="text-center my-4 space-y-3">
            <h1 className="text-4xl font-bold">Page not found</h1>
            <p className="text-base font-normal">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        </div>
        <Link to="/">
            <button className="bg-blue-700 text-white text-base font-medium p-2 mt-3 hover:bg-blue-600 rounded-lg">
                Go back Home
            </button>
        </Link>
    </div>
    </>
  )
}
