import React, {useState} from 'react';
//import {useNavigate} from 'react-router-dom';
import {Formik, Form, FieldArray} from 'formik';
import FormikControl from './assets/FormikControl';
import * as Yup from 'yup';

function Edit(){
//const navigate = useNavigate();
const [data, setData] = useState({
	full_name: '',
  	sectors: [
		{
			company_name: '',
			job_title: '',
			date_started: '',
			date_finished: '',
			address: '',
			phone: '',
			email: '',
			reason_leaving: '',
			contact_employer: false,
		},
	],
	terms: false,
});

const [currentStep, setCurrentStep] = useState(0);
const [errors, setErrors] = useState({});

const makeRequest = (formData) => {
	console.log('form submitted', formData);
	document.getElementById("whereToPrint").innerHTML = JSON.stringify(formData, null, 4);
}

const handleNextStep = (newData, final = false) => {
	setData((prev) => ({...prev, ...newData}));
	if(final){
		makeRequest(newData)
		return
	}
	setCurrentStep((prev) => prev + 1);
};

const handlePrevStep = (newData) => {
	setData((prev) => ({...prev, ...newData}));
	setCurrentStep((prev) => prev - 1);
};

const steps = [
				<StepOne next={handleNextStep} data={data} errors={errors} />
			]

return(
	<section>
	<div className="container">
		<h3 className='float-start'>Candidate Registration Form</h3>
		{/*<button onClick={() => navigate(-1)} className="btn1 float-end">Create</button>*/}
		{steps[currentStep]}
		<pre id="whereToPrint"></pre>
	</div>{/*con*/}
	</section>
);
}

const stepOneValidationSchema = Yup.object({
	first_name: Yup.string().required().label('First Name'),
	/*last_name: Yup.string().required().label('Last Name'),
	gender: Yup.string().required().label('Gender'),
	home_address: Yup.string().required().label('Home Address'),
	postal_code: Yup.string().required().label('Postal Code')*/
});

const StepOne = (props) => {

const handleSubmit = (values) => {
	console.log('p-e', Formik)
	props.next(values);
}

return(
	<Formik initialValues={props.data} validationSchema={stepOneValidationSchema} onSubmit={handleSubmit}>
	{formik => {
		console.log('formik', formik)
		return(
	<Form>
		<h4>Please enter your name and pick the Sectors you are currently involved in.</h4>
		<div className="row">
		<div className="col-md-12">
			<FormikControl control='input' type='text' label='Full Name' name='full_name' placeholder='John' />
		</div>
		<div className="col-md-12">
			<FormikControl control='input' type='text' label='Selectors' name='selectors' />
		</div>
		<div className="col-md-4">
			<FormikControl control='input' type='text' label='Terms' name='terms' />
		</div>
	</div>{/*row*/}
	</Form>
	)}}
</Formik>
);
}

export default Edit;