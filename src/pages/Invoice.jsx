import React, { useEffect, useRef } from 'react'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getInvoice } from '../redux/invoiceSlice'
import ReactToPrint from 'react-to-print'
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

export const Invoice = () => {
  const { invoice } = useSelector((state) => state.invoice)
  const { id } = useParams()
  const dispatch = useDispatch()
  let componentRef = useRef()

  useEffect(async () => {
    dispatch(getInvoice(id))
  }, [])
  return (
    <div className="w-4/6 mx-auto">
      {!invoice.id && (
        <div className="flex w-full items-center justify-center">
          <button className="btn btn-xs btn-accent loading mx-auto h-12 mt-20">
            loading
          </button>
        </div>
      )}
      {invoice.id && (
        <>
          <div className="flex w-full p-5 justify-between items-center bg-white rounded shadow-sm">
            <div className="flex items-center">
              <p className="mr-4">Status</p>
              <div className="alert h-10 w-24 bg-green-100 rounded">
                <div className="flex justify-center items-center">
                  {<Status status={invoice.status} />}
                </div>
              </div>
            </div>
            <div>
              <button className="btn btn-primary rounded">
                <Link to={`/create/${invoice.id}`}>Edit</Link>
              </button>
              <button className="btn btn-error rounded ml-3">Delete</button>
              <ReactToPrint
                trigger={() => (
                  <button className="btn btn-secondary rounded ml-3">Print</button>
                )}
                content={() => componentRef}
              />
            </div>
          </div>
          <div
            className="bg-white p-5 mt-4 shadow-sm"
            ref={(el) => (componentRef = el)}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">#{invoice.id}</p>
                <p>Re-branding</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">AG Invoice Software</p>
                <p className="text-slate-500">Kotbari Bisswaroad, Cumilla</p>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex justify-between">
                <div className="w-1/2">
                  <span>
                    <p className="text-slate-500 text-sm font-semibold">
                      Bill To
                    </p>
                  </span>
                  <p className="text-xl font-bold">{invoice.name}</p>
                  <p className="text-slate-500 font-semibold">
                    {invoice.phone}
                  </p>
                  <p className="text-slate-500">{invoice.address}</p>
                  <span>
                    <p className="text-slate-500 text-sm font-semibold mt-2">
                      Description
                    </p>
                  </span>
                  <p className="text-sm text-slate-500">
                    {invoice.description}
                  </p>
                </div>
                <div className="text-right w-1/2">
                  <span>
                    <p className="text-slate-500 text-sm font-semibold">Code</p>
                  </span>
                  <p className="text-lg font-semibold">{invoice.code}</p>
                  <span>
                    <p className="text-slate-500 text-sm font-semibold mt-3">
                      Date
                    </p>
                  </span>
                  <p className="text-lg font-semibold">{invoice.date}</p>
                  <span>
                    <p className="text-slate-500 text-sm font-semibold mt-3">
                      Marketing Officer
                    </p>
                  </span>
                  <p className="text-lg font-semibold">{invoice.mo}</p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto mt-12">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.products.map((item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.color}</td>
                      <td>{item.size}</td>
                      <td>{item.quantity}</td>
                      <td>{item.rate}</td>
                      <td>{item.quantity * 1 * (item.rate * 1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex py-6 px-4 justify-between items-center bg-slate-800 text-white rounded">
              <p className="text-sm font-semibold">Total Amount</p>
              <p className="mr-12 text-2xl font-bold">
                &#2547;{invoice.totalAmount}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
