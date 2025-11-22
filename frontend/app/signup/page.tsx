'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import {
  AuthLayout,
  EmailField,
  PasswordField,
  ConfirmPasswordField,
  FormFooter,
  passwordValidation,
  type PasswordStrength,
} from '@/components/auth';

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const registerMutation = useMutation({
    mutationFn: api.register,
    onSuccess: () => {
      toast.success('Registration successful!', {
        description: 'Redirecting to login page...',
      });
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error('Registration failed', {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information to create your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <EmailField register={register} errors={errors} />
          
          <PasswordField
            register={register}
            errors={errors}
            showTooltip
            showStrength
            passwordValue={password}
            passwordStrength={passwordStrength}
            onPasswordChange={setPasswordStrength}
            validation={passwordValidation}
          />
          
          <ConfirmPasswordField
            register={register}
            errors={errors}
            getValues={getValues}
          />
        </div>

        <FormFooter
          isLoading={registerMutation.isPending}
          submitText="Sign Up"
          loadingText="Creating account..."
          redirectText="Already have an account?"
          redirectLink="/login"
          redirectLinkText="Log in"
        />
      </form>
    </AuthLayout>
  );
}
