import cn from 'clsx';
import { FC, PropsWithChildren } from 'react';

interface IHading {
  className?: string;
}

const Heading: FC<PropsWithChildren<IHading>> = ({ children, className }) => {
  return (
    <h1 className={cn('font-semibold text-3xl', className)}>{children}</h1>
  );
};

export default Heading;
