import React from 'react'

export const Settings = () => {
  return (
    <div className="w-4/6 mx-auto">
      <div className="flex justify-around">
        <div className="w-2/5">
          <div className="card card-bordered bg-white shadow-sm w-full">
            <div className="card-body">
              <h2 className="card-title">
                Create New Manager
                <div className="badge mx-2 badge-secondary">NEW</div>
              </h2>
              <form>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Manager</span>
                  </label>
                  <input
                    type="text"
                    placeholder="manager"
                    className="input input-bordered"
                  />
                </div>
                <button className="btn btn-primary rounded-sm mt-3">Create</button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-2/5">
          <div className="card card-bordered bg-white shadow-sm w-full">
            <div className="card-body">
              <h2 className="card-title">
                Create New Code
                <div className="badge mx-2 badge-secondary">NEW</div>
              </h2>
              <form>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="code"
                    className="input input-bordered"
                  />
                </div>
                <button className="btn btn-primary rounded-sm mt-3">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
