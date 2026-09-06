import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Input from '@/components/forms/Input/Input'
import useLogin from '@/hooks/useLogin'

export default function Login() {
  const location = useLocation()
  const { msg, loading, error, register, handleSubmit, errors, submitForm } = useLogin()
  const redirectMessage = (location.state as { message?: string } | null)?.message

  return (
    <Container className="py-5" style={{ maxWidth: 420 , marginBottom:"100px"}}>
      <h1 className="mb-4">Login</h1>

      {redirectMessage && (
        <Alert variant="warning" className="d-flex align-items-center gap-2 mb-3">
          <span>⚠️</span>
          <span>{redirectMessage}</span>
        </Alert>
      )}

      {msg === 'success register' && (
        <Alert variant="success" className="d-flex align-items-center gap-2 mb-3">
          <span>✅</span>
          <span>Registration completed successfully! You can now log in.</span>
        </Alert>
      )}

      <Form onSubmit={handleSubmit(submitForm)}>
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
