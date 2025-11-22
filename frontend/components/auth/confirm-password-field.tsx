import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ConfirmPasswordFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: FieldErrors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: (name: string) => any;
  id?: string;
}

export function ConfirmPasswordField({ register, errors, getValues, id = 'confirmPassword' }: ConfirmPasswordFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Confirm Password</Label>
      <Input
        id={id}
        type="password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) =>
            value === getValues('password') || 'Passwords do not match',
        })}
      />
      {errors.confirmPassword && (
        <p className="text-sm text-red-500">
          {errors.confirmPassword?.message as string}
        </p>
      )}
    </div>
  );
}
