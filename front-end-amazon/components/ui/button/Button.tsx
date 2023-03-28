import cn from 'clsx';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'orange' | 'white';
  size?:'sm'|'md'|'lg'
}

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  variant,
  size = 'md',
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        'rounded-lg font-bold shadow hover:shadow-lg transition-all duration-300 ease-in-out',
        {
          'text-white bg-primary': variant === 'orange',
          'text-primary bg-white': variant === 'white',
          'px-5 py-1 text-sm': size ==='sm',
          'px-10 py-2 text-md': size ==='md',
          'px-14 py-3 text-lg': size ==='lg',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
