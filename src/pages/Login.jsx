import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const Login = () => {
  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signIn = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setLoading(false)
      const user = userCredential.user
      console.log(user)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('An error occured: ', errorCode, errorMessage)
    }
  }
  return (
    <div>
      <form action="" onSubmit={(e) => signIn(e)}>
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
        <button
          type="submit"
          className={`btn btn-accent mt-4 ${loading ? 'loading' : ''}`}
        >
          Log in
        </button>
      </form>
    </div>
  )
}
