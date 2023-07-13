import React from 'react';
import DashApp from '../global/DashApp';
import { Box, Button, FormControlLabel, TextField, useMediaQuery, Checkbox, CircularProgress } from '@mui/material';
import Header from '../../Header';
import { Field, Formik } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import axios from 'axios';
import Notification from '../../Notifications/Notification';


const Form = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [checkedRole, setCheckedRole] = useState('');
  const [signupState, setSignupState] = useState(false);
  // notification handler
  const [errorState, setErrorState] = useState('');

  console.log({ checkedRole });
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedRole(value);
    } else {
      setCheckedRole('');
    }
  };
  // formik configuration initial
  const initialValues = {
    firstName: "teststudent",
    lastName: "teststudent",
    email: "teststudent.teststudent@edu.savonia.fi",
    password: "teststudent",
    confirmpassword: "teststudent",
    isAdmin: false,
    role: []
  };
  // validation schema
  // const phoneRegExp =
  //   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    confirmpassword: yup.string().required("required"),
  });
  // handle creation of user 
  const handleFormSubmit = async (values) => {
    const { firstName, lastName, email, password, confirmpassword } = values;
    try {
      if ((!firstName) || (!lastName) || (!email) || (!password) || (!confirmpassword))
        throw new Error("ALL FIELDS REQUIRED");
      if (confirmpassword !== password)
        throw new Error("PASSWORD INCORRECT");
      setSignupState(true);
      // userdata
      const user_Data = {
        firstname: firstName,
        lastname: lastName,
        username: email,
        password: password,
        userclass: checkedRole ? checkedRole : "student"
      };
      // configurations
      const config_Data = {
        'Content-Type': 'application/json'
      };
      const { data } = await axios.post("http://127.0.0.1:8000/api/user/signup", user_Data,
        {
          headers: config_Data
        });
      console.log(data);
      // if login fails
      if (!data || data.status === false)
        throw new Error(data.message);
      console.log(data);
      setErrorState({ color: 'green', message: 'User Created  Sucessfully' });
      setSignupState(false);
    } catch (error) {
      // set up sign up state
      setSignupState(false);
      // set notifcation message
      setErrorState({
        color: 'red',
        message: error.message
      });
      // clear notifcation
      setTimeout(() => {
        setErrorState('');
      }, 3000);

    }
  };
  return (
    <DashApp>
      <Box
        m='20px'>
        <Header
          title={'New User'}
          subtitle={'Create A New User Here'}
        />
        {/* form */}
        <Box>
          <Formik
            // will handle the on submit
            onSubmit={handleFormSubmit}
            // the values below 
            initialValues={initialValues}
            // the schema used for form validation
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  {/* firstname text field */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  {/* firstname text lasname */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  {/* firstname text email */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  {/* firstname text password */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  {/* firstname text confirm password */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="ConfirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmpassword}
                    name="confirmpassword"
                    error={!!touched.confirmpassword && !!errors.confirmpassword}
                    helperText={touched.confirmpassword && errors.confirmpassword}
                    sx={{ gridColumn: "span 4" }}
                  />
                  {/* ACCESSS LEVEL CHECK BOXES */}
                  <Box>
                    <FormControlLabel
                      control={
                        <Field
                          name="role"
                          type="checkbox"
                          value="admin"
                          as={Checkbox}
                          sx={{
                            color: 'green',
                            '&.Mui-checked': {
                              color: 'green',
                            },
                          }}
                          checked={checkedRole === 'admin'}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Admin"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          name="role"
                          type="checkbox"
                          value="student"
                          as={Checkbox}
                          sx={{
                            color: 'green',
                            '&.Mui-checked': {
                              color: 'green',
                            },
                          }}
                          checked={checkedRole === 'student'}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Student"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          name="role"
                          type="checkbox"
                          value="manager"
                          as={Checkbox}
                          sx={{
                            color: 'green',
                            '&.Mui-checked': {
                              color: 'green',
                            },
                          }}
                          checked={checkedRole === 'manager'}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Manager"
                    />
                  </Box>
                </Box>
                {/* handle submit */}
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Create New User
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        {/* show signup spinner */}
        {signupState &&
          <Box>
            <CircularProgress
              sx={{ marginTop: 3 }} />
          </Box>
        }
        {/* show notifcation message */}
        {errorState &&
          <Notification errorState={errorState} />
        }
      </Box>
    </DashApp>
  );
};

export default Form;