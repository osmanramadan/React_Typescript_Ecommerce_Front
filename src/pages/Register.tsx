import { useForm,type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { Form, Button,Container, Spinner } from "react-bootstrap";
import { signUpSchema, type signUpType } from "@validation/signUpSchema";
import Input from "@components/forms/Input/Input";
import { ActAuthSignUp, authClear } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Register = () => {
   const nav = useNavigate()
  const dispatch = useAppDispatch()
  const {loading,error} = useAppSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

    const submitForm: SubmitHandler<signUpType> = async (data) => {
    

    await dispatch(ActAuthSignUp(data)).unwrap().then(_=>nav("/login?msg=success register"))
        
  };

   useEffect(() => {
     return () => {
       dispatch(authClear());
     };
   }, [dispatch]);
 
 
  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability()

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value);
    }

    // if field is invalid after user interaction, reset availability state
    if (isDirty && invalid) {
      resetCheckEmailAvailability();
    }
  };

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
              style={{ color: "white" }}
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