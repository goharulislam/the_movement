import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone';

function ImageUploadPreview(){

const [files, setFiles] = useState([]);
const {getRootProps, getInputProps} = useDropzone({
	accept: {
		'image/png': ['.png'], 
		'image/jpeg': ['.jpg', '.jpeg'] 
	},
	onDrop: (acceptedFiles) => {
		setFiles(
			acceptedFiles.map(file => Object.assign(file, {
				preview:URL.createObjectURL(file)
			}))
		)
		console.log('acceptedFiles', acceptedFiles);
	}
})

const images = files.map(file => (
	<img key={file.name} src={file.preview} alt="none" style={{width:'100px',height:'100px'}} />
))

return(
<>
	<div className='dropArea' {...getRootProps()}>
		<input {...getInputProps()} />
		<p><i className="fa fa-cloud-upload" aria-hidden="true"></i> Upload file.</p>
		<ul>
			<li className="text">Drag n Drop Here</li>
			<li>Max file size 10MB</li>
		</ul>
	</div>
	<div>{ images }</div>
</>
)
}
export default ImageUploadPreview;