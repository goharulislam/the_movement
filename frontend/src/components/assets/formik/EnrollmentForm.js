import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';

function EnrollmentForm(){
const dropdownOptions = [
    {key: 'Select course', value: ''},
    {key: 'React', value: 'react'},
    {key: 'Angular', value: 'angular'},
    {key: 'Vue', value: 'vue'},
];

const checkboxOptions = [
    {key:'JavaScript', value:'javascript'},
    {key:'CSS', value:'css'},
    {key:'HTML', value:'html'},
];

const initialValues = {email: '', bio: '', course: '', skills: [], courseData: null};

const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    bio: Yup.string().required(),
    course: Yup.string().required(),
    courseDate: Yup.date().required().nullable(),
});

const onSubmit = values => {
    console.log('Form data', values)

}
    return(
        <Formik initialValues validationSchema onSubmit>
            {
                formik =>{
                    return <Form>
                        <FormikControl control='input' type='email' label='Email' name='email' />
                        <FormikControl control='textarea' label='Bio' name='bio' />
                        <FormikControl control='select' label='Course' name='course' options={dropdownOptions} />
                        <FormikControl control='checkbox' label='Your skillset' name='skills' options={checkboxOptions} />
                        <FormikControl control='date' label='Course date' name='CourseDate' />
                        <button type='submit' disabled={!formik.isValid}>Submit</button>
                    </Form>
                }
            }
        </Formik>
    )
}
export default EnrollmentForm;