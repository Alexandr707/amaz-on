import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { IEmailPassword } from '@/store/user/user.interface';
import { FC, PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';

import Heading from '@ui/Heading';
import Meta from '@ui/Meta';
import Button from '@ui/button/Button';

const Auth: FC<PropsWithChildren<unknown>> = () => {
  const { isLoading } = useAuth();

  const { login, register } = useActions();

  const [type, setType] = useState<'login' | 'register'>('login');

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmailPassword>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IEmailPassword> = data => {
    if (type === 'login') login(data);
    else register(data);

    reset();
  };

  return (
    <Meta title='Auth'>
      <Heading className='capitalize'>{type}</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          {...formRegister('email', {
            required: 'Email is required',
            pattern: {
              value: validEmail,
              message: 'Please enter valid email address',
            },
          })}
          placeholder='Email'
          error={errors.email?.message}
        />

        <Field
          {...formRegister('password', {
            required: 'Email is required',
            minLength: {
              value: 6,
              message: 'min length should more 6 symbols',
            },
          })}
          placeholder='Password'
          error={errors.password?.message}
        />
      </form>
      <Button variant='white'>let's go!</Button>
    </Meta>
  );
};

export default Auth;
