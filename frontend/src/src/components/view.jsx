import { useState, useEffect } from 'react';
//import {useNavigate} from 'react-router-dom';
import axios from '../axios/index';

export default function View(){
const [rows, setRows] = useState([]);
const formData = new FormData();
//const navigate = useNavigate();

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
      setRows(prevrows => prevrows = response.data);
		})
    //console.log('Response:', response.data);
    //console.log('Users:', users);
  }catch(err){
    console.log(err);
  }
}

function removeTags(str){
  if((str===null) || (str==='')){
      return false;
  } else {
      str = str.toString();
  }
  // Regular expression to identify HTML tags in the input string. Replacing the identified HTML tag with a null string.
  return str.replace( /(<([^>]+)>)/ig, '');
}

function Post_detail(i){
  /*navigate('/post-detail', {
    state: {
      i,
    }
  });*/
}

return(
<section className='blog2'>
<div className='container'>
<div className='row'>
<div className='col-md-12'>
  <p className='large'>BLOG</p>

  <table>
  <tbody>
  {
    rows && rows.length > 0 && rows.map((i) => (
      <tr key={i.id}><td>{i.id}</td><td>{i.name}</td><td>{i.sectors}</td><td>{i.terms}</td><td>{i.updated}</td><td>{i.created}</td></tr>
    ))
  }
  </tbody>
  </table>

</div>
</div>
</div>
</section>
);
}