import React from 'react';
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';

function Input(props){
    const {label, name, ...rest} = props;
    return(
        <div className='form-control'>
            <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
            <Field id={name} name={name} {...rest} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
}
export default Input;