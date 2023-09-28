import { useState, useEffect } from 'react';
//import {useNavigate} from 'react-router-dom';
import {Formik, Form, FieldArray} from 'formik';
import FormikControl from './assets/formik/FormikControl';
import * as Yup from 'yup';
import axios from '../axios/index';

function Edit(){
//const navigate = useNavigate();
const [formValues, setFormValues] = useState(null);
const [currentStep, setCurrentStep] = useState(0);
const [errors, setErrors] = useState({});
const formData = new FormData();

useEffect(() => {
    getData();
}, []);

async function getData(){
  try{
    formData.append('table', 'test');
    formData.append('function', '/get_all');
    let response = await axios({
		method: 'post',
		url: '/get_all',
		data: {
			table: 'test', // This is the body part
		},
		//headers: { 'Content-Type': 'multipart/form-data' },
	  })
		.then(function (response) {
			//handle success
			console.log(response);
			setFormValues(response.data);
		})
    //console.log('Response:', response.data);
    //console.log('Users:', users);
  }catch(err){
    console.log(err);
  }
}

const makeRequest = (formData) => {
	console.log('form submitted', formData);
	document.getElementById('whereToPrint').innerHTML = JSON.stringify(formData, null, 4);
}

const handleNextStep = (newData, final = false) => {
	setFormValues((prev) => ({...prev, ...newData}));
	if(final){
		makeRequest(newData)
		return
	}
	setCurrentStep((prev) => prev + 1);
};

const handlePrevStep = (newData) => {
	setFormValues((prev) => ({...prev, ...newData}));
	setCurrentStep((prev) => prev - 1);
};

const steps = [
				formValues && <StepOne next={handleNextStep} data={formValues} errors={errors} />
			]

return(
	<section>
	<div className='container'>
		{/*<button onClick={() => navigate(-1)} className='btn1 float-end'>Create</button>*/}
		{steps[currentStep]}
		<pre id='whereToPrint'></pre>
	</div>{/*con*/}
	</section>
);
}

const stepOneValidationSchema = Yup.object({
	name: Yup.string().required().label('First Name'),
	/*last_name: Yup.string().required().label('Last Name'),
	gender: Yup.string().required().label('Gender'),
	home_address: Yup.string().required().label('Home Address'),
	postal_code: Yup.string().required().label('Postal Code')*/
});

const StepOne = (props) => {

const handleSubmit = (values) => {
	console.log('formik', Formik)
	props.next(values);
}

return(
	<Formik initialValues={props.data[0]} validationSchema={stepOneValidationSchema} onSubmit={handleSubmit} enableReinitialize>
	{formik => {
		console.log('formik-initialValues', props.data[0].name);
		//console.log('props.data', props.data[0].name);
		return(
			<Form>
				<h4>Please enter your name and pick the Sectors you are currently involved in.</h4>
				<div className='row'>
				<div className='col-md-12'>
					<FormikControl control='input' type='text' label='ID' name='id' disabled />
				</div>
				<div className='col-md-12'>
					<FormikControl control='input' type='text' label='Full Name' name='name' />
				</div>
				<div className='col-md-12'>
					<FormikControl control='input' type='text' label='Selectors' name='selectors' />
				</div>
				<div className='col-md-12'>
					<FormikControl control='input' type='text' label='Terms' name='terms' />
				</div>
				<div className='col-md-12'>
					<button className='btn btn-primary' type='submit'>Update</button>
				</div>
				</div>{/*row*/}
			</Form>
		)}}
	</Formik>
);
}

export default Edit;