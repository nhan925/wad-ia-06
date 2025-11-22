'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  AuthLayout,
  EmailField,
  PasswordField,
  FormFooter,
} from '@/components/auth';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate login process (mock implementation)
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock success response
      if (data.email && data.password) {
        toast.success('Login successful!', {
          description: `Welcome back, ${data.email}`,
        });
        
        // Simulate redirect after successful login
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        toast.error('Login failed', {
          description: 'Invalid credentials. Please try again.',
        });
      }
    }, 1000);
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <EmailField register={register} errors={errors} />
          
          <PasswordField
            register={register}
            errors={errors}
            validation={{ required: 'Password is required' }}
          />
        </div>

        <FormFooter
          isLoading={isLoading}
          submitText="Log In"
          loadingText="Logging in..."
          redirectText="Don't have an account?"
          redirectLink="/signup"
          redirectLinkText="Sign up"
        />
      </form>
    </AuthLayout>
  );
}
