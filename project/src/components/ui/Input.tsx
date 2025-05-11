import React, { forwardRef } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  label,
  error,
  size = 'md',
  icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseClasses = 'block w-full border rounded-md focus:ring-2 focus:ring-offset-0 focus:outline-none';
  
  const sizeClasses = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-sm',
    lg: 'py-3 text-base',
  };

  const paddingClasses = icon
    ? iconPosition === 'left'
      ? 'pl-10 pr-3'
      : 'pl-3 pr-10'
    : 'px-3';

  const stateClasses = error
    ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500 text-danger-900 placeholder-danger-300'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0' : 'right-0'} flex items-center ${iconPosition === 'left' ? 'pl-3' : 'pr-3'} pointer-events-none`}>
            <span className="text-gray-500">{icon}</span>
          </div>
        )}
        <input
          ref={ref}
          className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${paddingClasses}
            ${stateClasses}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;