import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { List } from '../components/UI/List'
import { LoadButton } from '../components/UI/LoadButton'

export const Invoices = () => {
  const [status, setStatus] = useState('all')
  const { invoices } = useSelector((state) => state.invoice)

  return (
    <div className="w-4/6 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-4xl font-semibold">Invoices</p>
          <p>There are 10 total invoices</p>
        </div>
        <div>
          <div className="btn-group">
            <button
              className="btn btn-outline btn-active"
              onClick={() => {
                setStatus('all')
              }}
            >
              All
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                setStatus('paid')
              }}
            >
              Paid
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                setStatus('unpaid')
              }}
            >
              Unpaid
            </button>
          </div>
        </div>
      </div>
      {invoices.length <= 0 && <LoadButton />}
      {invoices
        .filter((invoice) => {
          if (invoice.status === status) {
            return invoice
          } else if (status === 'all') {
            return invoice
          }
          return
        })
        .map((invoice) => (
          <Link key={invoice.id} to={`/invoice/${invoice.id}`}>
            <List invoice={invoice} />
          </Link>
        ))}
    </div>
  )
}
