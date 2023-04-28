'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
function Input({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: InputProps) {
  return (
    <div className='relative w-full '>
      {formatPrice && (
        <BiDollar size={24} className='absolute text-neutral-700 top-5 lef-2' />
      )}
      <input
        type='text'
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=''
        className={`peer w-full p-4 pt-6 font-light bg-white rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? 'pl-9' : 'pl-4'
        } ${errors[id] ? ' border-rose-500' : ' border-neutral-300'} ${
          errors[id] ? '  focus:border-rose-500' : ' focus:border-black'
        }`}
      />
    </div>
  );
}
export default Input;
