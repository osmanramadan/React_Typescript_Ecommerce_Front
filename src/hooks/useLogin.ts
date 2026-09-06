import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { signInSchema, type signInType } from '@/validation/loginSchema'
import { ActAuthLogin, authClear } from '@/store/auth/authSlice'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams} from 'react-router-dom'


export default function useLogin() {
const [searchParams] = useSearchParams();

  const msg = searchParams.get("msg");
  
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const {loading,error} = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitForm: SubmitHandler<signInType> =async (data) => {
    await dispatch(ActAuthLogin(data)).unwrap().then(_=>nav("/"))
    
  };

   useEffect(() => {
    return () => {
      dispatch(authClear());
    };
  }, [dispatch]);

  return {
    msg,
    loading,
    error,
    register,
    handleSubmit,
    errors,
    submitForm

  }
}
