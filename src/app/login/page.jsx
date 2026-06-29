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
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const { email, password } = data;

    const { data: res, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
    });

    if (error) {
      //   toast.error(error.message);
      toast(error.message);
      return;
    }

    if (res) {
      //   toast.success("Login Successful");
      toast('Login Successful ');

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

  return (
    <div className="min-h-screen  from-indigo-100 via-white to-sky-100 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border border-white/40 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8">
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
          <TextField isRequired>
            <Label className="mb-1 font-medium text-gray-700">
              Email Address
            </Label>

            <Input
              type="email"
              placeholder="Enter your email"
              radius="lg"
              size="lg"
              className="w-full"
              {...register('email', {
                required: 'Email is required',
              })}
            />

            <FieldError className="text-red-500 text-sm">
              {errors.email?.message}
            </FieldError>
          </TextField>

          <TextField isRequired>
            <Label className="mb-1 font-medium text-gray-700">Password</Label>

            <Input
              type="password"
              placeholder="Enter your password"
              radius="lg"
              size="lg"
              className="w-full"
              {...register('password', {
                required: 'Password is required',
              })}
            />

            <Description className="text-xs text-gray-500 mt-1">
              Enter your secure password
            </Description>

            <FieldError className="text-red-500 text-sm">
              {errors.password?.message}
            </FieldError>
          </TextField>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 text-base font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
          >
            <Check />
            Login
          </Button>

          <p className="text-sm text-gray-500 text-center">
            Do not have an account?{' '}
            <Link
              href="/register"
              className="text-indigo-600 font-semibold hover:underline hover:text-red-500"
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
          onClick={handleGoogleLogin}
          variant="bordered"
          className="w-full rounded-xl py-6 border-2 hover:bg-indigo-600 hover:text-blue-500 transition-all duration-300 text-base font-medium flex items-center justify-center gap-3"
        >
          <GrGoogle className="text-lg" />
          Continue with Google
        </Button>
      </Card>
    </div>
  );
}
