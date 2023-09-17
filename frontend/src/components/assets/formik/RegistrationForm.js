import React from 'react';
import {Formik, Form} from 'Formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';

function RegistrationForm(props){
    const options = [
        {key: 'Email', value: 'emailmoc'},
        {key: 'Telephone', value: 'telephonemoc'},
    ];

    const initialValues = {
        email: '',
        passowrd: '',
        confirmPassword: '',
        modeOfContact: '',
        phone: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        passowrd: Yup.string().required(),
        confirmPassowrd: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required(),
        modeOfContact: Yup.string().required(),
        phone: Yup.string().when('modeOfContact', {
            is: 'telephonemoc',
            then: Yup.string().required()
        })
    });

    const onSubmit = values => {
        console.log('Form data: ', values);
    }

    return(
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {
            (formik)=>{
                return(<Form>
                    <FormikControl control='input' type='email' label='Email' name='email' />
                    <FormikControl control='input' type='password' label='Password' name='password' />
                    <FormikControl control='input' type='password' label='Confirm password' name='confirmPassword' />
                    <FormikControl control='radio' label='Mode of contact' name='modeOfContact' options={options} />
                    <FormikControl control='input' type='text' label='Phone' name='phone' />
                    <button type='submit' disabled={!formik.isValid}>Submit</button>
                </Form>)
            }
        }
        </Formik>
  )
}

export default RegistrationForm;