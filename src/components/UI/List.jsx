import React from 'react'
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoChevronForwardOutline,
} from 'react-icons/io5'

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

export const List = ({ invoice }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg mt-3 border border-white hover:border-slate-500 cursor-pointer">
      <div className="flex">
        <p className="font-bold mr-3">#{invoice.invoiceId}</p>
        <p className="text-slate-500 mr-3">{invoice.date}</p>
        <p className="text-slate-500">{invoice.name}</p>
      </div>
      <div className="flex items-center">
        <p className="mr-12 text-2xl font-bold">&#2547;{invoice.totalAmount}</p>
        <div className="alert h-10 w-24 bg-green-100 rounded">
          <div className="flex justify-center items-center">
            {<Status status={invoice.status} />}
          </div>
        </div>
        <IoChevronForwardOutline className="ml-2" />
      </div>
    </div>
  )
}
