'use client';

import { authClient } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GrGoogle } from 'react-icons/gr';

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async data => {
    const { email, password } = data;

    const { data: res, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (res) {
      toast.success('Login Successful');

      setTimeout(() => {
        router.push('/');
      }, 400);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  const inputStyle =
    'w-full h-12 px-4 border border-gray-300 rounded-xl bg-white text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-sky-100 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border border-white/40 bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-4 shadow-md">
            <Check className="text-indigo-600" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Login to continue your journey
          </p>
        </div>

        <Form
          className="flex w-full flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            isRequired
            className="w-full flex flex-col items-stretch gap-2"
          >
            <Label className="block w-full text-sm font-medium text-gray-700">
              Email Address
            </Label>

            <Input
              type="email"
              placeholder="Enter your email"
              className={inputStyle}
              {...register('email', {
                required: 'Email is required',

                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            {errors.email && (
              <FieldError className="block text-red-500 text-sm">
                {errors.email.message}
              </FieldError>
            )}
          </TextField>

          <TextField
            isRequired
            className="w-full flex flex-col items-stretch gap-2"
          >
            <Label className="block w-full text-sm font-medium text-gray-700">
              Password
            </Label>

            <Input
              type="password"
              placeholder="Enter your password"
              className={inputStyle}
              {...register('password', {
                required: 'Password is required',
              })}
            />

            <Description className="block text-xs leading-5 text-gray-500">
              Enter your secure password
            </Description>

            {errors.password && (
              <FieldError className="block text-red-500 text-sm">
                {errors.password.message}
              </FieldError>
            )}
          </TextField>

          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-base font-semibold transition-all duration-300 shadow-lg"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            Do not have an account?{' '}
            <Link
              href="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </Form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-300" />

          <span className="text-sm text-gray-500">OR</span>

          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <Button
          type="button"
          onPress={handleGoogleLogin}
          variant="bordered"
          className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white hover:bg-indigo-50 transition-all duration-300 text-base font-medium flex items-center justify-center gap-3"
        >
          <GrGoogle className="text-lg" />
          Continue with Google
        </Button>
      </Card>
    </div>
  );
}
