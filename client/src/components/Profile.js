import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getProfile, updateProfile } from '../services/api';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
});

function Profile() {
  const [user, setUser] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const updatedUser = await updateProfile(values.email);
        setUser(updatedUser.data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedUser = await getProfile();
        setUser(fetchedUser.data);
        formik.setValues({ email: fetchedUser.data.email });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return 'Loading...';
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
      <button type="submit">Update</button>
    </form>
  );
}

export default Profile;
