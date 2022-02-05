import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as Forms, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { IoTrashOutline } from 'react-icons/io5'
import useSelectField from '../hooks/useSelectField'
import invoiceId from '../utility/id'
import { useDispatch, useSelector } from 'react-redux'
import { createInvoice, updateInvoice } from '../redux/invoiceSlice'
import { useParams } from 'react-router-dom'

export const Form = () => {
  const { id } = useParams()
  const isAddMode = !id
  const dispatch = useDispatch()
  const codeFieldList = useSelectField('code')
  const moFieldList = useSelectField('marketingOfficer')

  const { invoice } = useSelector((state) => state.invoice)

  let initailValues = {
    name: '',
    phone: '',
    address: '',
    date: '',
    code: '',
    mo: '',
    description: '',
    status: 'unpaid',
    products: [
      {
        id: Date.now(),
        color: '',
        quantity: '',
        size: '',
        rate: '',
      },
    ],
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
    alert('submitting form')
    if (isAddMode) {
      const invoiceId = invoiceId()
      const timestamp = Date.now()
      const totalAmount = value.products.reduce((acc, current) => {
        return acc + current.rate * 1
      }, 0)
      dispatch(createInvoice({ invoiceId, ...value, totalAmount, timestamp }))
      return
    }
    //updatemode
    const timestamp = Date.now()
    const totalAmount = value.products.reduce((acc, current) => {
      return acc + current.rate * 1
    }, 0)
    const newValue = {
      id: invoice.id,
      updatedValue: { ...value, totalAmount, timestamp },
    }
    dispatch(updateInvoice(newValue))
  }

  return (
    <div className="w-4/6 mx-auto">
      <p className="text-2xl">Create Invoice</p>
      <span>
        <p className="text-blue-500">Bill Form</p>
      </span>
      <Formik
        initialValues={isAddMode ? initailValues : invoice.data}
        validationSchema={validationSchema}
        onSubmit={(value) => {
          //   validationSchema.validate(value).then((result) => {
          //     console.log(result)
          //   })
          handleSubmit(value)
        }}
      >
        <Forms className="bg-white p-8 rounded shadow">
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
            <ErrorMessage component="p" name="name" className="text-red-600" />
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
            <ErrorMessage
              component="p"
              name="phone"
              className="text-red-600"
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
            <ErrorMessage
              component="p"
              name="address"
              className="text-red-600"
            />
          </div>
          <ErrorMessage component="p" name="code" className="text-red-600" />
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
          <ErrorMessage component="p" name="mo" className="text-red-600" />
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <Field type="date" name="date" className="input input-bordered" />
            <ErrorMessage component="p" name="date" className="text-red-600" />
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
            <ErrorMessage
              component="p"
              name="address"
              className="text-red-600"
            />
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
                        <ErrorMessage
                          component="p"
                          name={`products[${index}]['color']`}
                          className="text-red-600"
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
                        <ErrorMessage
                          component="p"
                          name={`products[${index}]['quantity']`}
                          className="text-red-600"
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
                        <ErrorMessage
                          component="p"
                          name={`products[${index}]['size']`}
                          className="text-red-600"
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
                        <ErrorMessage
                          component="p"
                          name={`products[${index}]['rate']`}
                          className="text-red-600"
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
                <span className="label-text">Paid</span>
                <Field
                  type="radio"
                  name="status"
                  className="radio radio-primary"
                  value="paid"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Unpaid</span>
                <Field
                  type="radio"
                  name="status"
                  className="radio radio-secondary"
                  value="unpaid"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="btn btn-outline btn-primary"
              onSubmit={({ resetForm }) => resetForm()}
            >
              Discard
            </button>
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
