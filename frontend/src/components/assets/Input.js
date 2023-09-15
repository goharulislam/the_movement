import React from 'react';
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';

function Input(props){
    const {label, name, ...rest} = props;
    if(props.type === 'checkbox'){
        return(
            <div>
                <label htmlFor={name} className="main">{label}
                    <Field id={name} name={name} {...rest} />
                    <span className="geekmark"></span>
                </label>
                <ErrorMessage name={name} component={TextError} />
            </div>
        )
    } else {
        return(
            <div>
                <label htmlFor={name} {...rest}>{label}</label>
                <Field id={name} name={name} {...rest} />
                <ErrorMessage name={name} component={TextError} />
            </div>
        )
    }
}

export default Input;