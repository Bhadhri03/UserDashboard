import { Box, Grid, Button, Stack, Typography, TextField, Link } from '@mui/material'
import React from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {  ErrorMessage, Form, Formik , Field } from 'formik';
import * as Yup from 'yup';

import './Login.css'


const Login = () => {
  
  const onSubmit = (values, props) => {
    console.log(values)
    setTimeout(() => {
        props.resetForm()
        props.setSubmitting(false)
    }, 2000)

}
  const initialValues = {
        email: '',
        password: '',
        remember: false
    } 
  const validationSchema = Yup.object().shape({
        email : Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })

  const [isPassword, setIsPassword] = React.useState(true);
  const handleTogglePassword = () => {
    setIsPassword(!isPassword);
  };


  return (
    <Box>
        <Grid container>
            <Grid item  sm={3}>
                <Stack spacing={2} p={3}>
                  <Typography variant='h4' fontWeight='300' fontFamily='Montserrat'> Welcome User! </Typography>
                 
                  <Typography variant='h3' fontFamily='Roboto,sans-serif' fontWeight='300'> Login to your account </Typography>
                 
                  <Typography variant='h6' >Don't have an account? <Link href="/signup" underline="hover" color='green'>Sign up</Link></Typography>

                  

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                  {(props)=>(
                    <Form > 

                    <Field as={TextField}
                      id="filled-basic" 
                      label="Email" 
                      name='email'
                      variant="filled"
                      fullWidth
                      required
                      helperText = {<ErrorMessage name='email' />}
                      />
                     <br/> <br/>
                    <Field as={TextField} id="filled-basic" 
                      label="Password" 
                      name='password'
                      variant="filled"
                      type= { !isPassword ? 'text' : 'Password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword}>
                              {!isPassword  ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }} 
                      helperText = { <ErrorMessage name='password' />  }
                      fullWidth
                        required  
                      />
                      <br/> <br/>
                      <Button type={onSubmit} variant='contained' disabled={props.isSubmitting}
                                fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>
                    </Form>

                  )}
                </Formik>
                  
                 
                  <Link href="#" underline="hover" color='green'>Forgot Password?</Link>
                 
                  
                 
                  <Typography>or continue with</Typography>
                    
                  <Button variant='contained' fullWidth>Google</Button>
                  <Button variant='contained' fullWidth>Web3</Button>
                </Stack>
            </Grid>
            <Grid item  sm= {9} className='back'>
                
                
            </Grid>
        </Grid>
    </Box>
  )
}

export default Login