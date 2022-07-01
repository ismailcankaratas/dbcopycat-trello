import { LockClosedIcon } from '@heroicons/react/solid'
import axios from 'axios';
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { getError } from '../utils/helpers';

export default function RegisterScreen() {
  const { handleSubmit, register, getValues, formState: { errors }, } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name, email, password
      })
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      })
      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error))
    }
  }
  return (
    <Layout title="Hesap oluştur">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
              alt="Trello"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Hesap oluştur</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Yada{' '}
              <Link href="/login">
                <a className="font-medium text-blue-600 hover:text-blue-500">
                  Giriş yap
                </a>
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitHandler)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Ad soyad
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'Lütfen ad soyad giriniz',
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Ad soyad"
                />
                {errors.name && (
                  <div className='text-red-500'>{errors.name.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  {...register('email', {
                    required: "Email adres giriniz giriniz.", pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Lütfen geçerli bir e-posta girin',
                    },
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email && (
                  <div className='text-red-500'>{errors.email.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Şifre
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: "Lütfen şifre giriniz.", minLength: { value: 6, message: 'Şifre 5 karakterden uzun olmalı' },
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Şifre"
                />
                {errors.password && (
                  <div className='text-red-500'>{errors.password.message}</div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Şifre tekrar
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Lütfen şifreyi onaylayın',
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 6,
                      message: 'Şifre onay 5 karakterden uzun olmalı',
                    },
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Şifre tekrar"
                />
                {errors.confirmPassword && (
                  <div className='text-red-500'>{errors.confirmPassword.message}</div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div >
    </Layout >
  )
}
