import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(8, 'Must be at least 8 characters').required('Required'),
});

function RegisterForm() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await register(values.email, values.password);
        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form onSubmit={ formik.handleSubmit }>
      <input
        type="email"
        name="email"
        value={ formik.values.email }
        onChange={ formik.handleChange }
        onBlur={ formik.handleBlur }
      />
      { formik.touched.email && formik.errors.email ? <div>{ formik.errors.email }</div> : null }
      <input
        type="password"
        name="password"
        value={ formik.values.password }
        onChange={ formik.handleChange }
        onBlur={ formik.handleBlur }
      />
      { formik.touched.password && formik.errors.password ? <div>{ formik.errors.password }</div> : null }
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
