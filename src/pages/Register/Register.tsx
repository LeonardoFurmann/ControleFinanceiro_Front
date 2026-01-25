import React, { useState } from 'react'
import Button from '../../components/Button/ButtonComponent.tsx'
import Input from '../../components/Input/Input'
import Error from '../../components/Helper/Error'
import { validate } from '../../utils/validate'
import { useNavigate } from 'react-router-dom';
import { useApiRequest } from "../../hooks/useApiResquest";
import { authAPI } from '../../services/api.ts'

type Props = {}

const Register = (props: Props) => {

    const navigate = useNavigate();
    const { execute } = useApiRequest();
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string; confirmPassword?: string; general?: string }>({});

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const emailCheck = validate('email', email);
        const passwordCheck = validate('password', password);
        const confirmPasswordCheck = validate('password', confirmPassword);

        const newErrors: typeof errors = {};
        
        if (!emailCheck.valid) newErrors.email = emailCheck.message;
        if (!passwordCheck.valid) newErrors.password = passwordCheck.message;
        if (!confirmPasswordCheck.valid) newErrors.confirmPassword = confirmPasswordCheck.message;
        
        if (password != confirmPassword) {
            newErrors.confirmPassword = "Os campos de senha precisam ser iguais."
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const user = {name, email, password}

        const result = await execute(() => authAPI.register(user));

        if (!result.success) {
            setErrors({ general: result.message });
            return;
        }

        navigate('/');

    }

    return (
        <section className='h-screen bg-background flex'>
            <div className='bg-card shadow-lg w-full max-w-md m-auto rounded-xl'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-3 py-3 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="" onSubmit={handleSubmit} className="space-y-4">
                            <h1 className='text-3xl py-6 font-semibold text-center' >Cadastre-se</h1>
                            <Input name='nome' type='nome' placeholder='Nome' value={name} max={50} onChange={({ target }) => setName(target.value)} />
                            {errors.name && <Error error={errors.name} />}
                            <Input name='email' type='email' placeholder='Email' value={email} onChange={({ target }) => setEmail(target.value)} />
                            {errors.email && <Error error={errors.email} />}
                            <Input name='password' type='password' placeholder='Senha' max={8} value={password} onChange={({ target }) => setPassword(target.value)} />
                            {errors.password && <Error error={errors.password} />}
                            <Input name='confirmPassword' type='password' placeholder='Confirmar senha' max={8} value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} />
                            {errors.confirmPassword && <Error error={errors.confirmPassword} />}
                            <div className='mt-10'>
                                <Button text='Cadastrar' type='submit' className='focus-visible:outline-mint-500  bg-mint-500 px-3 py-3 text-white 
                            disabled:bg-gray-300 text-md font-semibold ' />
                            </div>
                            {errors.general && <Error error={errors.general} />}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register