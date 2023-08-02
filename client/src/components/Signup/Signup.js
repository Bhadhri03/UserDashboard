import { Box, Grid, Button, Stack, Typography, TextField, Link } from '@mui/material'
import React from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {  ErrorMessage, Form, Formik , Field } from 'formik';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import './Signup.css'



const Signup = () => {

  const onSubmit = (values, props) => {
    console.log(values)
    console.log(props)
    setTimeout(() => {
 
        props.resetForm()
        props.setSubmitting(false)
    }, 2000)
}
      const initialValues = {
            email: '',
            password: '',
            gender: '',
            phoneNumber: '',
            gender: '',
            confirmPassword: '',
        } 
      const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        gender: Yup.string().oneOf(["male", "female"], "Required").required("Required"),
        phoneNumber: Yup.number().typeError("Enter valid Phone Number").required("Required"),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        })
    
      const [isPassword, setIsPassword] = React.useState(true);
      const handleTogglePassword = () => {
        setIsPassword(!isPassword);
      };



  return (
    <Box>
        <Grid container >
            
            <Grid item  sm={3} className='back fixedGrid'>
                
            </Grid>

            <Grid item  sm= {9} className='scrollableGrid' >
            <Stack spacing={2} p={3}>
                  <Typography variant='h5' fontWeight='300' fontFamily='Montserrat'> Welcome User! </Typography>
                 
                  <Typography variant='h3' fontFamily='Roboto,sans-serif' fontWeight='300'> Create your account </Typography>
                 
                  <Typography variant='button' >Already have an account? <Link href="/login" underline="hover" color='green'>Log in</Link></Typography>

                  <Button variant='contained' className='oauth-button' >Google</Button>
                  <Button variant='contained' className='oauth-button'>Web3</Button>

                  
                  <Typography variant='subtitle' sx={{width: '20%', color: 'grey' }} align='center' >or sign up with</Typography>
                    
                
                  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                  {(props)=>(
                    <Form > 

                    <Grid container spacing={2} >
                        <Grid item spacing={2} sm={4}>
                            <Stack spacing={2}>
                                <Box > 
                                  <Field as={TextField} id="filled-basic" 
                                  label="First Name" 
                                  name='name' 
                                  variant="filled"  
                                  helperText={<ErrorMessage name="name" />}
                                  fullWidth
                                  required />
                                </Box>
                                
                                <Box> 
                                  <Field as={TextField}
                                    id="filled-basic" 
                                    label="Email" 
                                    name='email'
                                    variant="filled"
                                    fullWidth
                                    required
                                    helperText = {<ErrorMessage name='email' />}
                                    />
                                </Box>
                                
                                <Box>
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
                                </Box>

                                <Box>
                                  <FormControl component="fieldset">
                                      <FormLabel component="legend">Gender</FormLabel>
                                      <Field as={RadioGroup} aria-label="gender" name="gender" style={{ display: 'initial' }}>
                                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                                      </Field>
                                  </FormControl>
                                  <FormHelperText><ErrorMessage name="gender" /></FormHelperText>
                                </Box>
                                
                                <Button type='submit' variant='contained' disabled={props.isSubmitting}
                                color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
{/*                                   
                                  <Button onClick={onSubmit} variant='contained' disabled={props.isSubmitting}
                                            fullWidth>{props.isSubmitting ? "Loading" : "Sign up"}</Button> */}

                              </Stack>
                        </Grid>
                          <Grid item spacing={2} sm={4}>
                              <Stack spacing={2} >
                                  <Box>
                                    <TextField id="filled-basic" label="Last Name" variant="filled" fullWidth required />
                                  </Box>  
                                  
                                  
                                  <Box>
                                    <Field as={TextField}
                                    id="filled-basic" 
                                    label="Phone Number" 
                                    name='phoneNumber' 
                                    variant="filled"
                                    helperText={<ErrorMessage name="phoneNumber" />}
                                    fullWidth
                                      />
                                  </Box>
                                  
                                  <Box> 
                                    <Field as={TextField} id="filled-basic" 
                                    label="Confirm Password" 
                                    name='confirmPassword'
                                    variant="filled"
                                    type = 'password'
                                    helperText = { <ErrorMessage name='confirmPassword' />  }
                                    fullWidth
                                      required  
                                    />
                                  </Box>                               
                                 
                              </Stack>
                          </Grid>
                          <Grid item sm={4}>

                          </Grid>
                      </Grid>
                    </Form>

                  )}
                </Formik>     
                          
                </Stack>
                
            </Grid>
        </Grid>
    </Box>
  )
}

export default Signup