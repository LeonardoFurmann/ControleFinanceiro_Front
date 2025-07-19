import React from 'react'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import { Link } from 'react-router-dom'

type Props = {}

const Login = (props: Props) => {
    return (
        <div className='bg-white-100 shadow-lg w-full max-w-md m-auto rounded-xl'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-3 py-3 lg:px-8">
                <div className="flex items-center justify-center">
                    <img src="/pig.png" alt="Pig" className="h-44 w-44" />
                    {/* <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black-700">
                        Sign in to your account
                    </h2> */}
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <Input name={'email'} type={'email'} value={''} placeholder='Email' />
                        <Input name={'password'} type={'password'} value={''} placeholder='Senha' />
                        <div>
                            <Button text='Entrar' className='focus-visible:outline-mint-500  bg-mint-500 px-3 py-3 text-white 
                            disabled:bg-gray-300 text-md font-semibold ' />
                        </div>
                    </form>
                </div>

                <div className="my-6 border-t border-gray-300" />

                <div className="mt-6">
                    <Button text='Entrar com Google' className='justify-center gap-2 bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
                        <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
                    </Button>
                </div>

                <p className="mt-5 mb-2 text-center text-sm text-gray-600">
                    Ainda não tem uma conta?{' '}
                    <Link to="/register" className="font-semibold text-mint-500 hover:text-mint-700">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login