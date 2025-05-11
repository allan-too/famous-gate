import React from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  className = '',
}) => {
  return (
    <Card className={`${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <div className="mt-1 flex items-center">
              {change.isPositive ? (
                <svg className="w-4 h-4 text-success-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4.686l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L12 11.686V7z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-danger-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 13a1 1 0 10-2 0v-4.686l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L12 8.314V13z" clipRule="evenodd" />
                </svg>
              )}
              <span className={`text-sm ${change.isPositive ? 'text-success-500' : 'text-danger-500'} ml-1`}>
                {Math.abs(change.value)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">from last period</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-full bg-primary-50 text-primary-500">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;