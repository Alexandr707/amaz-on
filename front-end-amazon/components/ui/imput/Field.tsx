import cn from 'clsx';
import { forwardRef } from 'react';

import { IField } from './field.interface';

const Field = forwardRef<HTMLInputElement, IField>(
  (
    { placeholder, Icon, error, className, type = 'text', style, ...rest },
    ref,
  ) => {
    return (
      <div className={cn('mb-4', className)} style={style}>
        <label>
          <span className='mb-1 block'>
            {!!Icon && <Icon className='mr-3' />}
            {placeholder}
          </span>
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={cn(
              'px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all rounded-lg focus:shadow-sm shadow-primary placeholder:font-grey',
              {
                'border-red': !!error,
              },
            )}
            {...rest}
          />
        </label>
        {!!error && <div className='text-red mt-1 text-sm'>{error}</div>}
      </div>
    );
  },
);

export default Field;
