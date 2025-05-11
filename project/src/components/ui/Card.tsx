import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
  cardHeaderClassName?: string;
  cardBodyClassName?: string;
  cardFooterClassName?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  footer,
  className = '',
  cardHeaderClassName = '',
  cardBodyClassName = '',
  cardFooterClassName = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-card overflow-hidden ${className}`}>
      {title && (
        <div className={`px-6 py-4 border-b border-gray-200 ${cardHeaderClassName}`}>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className={`px-6 py-4 ${cardBodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className={`px-6 py-4 border-t border-gray-200 ${cardFooterClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;