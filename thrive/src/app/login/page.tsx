"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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

type FormData = {
  email: string
  password: string
}

type FormErrors = {
  email?: string
  password?: string
}

type TouchedFields = {
  email: boolean
  password: boolean
}

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isValid, setIsValid] = useState(false)

  // Handle redirect messages
  useEffect(() => {
    const message = searchParams.get('message')
    if (message === 'registered') {
      setError('Registration successful! Please sign in.')
    } else if (message === 'unauthorized') {
      setError('Please sign in to access this page.')
    }
  }, [searchParams])

  const validateEmail = useCallback((email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
    }

    return newErrors
  }, [validateEmail])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
    setError(null) // Clear any previous errors when user types
  }, [])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const newErrors = validateForm(formData)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    try {
      // First, verify credentials with our API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to login")
      }

      // If API verification succeeds, sign in with NextAuth
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      // Redirect to dashboard on success
      router.push("/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed")
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
          <CardTitle className="text-2xl font-bold text-center text-[var(--color-text-dark)]">Welcome Back</CardTitle>
          <CardDescription className="text-center text-[var(--color-text-dark)]/80">Sign in to your account</CardDescription>
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
                  autoComplete="current-password"
                />
                {touched.password && errors.password && (
                  <p className="mt-1.5 text-sm text-[var(--color-danger)] select-none">{errors.password}</p>
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
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
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
            Sign in with Google
          </Button>
          <p className="text-sm text-center text-[var(--color-text-dark)]/60 select-none">
            Don't have an account?{" "}
            <a href="/signup" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium cursor-pointer transition-colors duration-200">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}