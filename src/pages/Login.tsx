import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useSearchParams} from 'react-router-dom'
import { signInSchema, type signInType } from '@/validation/loginSchema'
import { ActAuthLogin, authClear } from '@/store/auth/authSlice'
import Input from '@/components/forms/Input/Input'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'




export default function Login() {
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




  return (
    <Container className="py-5" style={{ maxWidth: 420 , marginBottom:"100px"}}>
      <h1 className="mb-4">Login</h1>
        {msg === "success register" && (
               <Alert variant="success" className="d-flex align-items-center gap-2 mb-3">
             <span>✅</span>
            <span>Registration completed successfully! You can now log in.</span>
            </Alert>
               )}

       <Form  onSubmit={handleSubmit(submitForm)}>
            <Input
              name="email"
              label="Email Address"
              register={register}
              error={errors.email?.message}
            />
            <Input
            //  type="password"
              name="password"
              label="Password"
              register={register}
              error={errors.password?.message}
            />
            <Button variant="info" type="submit" style={{backgroundColor:"#0D6EFD",color: "white" }}>
             {loading==="pending"?<Spinner size="sm"></Spinner>:'Submit'}
            </Button>
          </Form>

      <div className="mt-3 text-muted">
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </div>
      <span style={{color:"red"}}>{error?error:''}</span>
    </Container>
  )
}
