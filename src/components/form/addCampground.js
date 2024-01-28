import React from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import "../../assets/css/addCampForm.css"
import { ApiCalls,URL } from '../../utils/ApiCalls';


export default function AddCampGround({closeModal,setData}){
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];

      // Extract only the file name
      const fileName = file ? file.name.substring(0, file.name.lastIndexOf('.')) : '';
      setSelectedImage(fileName);
    };

    const apiResponse = (api,res)=>{
        if(api===URL.createCampground){
            if(res.status===201){
                ApiCalls("get",URL.getCampgrounds,{},apiResponse)
                closeModal()
            }
            
        }
        if(api===URL.getCampgrounds){
            setData(res.data)
        }
    }
  return <div>
    <Formik
      initialValues={{ title: '',location:'', price: '',description:'',imageUrl:'' }}
      validate={values => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        } 
        if (!values.location) {
            errors.location = 'Required';
          } 
          if (!values.price) {
            errors.price = 'Required';
          } 
        return errors;
      }}
     
      onSubmit={(values, { setSubmitting }) => {
        values.imageUrl=selectedImage
        setTimeout(() => {
            ApiCalls("POST",URL.createCampground, values, apiResponse)
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className='campcontainer' onSubmit={handleSubmit}>
        <input type="file" name='image' accept="image/*" onChange={handleImageChange} />
        {selectedImage && <img src={require(`../../assets/images/${selectedImage}.jpg`)}></img>}
          <div className='inputText'>Title</div>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            className='inputField'
          />
          {errors.title && touched.title && <div className='inputError'>{errors.title}</div>}
          <div className='inputText'>Location</div>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.location}
            className='inputField'
          />
          {errors.location && touched.location && <div className='inputError'>{errors.location}</div>}
          <div className='inputText'>Price</div>
          <input
            type="text"
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
            className='inputField'
          />
          {errors.price && touched.location && <div className='inputError'>{errors.location}</div>}
          <div className='inputText'>Description (optional)</div>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            className='inputField'
          />
          <button className='submitButton' type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
}

// export default AddCampGround;