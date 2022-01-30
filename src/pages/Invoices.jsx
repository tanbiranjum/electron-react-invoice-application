import React from 'react'
import {
  IoCheckmarkCircleOutline,
  IoChevronForwardOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Status = ({ status }) => {
  if (status === 'paid') {
    return (
      <>
        <IoCheckmarkCircleOutline className="text-blue-800" />
        <label>
          <p className="text-blue-800 font-semibold">Paid</p>
        </label>
      </>
    )
  }
  return (
    <>
      <IoCloseCircleOutline className="text-red-500" />
      <label>
        <p className="text-red-500 font-semibold">Unpaid</p>
      </label>
    </>
  )
}

export const Invoices = () => {
  const { invoices } = useSelector((state) => state.invoice)

  return (
    <div className="w-4/6 mx-auto">
      {console.log(invoices)}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-4xl font-semibold">Invoices</p>
          <p>There are 10 total invoices</p>
        </div>
        <div>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled="disabled">Filter by status</option>
            <option>paid</option>
            <option>unpaid</option>
          </select>
        </div>
      </div>
      {invoices.map((invoice) => (
        <Link
          className="flex justify-between items-center p-4 bg-white rounded-lg mt-3 border border-white hover:border-slate-500 cursor-pointer"
          key={invoice.id}
          to={`/invoice/${invoice.id}`}
        >
          <div className="flex">
            <p className="font-bold mr-3">#{invoice.id}</p>
            <p className="text-slate-500 mr-3">{invoice.date}</p>
            <p className="text-slate-500">{invoice.name}</p>
          </div>
          <div className="flex items-center">
            <p className="mr-12 text-2xl font-bold">
              &#2547;{invoice.totalAmount}
            </p>
            <div className="alert h-10 w-24 bg-green-100 rounded">
              <div className="flex justify-center items-center">
                {<Status status={invoice.status} />}
              </div>
            </div>
            <IoChevronForwardOutline className="ml-2" />
          </div>
        </Link>
      ))}
    </div>
  )
}
