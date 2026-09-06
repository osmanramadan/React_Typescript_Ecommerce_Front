import { Form, Button,Container, Spinner } from "react-bootstrap";
import Input from "@components/forms/Input/Input";
import useSignUp from "@hooks/useSignUp";



const Register = () => {

const {loading,error,register, handleSubmit,submitForm,
       errors, emailAvailabilityStatus, emailOnBlurHandler} = useSignUp()

  return (
    <Container className="py-5" style={{ maxWidth: 420 , marginBottom:"100px"}}>
      <h1 className="mb-4">Sign Up</h1>
      
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              label="Email Address"
              name="email"
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
              }
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message}
            />
            <Button
              variant="info"
              type="submit"
              style={{ backgroundColor: '#0D6EFD', borderColor: '#0D6EFD', color: 'white' }}
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            >
              {loading==="pending"?<Spinner size="sm"></Spinner>:'Submit'}

            </Button>
          </Form>
          <span style={{color:"red",marginTop:"50px"}}>{error?error:''}</span>

 
    </Container>
  );
};

export default Register;