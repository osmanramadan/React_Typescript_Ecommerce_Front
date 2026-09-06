import { useForm,type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { signUpSchema, type signUpType } from "@validation/signUpSchema";
import { ActAuthSignUp, authClear } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function useSignUp() {

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

  return {
     loading,
     error,
    register,
    handleSubmit,
    submitForm,
    errors,
    emailAvailabilityStatus,
    emailOnBlurHandler
  }
}
