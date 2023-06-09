'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from './Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModals';
import { useRouter } from 'next/navigation';
function LoginModal() {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success('Logged in successful');
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent: any = (
    <div className='flex flex-col gap-4 '>
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <Input
        type='text'
        id='email'
        label='Email'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        type='password'
        id='password'
        label='Password'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
    </div>
  );
  const footerContent: any = (
    <div className='flex flex-col gap-4 mt-3 '>
      <Button
        outline
        label=' Continue with Google '
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label=' Continue with Github '
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='mt-4 font-light text-center text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2 '>
          <div>You do not have an account </div>
          <div
            className='cursor-pointer text-neutral-800 hover:underline'
            onClick={loginModal.onClose}
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
export default LoginModal;
