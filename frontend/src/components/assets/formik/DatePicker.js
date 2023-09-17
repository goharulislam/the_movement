/* github.com/Hacker0x01/react-datepicker/ */

import React from 'react';
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';
import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker(props){
    const {label, name, ...rest} = props;
    return(
        <div className='form-control'>
            <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
            <Field name={name}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form;
                        const {value} = field;
                        return(
                            <DateView id={name} {...field} {...rest} selected={value} onChange={val => setFieldValue(name, val)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}
export default DatePicker;