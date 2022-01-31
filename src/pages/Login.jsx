import React, { useState } from 'react'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
      <form action="">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="xxxx@email.com"
            className="input input-bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-accent mt-4">Log in</button>
      </form>
    </div>
  )
}
