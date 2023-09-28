/*https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch*/
import React from 'react';
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';

function CheckboxToggleSwitch(props){
    const {label, name, options, ...rest} = props;
  return(
    <div>
        <p htmlFor={name} className='float-start'>{label}</p>
        <label htmlFor={name} className="switch">
          <Field type="checkbox" id={name} name={name} aria-label="checkbox for adjacent text" {...rest} />
          <span className="slider round"></span>
        </label>
        <ErrorMessage name={name} component={TextError} />
    </div>
  )
}
export default CheckboxToggleSwitch;