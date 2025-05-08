'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) {
      setErro('Email ou senha inválidos');
      return;
    }

    const data = await res.json();

    document.cookie = `token=${data.token}; path=/; max-age=3600`;

    router.push('/produtos');
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow-lg rounded-md w-80">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {erro && <p className="text-red-500 text-center">{erro}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full my-2"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2 w-full my-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Entrar</button>
      </form>
    </main>
  );
}