import cn from 'clsx';
import { forwardRef } from 'react';

import { IField } from './field.interface';

const Field = forwardRef<HTMLInputElement, IField>(
  (
    { placeholder, Icon, error, className, type = 'text', style, ...rest },
    ref,
  ) => {
    return (
      <div className={cn('', className)} style={style}>
        <label>
          <span>
            {!!Icon && <Icon className='mr-3' />}
            {placeholder}
          </span>
          <input ref={ref} type={type} {...rest} />
        </label>
        {!!error && <div className='text-red mt-1'>{error}</div>}
      </div>
    );
  },
);

export default Field;
