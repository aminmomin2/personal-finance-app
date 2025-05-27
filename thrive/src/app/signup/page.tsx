"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

const PASSWORD_REQUIREMENTS = [
  { id: 'length', text: 'At least 8 characters', regex: /.{8,}/ },
  { id: 'uppercase', text: 'At least one uppercase letter', regex: /[A-Z]/ },
  { id: 'lowercase', text: 'At least one lowercase letter', regex: /[a-z]/ },
  { id: 'number', text: 'At least one number', regex: /[0-9]/ },
  { id: 'special', text: 'At least one special character', regex: /[!@#$%^&*(),.?":{}|<>]/ },
]

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

type FormErrors = {
  email?: string
  password?: string
  confirmPassword?: string
}

type TouchedFields = {
  email: boolean
  password: boolean
  confirmPassword: boolean
}

export default function SignUp() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
    confirmPassword: false
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isValid, setIsValid] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const validateEmail = useCallback((email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }, [])

  const validatePassword = useCallback((pass: string): boolean => {
    return PASSWORD_REQUIREMENTS.every(req => req.regex.test(pass))
  }, [])

  const calculatePasswordStrength = useCallback((pass: string): number => {
    let strength = 0
    if (pass.length >= 8) strength++
    if (/[A-Z]/.test(pass)) strength++
    if (/[a-z]/.test(pass)) strength++
    if (/[0-9]/.test(pass)) strength++
    if (/[^A-Za-z0-9]/.test(pass)) strength++
    return strength
  }, [])

  const validateForm = useCallback((data: FormData): FormErrors => {
    const newErrors: FormErrors = {}

    if (!data.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!data.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(data.password)) {
      newErrors.password = 'Password does not meet requirements'
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }, [validateEmail, validatePassword])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
    setError(null) // Clear any previous errors when user types

    // Update password strength when password changes
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
  }, [calculatePasswordStrength])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }, [])

  useEffect(() => {
    const newErrors = validateForm(formData)
    setErrors(newErrors)
    setIsValid(Object.keys(newErrors).length === 0)
  }, [formData, validateForm])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Registration failed")
      }

      router.push("/login?message=registered")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed")
      // Focus the first input field on error
      const firstInput = document.querySelector('input')
      firstInput?.focus()
    } finally {
      setLoading(false)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading && isValid) {
      handleSubmit(e as any)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-light)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-[400px] border-[var(--border-color-light)] shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[var(--color-text-dark)]">Create Account</CardTitle>
          <CardDescription className="text-center text-[var(--color-text-dark)]/80">Sign up to get started with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-[var(--color-text-dark)] select-none">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={handleKeyPress}
                  className={`mt-1.5 w-full border-[var(--border-color-light)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20 ${
                    touched.email && errors.email 
                      ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20' 
                      : ''
                  }`}
                  disabled={loading}
                  autoComplete="email"
                  autoFocus
                />
                {touched.email && errors.email && (
                  <p className="mt-1.5 text-sm text-[var(--color-danger)] select-none">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password" className="text-[var(--color-text-dark)] select-none">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={handleKeyPress}
                  className={`mt-1.5 w-full border-[var(--border-color-light)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20 ${
                    touched.password && errors.password
                      ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20'
                      : ''
                  }`}
                  disabled={loading}
                  autoComplete="new-password"
                />
                <div className="mt-3 space-y-2">
                  {PASSWORD_REQUIREMENTS.map((req) => (
                    <div key={req.id} className="flex items-center gap-2 text-sm select-none">
                      <div 
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          req.regex.test(formData.password) 
                            ? 'bg-[var(--color-success)]' 
                            : 'bg-[var(--color-text-dark)]/20'
                        }`} 
                      />
                      <span className={req.regex.test(formData.password) ? 'text-[var(--color-success)]' : 'text-[var(--color-text-dark)]/60'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-[var(--color-text-dark)] select-none">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="Confirm your password" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={handleKeyPress}
                  className={`mt-1.5 w-full border-[var(--border-color-light)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20 ${
                    touched.confirmPassword && errors.confirmPassword
                      ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20'
                      : ''
                  }`}
                  disabled={loading}
                  autoComplete="new-password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1.5 text-sm text-[var(--color-danger)] select-none">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            {error && (
              <div className="text-[var(--color-danger)] text-sm text-center bg-[var(--color-danger-light)] p-2 rounded-md select-none">
                {error}
              </div>
            )}
            <Button 
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] cursor-pointer transition-colors duration-200" 
              disabled={loading || !isValid}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--border-color-light)]" />
            <span className="text-sm text-[var(--color-text-dark)]/40 select-none">or</span>
            <div className="flex-1 h-px bg-[var(--border-color-light)]" />
          </div>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 border-[var(--border-color-light)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] cursor-pointer transition-all duration-200"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            Sign up with Google
          </Button>
          <p className="text-sm text-center text-[var(--color-text-dark)]/60 select-none">
            Already have an account?{" "}
            <a href="/login" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium cursor-pointer transition-colors duration-200">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
} 