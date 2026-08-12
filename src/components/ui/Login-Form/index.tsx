'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { Form } from 'radix-ui/form';
import { useState } from 'react';

export function LoginForm() {
    const navigate = useRouter();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            email: '',
            password: '',
        };

        if (!password.trim() || !user.trim()) {
            newErrors.password = 'Preencha usuário e senha.';
        }

        setErrors(newErrors);

        if (newErrors.email || newErrors.password) {
            return;
        }

        navigate.push('/dashboard');
    };

    return (
        <div className="w-full h-full max-w-sm space-y-6 flex flex-col justify-center">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-wide">GEO STUDY</h1>
                <p className="text-sm text-muted-foreground uppercase">Sistema Geográfico</p>
            </div>
            <Form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="email">Usuário</Label>

                    <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Digite seu usuário"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />

                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                {errors.password && (
                    <p className="text-sm text-red-500 text-center">
                        {errors.password}
                    </p>
                )}

                <Button type="submit" className="w-full h-11">
                    Entrar
                </Button>
            </Form>
        </div>
    );
}
