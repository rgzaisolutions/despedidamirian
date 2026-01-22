import React, { useState } from 'react';
import api from '../services/api';
import { Sparkles } from 'lucide-react';

const Landing: React.FC = () => {
    const [code, setCode] = useState('');
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/groups/join', { code, pin });
            localStorage.setItem('groupId', data.group.code);
            localStorage.setItem('groupPin', pin);
            localStorage.setItem('groupName', data.group.name);
            window.location.href = '/';
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error al unirse al grupo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-gold-light p-6 flex flex-col items-center justify-center bg-glam-pattern">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-brand-gold/30 p-8 space-y-8">
                <div className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-brand-fuchsia text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <Sparkles size={32} />
                    </div>
                    <h1 className="text-3xl font-elegant text-brand-fuchsia">Bride Squad</h1>
                    <p className="text-brand-gold font-medium uppercase tracking-widest text-xs">Valencia 2026</p>
                </div>

                <form onSubmit={handleJoin} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Código del Grupo</label>
                        <input
                            type="text"
                            placeholder="Ej: VSQ-ABCD"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-fuchsia focus:ring-2 focus:ring-brand-fuchsia/20 outline-none transition-all uppercase"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">PIN de Acceso</label>
                        <input
                            type="password"
                            placeholder="••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-fuchsia focus:ring-2 focus:ring-brand-fuchsia/20 outline-none transition-all"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-fuchsia text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-fuchsia/30 disabled:opacity-50"
                    >
                        {loading ? 'Entrando...' : 'UNIRSE AL SQUAD'}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-xs px-4">
                    Solicita el código y PIN a la organizadora vía WhatsApp.
                </p>
            </div>
        </div>
    );
};

export default Landing;
