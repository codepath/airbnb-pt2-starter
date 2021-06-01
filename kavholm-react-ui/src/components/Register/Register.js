import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, Input, InputField } from "components"
import apiClient from "services/apiClient"
import HERO_BG from "assets/HERO_BG.png"
import "./Register.css"

export default function Register({ user, setUser }) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConfirm: "",
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

    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    const { data, error } = await apiClient.signupUser({
      email: form.email,
      username: form.username,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    })
    if (error) setErrors((e) => ({ ...e, form: error }))
    if (data) {
      setUser(data.user)
      apiClient.setToken(data.token)
      localStorage.setItem("kavholm_token", data.token)
    }

    setIsProcessing(false)
  }

  return (
    <div className="Register">
      <div className="splash-image" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div className="container">
          <Card className="register-card">
            <h2>Create An Account</h2>

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

              <InputField name="username" label="Username" error={errors.username}>
                <Input
                  type="text"
                  name="username"
                  placeholder="your_username"
                  value={form.username}
                  handleOnChange={handleOnChange}
                />
              </InputField>

              <div className="row gap-10">
                <InputField name="firstName" label="First Name" error={errors.firstName} className="flex-1">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="Jane"
                    value={form.firstName}
                    handleOnChange={handleOnChange}
                  />
                </InputField>

                <InputField name="lastName" label="Last Name" error={errors.lastName} className="flex-1">
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    handleOnChange={handleOnChange}
                  />
                </InputField>
              </div>

              <InputField name="password" label="Password" error={errors.password}>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={form.password}
                  handleOnChange={handleOnChange}
                />
              </InputField>

              <InputField name="passwordConfirm" label="Confirm Password" error={errors.passwordConfirm}>
                <Input
                  type="password"
                  name="passwordConfirm"
                  placeholder="confirm password"
                  value={form.passwordConfirm}
                  handleOnChange={handleOnChange}
                />
              </InputField>

              <p className="to-login">
                Have an account? Login <Link to="/login">here.</Link>
              </p>

              <Button isLoading={isProcessing} disabled={isProcessing} onClick={handleOnSubmit}>
                Sign Up
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
