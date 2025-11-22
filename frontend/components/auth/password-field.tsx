import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordTooltip } from './password-tooltip';
import { PasswordStrengthIndicator, PasswordStrength, calculatePasswordStrength } from './password-strength-indicator';

export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long',
  },
  validate: {
    hasUpperCase: (value: string) =>
      /[A-Z]/.test(value) || 'Password must contain at least 1 uppercase letter',
    hasLowerCase: (value: string) =>
      /[a-z]/.test(value) || 'Password must contain at least 1 lowercase letter',
    hasNumber: (value: string) =>
      /\d/.test(value) || 'Password must contain at least 1 number',
    hasSpecialChar: (value: string) =>
      /[@$!%*?&]/.test(value) || 'Password must contain at least 1 special character (@$!%*?&)',
  },
};

interface PasswordFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: FieldErrors;
  showTooltip?: boolean;
  showStrength?: boolean;
  passwordValue?: string;
  passwordStrength?: PasswordStrength;
  onPasswordChange?: (strength: PasswordStrength) => void;
  id?: string;
  validation?: RegisterOptions;
}

export function PasswordField({
  register,
  errors,
  showTooltip = false,
  showStrength = false,
  passwordValue,
  passwordStrength,
  onPasswordChange,
  id = 'password',
  validation = { required: 'Password is required' },
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>Password</Label>
        {showTooltip && <PasswordTooltip />}
      </div>
      <Input
        id={id}
        type="password"
        {...register('password', {
          ...validation,
          onChange: onPasswordChange
            ? (e) => {
                onPasswordChange(calculatePasswordStrength(e.target.value));
              }
            : undefined,
        })}
      />
      
      {showStrength && passwordValue && passwordStrength && (
        <PasswordStrengthIndicator strength={passwordStrength} />
      )}
      
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password?.message as string}</p>
      )}
    </div>
  );
}
