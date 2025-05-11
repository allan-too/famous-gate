import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className = '',
  label,
  error,
  options,
  size = 'md',
  icon,
  ...props
}, ref) => {
  const baseClasses = 'block w-full border rounded-md appearance-none focus:ring-2 focus:ring-offset-0 focus:outline-none';
  
  const sizeClasses = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-sm',
    lg: 'py-3 text-base',
  };

  const paddingClasses = icon ? 'pl-10 pr-10' : 'px-3 pr-10';

  const stateClasses = error
    ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500 text-danger-900'
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
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">{icon}</span>
          </div>
        )}
        <select
          ref={ref}
          className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${paddingClasses}
            ${stateClasses}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;