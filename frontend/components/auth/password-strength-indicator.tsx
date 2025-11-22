export type PasswordStrength = 'weak' | 'medium' | 'strong';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
}

export function PasswordStrengthIndicator({ strength }: PasswordStrengthIndicatorProps) {
  return (
    <div className="space-y-1">
      <div className="flex gap-1 h-1">
        <div
          className={`flex-1 rounded-full transition-colors ${
            strength === 'weak'
              ? 'bg-red-500'
              : strength === 'medium'
              ? 'bg-yellow-500'
              : 'bg-green-500'
          }`}
        />
        <div
          className={`flex-1 rounded-full transition-colors ${
            strength === 'medium'
              ? 'bg-yellow-500'
              : strength === 'strong'
              ? 'bg-green-500'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        />
        <div
          className={`flex-1 rounded-full transition-colors ${
            strength === 'strong'
              ? 'bg-green-500'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        />
      </div>
      <p
        className={`text-xs font-medium ${
          strength === 'weak'
            ? 'text-red-500'
            : strength === 'medium'
            ? 'text-yellow-500'
            : 'text-green-500'
        }`}
      >
        Password strength: {strength.charAt(0).toUpperCase() + strength.slice(1)}
      </p>
    </div>
  );
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) return 'weak';
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Character type checks
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  
  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
}
