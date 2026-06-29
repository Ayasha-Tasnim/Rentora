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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { GrGoogle } from 'react-icons/gr';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const { name, email, password, image } = data;

    const { data: res, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      callbackURL: '/',
    });

    if (error) {
      toast(error.message);
      //   toast.error(error.message);
      return;
    }

    if (res) {
      await authClient.signOut();
      toast('Registration Successfull');
      //   toast.success("Registration Successful");
      alert('Registration Successfull');

      router.push('/login');
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
      <Card className="w-full max-w-md border border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4 shadow-md">
            <Check className="text-indigo-600" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Join us and start your journey today
          </p>
        </div>

        <Form
          className="flex w-full flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField isRequired>
            <Label className="mb-1 font-medium text-gray-700">Full Name</Label>

            <Input
              placeholder="Enter your full name"
              radius="lg"
              size="lg"
              {...register('name', {
                required: 'Name is required',
              })}
            />

            <FieldError className="text-red-500 text-sm">
              {errors.name?.message}
            </FieldError>
          </TextField>

          <TextField isRequired>
            <Label className="mb-1 font-medium text-gray-700">Photo URL</Label>

            <Input
              placeholder="https://example.com/photo.jpg"
              radius="lg"
              size="lg"
              {...register('image', {
                required: 'Image URL is required',
              })}
            />

            <FieldError className="text-red-500 text-sm">
              {errors.image?.message}
            </FieldError>
          </TextField>

          <TextField isRequired>
            <Label className="mb-1 font-medium text-gray-700">
              Email Address
            </Label>

            <Input
              type="email"
              placeholder="Enter your email"
              radius="lg"
              size="lg"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
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
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'At least 8 characters required',
                },
                validate: {
                  hasUppercase: value =>
                    /[A-Z]/.test(value) || 'Must contain 1 uppercase letter',

                  hasNumber: value =>
                    /[0-9]/.test(value) || 'Must contain 1 number',
                },
              })}
            />

            <Description className="text-xs text-gray-500 mt-1">
              Password must contain at least 8 characters, 1 uppercase letter
              and 1 number
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
            Register
          </Button>
        </Form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <Button
          onClick={handleGoogleLogin}
          variant="bordered"
          className="w-full rounded-xl py-6 border-2 hover:bg-indigo-600 hover:text-white transition-all duration-300 text-base font-medium flex items-center justify-center gap-3"
        >
          <GrGoogle className="text-lg" />
          Continue with Google
        </Button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
