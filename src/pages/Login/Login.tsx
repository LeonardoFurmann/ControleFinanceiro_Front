import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Error from '../../components/Helper/Error'
import { Link } from 'react-router-dom'
import { validate } from '../../utils/validate'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

type Props = {}

const Login = (props: Props) => {

    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const emailCheck = validate('email', email);
        const passwordCheck = validate('password', password);

        const newErrors: typeof errors = {};

        if (!emailCheck.valid) newErrors.email = emailCheck.message;
        if (!passwordCheck.valid) newErrors.password = passwordCheck.message;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const result = await login(email, password);

        if (!result.success) {
            setErrors({ general: result.message });
            return;
        }

        navigate('/dashboard');
    }

    return (
        <section className='h-screen bg-background flex'>
            <div className='bg-card shadow-lg w-full max-w-md m-auto rounded-xl'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-3 py-3 lg:px-8">
                    <div className="flex items-center justify-center">
                        <img src="/pig.png" alt="Pig" className="h-44 w-44" />
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="" onSubmit={handleSubmit} className="space-y-4">
                            <Input name='email' type='email' placeholder='Email' value={email} onChange={({ target }) => setEmail(target.value)} />
                            {errors.email && <Error error={errors.email} />}
                            <Input name='password' type='password' placeholder='Senha' max={8} value={password} onChange={({ target }) => setPassword(target.value)} />
                            {errors.password && <Error error={errors.password} />}
                            <div>
                                <Button text='Entrar' type='submit' className='focus-visible:outline-mint-500  bg-mint-500 px-3 py-3 text-white 
                            disabled:bg-gray-300 text-md font-semibold ' />
                            </div>
                            {errors.general && <Error error={errors.general} />}
                        </form>
                    </div>
                    <div className="my-6 border-t border-gray-300" />
                    <div className="mt-6">
                        <Button text='Entrar com Google' className='justify-center gap-2 bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
                            <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
                        </Button>
                    </div>
                    <p className="mt-5 mb-2 text-center text-sm text-text">
                        Ainda não tem uma conta?{' '}
                        <Link to="/register" className="font-semibold text-mint-500 hover:text-mint-700">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login