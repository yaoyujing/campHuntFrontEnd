import React from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import "../../assets/css/addCampForm.css"
import { ApiCalls,URL } from '../../utils/ApiCalls';


export default function EditCampGround({closeModal,data,setData}){
    console.log(closeModal)
    console.log(data)
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
      const file = e.target.files[0];

      // Extract only the file name
      const fileName = file ? file.name.substring(0, file.name.lastIndexOf('.')) : '';
      setSelectedImage(fileName);
    };

    const apiResponse = (api,res)=>{
        if(api===URL.editCampground){
            if(res.status===201 || res.status===200 ){
                ApiCalls("get",URL.getCampgrounds,{},apiResponse)
            }
        }
        if(api===URL.getCampgrounds){
            if(res.status===201 || res.status===200){
                setData(res.data)
                closeModal();
            }
        }
    }
    {console.log(data)}
  return <div>
    {data&&  <Formik
      initialValues={{id:data._id, title: data.title,location:data.location, price: data.price,description:data.description,imageUrl:data.imageUrl }}
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
        values.id = data._id
        console.log(values)
        setTimeout(() => {
            ApiCalls("put",URL.editCampground, values, apiResponse)
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
          <button className='submitButton'  type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>}
    
  </div>
}

// export default AddCampGround;