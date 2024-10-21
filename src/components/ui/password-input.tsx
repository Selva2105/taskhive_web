import { Eye, EyeOff, Lock } from 'lucide-react';
import React, { useState } from 'react';

import type { InputProps } from '@/components/ui/input';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface PasswordInputProps extends InputProps {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Lock className="size-5 text-gray-400" />
        </div>
        <Input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn('block w-full pl-10 pr-10 sm:text-sm', className)}
          placeholder="••••••••"
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-500 focus:text-gray-500 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
