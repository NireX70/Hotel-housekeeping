import { React } from "react";


export default function InputField(props) {

  return (
    <>
      <div>
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {props.title}
        </label>
        <div className="mt-1">
          <input
            type={props.type}
            name={props.name}
            ref={props.refer}
            autoComplete={props.autoComplete}
            required
            value={props.email}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={props.name}
      >
        {props.title}
      </label>
      <input ref={props.refer} type="text" name={props.name} /> */}
    </>
  );
}
