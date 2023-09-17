import React from 'react';
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';

function Textarea(props){
    const {label, name, ...rest} = props;
    return(
        <div className='form-control'>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <Field as='textarea' id={name} name={name} {...rest} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}
export default Textarea;