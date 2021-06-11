import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, Input, InputField } from "components"
import apiClient from "services/apiClient"
import HERO_BG from "assets/HERO_BG.png"
import "./Login.css"

export default function Login({ user, setUser }) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.username) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const handleOnChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    setIsProcessing(true)

    const { data, error } = await apiClient.loginUser({ email: form.email, password: form.password })
    if (error) setErrors((e) => ({ ...e, form: error }))
    if (data) {
      setUser(data.user)
      apiClient.setToken(data.token)
      localStorage.setItem("kavholm_token", data.token)
    }

    setIsProcessing(false)
  }

  return (
    <div className="Login">
      <div className="splash-image" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div className="container">
          <Card className="login-card">
            <h2>Login</h2>

            {errors?.form && <span className="error">{errors.form}</span>}
            <br />

            <div className="form">
              <InputField name="email" label="Email" error={errors.email}>
                <Input
                  type="email"
                  name="email"
                  placeholder="user@gmail.com"
                  value={form.email}
                  handleOnChange={handleOnChange}
                />
              </InputField>

              <InputField name="password" label="Password" error={errors.password}>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={form.password}
                  handleOnChange={handleOnChange}
                />
              </InputField>

              <p className="to-register">
                Need an account? Sign up <Link to="/register">here.</Link>
              </p>

              <Button isLoading={isProcessing} disabled={isProcessing} onClick={handleOnSubmit}>
                Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
