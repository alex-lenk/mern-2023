import { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {login} from '../services/authService';
import AuthContext from '../stores/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function LoginForm() {
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    try {
      const data = await login(values.email, values.password);
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Formik
      initialValues={ { email: '', password: '' } }
      validationSchema={ LoginSchema }
      onSubmit={ handleSubmit }
    >
      { ({ errors, touched }) => (
        <Form>
          <Field name="email"/>
          { errors.email && touched.email && <div>{ errors.email }</div> }
          <Field name="password" type="password"/>
          { errors.password && touched.password && <div>{ errors.password }</div> }
          { error && <div>{ error }</div> }
          <button type="submit">Login</button>
        </Form>
      ) }
    </Formik>
  );
}

export default LoginForm;
