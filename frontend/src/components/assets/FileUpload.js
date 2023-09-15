/* https://github.com/KarimMokhtar/react-drag-drop-files */

import React from 'react';
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop(props){
    const {label, name, ...rest} = props;
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form;
                        const {value} = field;
                        return(
                            <FileUploader name={name} id={name} {...field} {...rest} selected={value} handleChange={val => setFieldValue(name, val)} types={fileTypes} />
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}
export default DragDrop;