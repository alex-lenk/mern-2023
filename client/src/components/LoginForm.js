import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../services/api';
import userStore from '../stores/userStore';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
});

function LoginForm() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values.email, values.password);
        userStore.setUser(response.data);
        navigate('/profile');
      } catch (error) {
        toast.error('Invalid email or password');
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
