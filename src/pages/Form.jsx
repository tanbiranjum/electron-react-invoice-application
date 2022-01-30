import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as Forms, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { IoTrashOutline } from 'react-icons/io5'
import useSelectField from '../hooks/useSelectField'
import invoiceId from '../utility/id'
import { useDispatch, useSelector } from 'react-redux'
import { createInvoice } from '../redux/invoiceSlice'
import { useParams } from 'react-router-dom'

export const Form = () => {
  const { id } = useParams()
  const isAddMode = !id
  const dispatch = useDispatch()
  const codeFieldList = useSelectField('code')
  const moFieldList = useSelectField('marketingOfficer')

  const { invoice } = useSelector((state) => state.invoice)

  const initailValues = {
    name: '',
    phone: '',
    address: '',
    date: '',
    code: '',
    mo: '',
    description: '',
    status: '',
    products: [
      {
        id: Date.now(),
        color: '',
        quantity: '',
        size: '',
        rate: '',
      },
    ],
    totalAmount: 0,
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.number().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    date: Yup.date().required('Date is required'),
    code: Yup.string().required('Code is required'),
    mo: Yup.string().required("Marketing Officer's name is required"),
    description: Yup.string().required('Description is required'),
    products: Yup.array().of(
      Yup.object().shape({
        color: Yup.string().required('Product color is required'),
        quantity: Yup.string().required('Quantity is required'),
        size: Yup.string().required('Tile size is required'),
        rate: Yup.number().required('Product rate is required'),
      })
    ),
  })

  const handleSubmit = (value) => {
    const id = invoiceId()
    const timestamp = Date.now()
    value.status = value.status === '' ? 'unpaid' : value.status[0]
    value.totalAmount = value.products.reduce((acc, current) => {
      return acc + current.rate * 1
    }, 0)
    // dispatch(createInvoice({ id, ...value, timestamp }))
    console.log({ id, ...value, timestamp })
  }

  return (
    <div className="w-4/6 mx-auto">
      {console.log(isAddMode)}
      <p className="text-2xl">Create Invoice</p>
      <span>
        <p className="text-blue-500">Bill Form</p>
      </span>
      <Formik
        initialValues={isAddMode ? initailValues : invoice}
        // validationSchema={validationSchema}
        onSubmit={(value) => {
          //   validationSchema.validate(value).then((result) => {
          //     console.log(result)
          //   })
          handleSubmit(value)
        }}
      >
        <Forms className="bg-white p-8 rounded shadow">
          {console.log(invoice)}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <Field
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <Field
              type="number"
              placeholder="phone no"
              name="phone"
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <Field
              type="text"
              placeholder="address"
              name="address"
              className="input input-bordered"
            />
          </div>
          <div className="flex w-full mt-3 justify-between">
            <Field
              as="select"
              className="select select-bordered w-cw-48"
              name="code"
            >
              <option>Choose product code</option>
              {codeFieldList.map((item) =>
                item.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))
              )}
            </Field>
            <Field
              as="select"
              className="select select-bordered w-cw-48"
              name="mo"
            >
              <option>Choose marketing officer</option>
              {moFieldList.map((item) =>
                item.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))
              )}
            </Field>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <Field type="date" name="date" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <Field
              as="textarea"
              name="description"
              className="textarea h-24 textarea-bordered"
              placeholder="Description"
            ></Field>
          </div>
          <p className="text-2xl mt-4 font-semibold text-gray-500">itemList</p>
          <FieldArray name="products">
            {(arrayProps) => {
              const { push, remove, form } = arrayProps
              const { values } = form
              const { products } = values
              return (
                <>
                  {products.map((product, index) => (
                    <div
                      className="flex w-full justify-between items-center"
                      key={product.id}
                    >
                      <div className="form-control w-1/4">
                        <label className="label">
                          <span className="label-text">Color</span>
                        </label>
                        <Field
                          type="text"
                          placeholder="color"
                          name={`products[${index}]['color']`}
                          className="input input-bordered"
                        />
                      </div>
                      <div className="form-control w-2/12">
                        <label className="label">
                          <span className="label-text">Quantity</span>
                        </label>
                        <Field
                          type="text"
                          placeholder="quantity"
                          name={`products[${index}]['quantity']`}
                          className="input input-bordered"
                        />
                      </div>
                      <div className="form-control w-2/12">
                        <label className="label">
                          <span className="label-text">Size</span>
                        </label>
                        <Field
                          type="text"
                          placeholder="size"
                          name={`products[${index}]['size']`}
                          className="input input-bordered"
                        />
                      </div>
                      <div className="form-control w-2/12">
                        <label className="label">
                          <span className="label-text">Rate</span>
                        </label>
                        <Field
                          type="text"
                          placeholder="rate"
                          name={`products[${index}]['rate']`}
                          className="input input-bordered"
                        />
                      </div>
                      <p
                        className="mt-5 cursor-pointer"
                        onClick={() => remove(index)}
                      >
                        <IoTrashOutline className="text-lg" />
                      </p>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline btn-primary w-full mt-4"
                    onClick={() =>
                      push({
                        id: Date.now(),
                        color: '',
                        quantity: '',
                        size: '',
                        rate: '',
                      })
                    }
                  >
                    + Add New Item
                  </button>
                </>
              )
            }}
          </FieldArray>
          <div className="p-6 card bordered">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Payment status</span>
                <Field
                  type="checkbox"
                  name="status"
                  value="paid"
                  className="toggle toggle-primary"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="btn btn-outline btn-primary">Discard</button>
            <div>
              <button type="button" className="btn btn-outline btn-primary">
                Save as Draft
              </button>
              <button
                className="btn btn-outline btn-primary ml-4"
                type="submit"
              >
                Save & Send
              </button>
            </div>
          </div>
        </Forms>
      </Formik>
    </div>
  )
}
