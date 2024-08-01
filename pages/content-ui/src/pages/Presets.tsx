/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

const Presets = () => {
  return (
    <div>
      {/* Save to preset */}
      <section className="mt-4">
        <label
          className="form-control w-full max-w-xs mb-2"
          htmlFor="preset-name"
        >
          <div className="label">
            <span className="label-text">Name your preset</span>
          </div>
          <input
            type="text"
            id="preset-name"
            name="preset-name"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs focus:outline-none"
          />
        </label>

        <button
          className="btn btn-primary btn-outline w-full border-green-600"
          onClick={() => {}}
        >
          Save 🔥
        </button>
      </section>

      {/* List of all presets */}
      <section className="mt-4">
        <h2 className="text-lg text-white font-bold">Your presets</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="card bg-slate-900">
            <div className="card-body">
              <h2 className="card-title">Preset 1</h2>
              <p className="text-sm text-white">This is a preset</p>
            </div>
          </div>
          <div className="card bg-slate-900">
            <div className="card-body">
              <h2 className="card-title">Preset 2</h2>
              <p className="text-sm text-white">This is a preset</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Presets;
