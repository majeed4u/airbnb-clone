'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModals';
import Modal from './Modal';
import Heading from './Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
function RegisterModal() {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/register', data)
      .then(() => registerModal.onClose())
      .catch((error) => toast.error('something went wrong', error))
      .finally(() => setIsLoading(false));
  };

  const bodyContent: any = (
    <div className='flex flex-col gap-4 '>
      <Heading title='Welcome to airbnb' subtitle='Create an account!' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
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
        onClick={() => {}}
      />
      <Button
        outline
        label=' Continue with Github '
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className='mt-4 font-light text-center text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2 '>
          <div>Already have an Account</div>
          <div
            className='cursor-pointer text-neutral-800 hover:underline'
            onClick={registerModal.onClose}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
export default RegisterModal;
