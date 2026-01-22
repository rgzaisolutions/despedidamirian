import React, { useState } from 'react';
import { Share2, Camera, Wallet, Users, Calendar } from 'lucide-react';
import api from '../services/api';

const Home: React.FC = () => {
    const [photo, setPhoto] = useState<string | null>(localStorage.getItem('miriamPhoto'));
    const groupName = localStorage.getItem('groupName') || 'Bride Squad Valencia';
    const groupCode = localStorage.getItem('groupId') || 'VSQ-XXXX';

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            setPhoto(base64);
            localStorage.setItem('miriamPhoto', base64);

            try {
                await api.post('/media/upload', { photo: base64 });
            } catch (err) {
                console.error('Error uploading photo to backend', err);
            }
        };
        reader.readAsDataURL(file);
    };

    const sharePlan = () => {
        const text = `¡Apúntate a la despedida de Miriam en Valencia! 👰‍♀️✨\n\nCódigo: ${groupCode}\nPIN: ${localStorage.getItem('groupPin')}\n\nÚnete aquí: ${window.location.origin}/join`;

        if (navigator.share) {
            navigator.share({
                title: groupName,
                text: text,
                url: `${window.location.origin}/join?code=${groupCode}`,
            });
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        }
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Hero Section */}
            <div className="relative h-72 bg-brand-pink overflow-hidden">
                {photo ? (
                    <img src={photo} alt="Miriam" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-brand-gold/10 border-b border-brand-gold/20">
                        <label className="cursor-pointer flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-brand-fuchsia shadow-md">
                                <Camera size={28} />
                            </div>
                            <span className="text-sm font-medium text-brand-fuchsia">Sube la foto de Miriam</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                        </label>
                    </div>
                )}

                {/* Overlay info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h2 className="text-white text-3xl font-elegant leading-tight">Valencia 2026</h2>
                    <p className="text-brand-gold-light text-sm font-medium tracking-widest uppercase">Bride Squad • 10-12 Jul</p>
                </div>
            </div>

            {/* Quick Access KPIs */}
            <div className="px-6 grid grid-cols-2 gap-4">
                <KPICard icon={<Wallet className="text-brand-gold" />} label="Presupuesto" value="~300€" color="bg-green-50" />
                <KPICard icon={<Users className="text-brand-fuchsia" />} label="Participantes" value="13" color="bg-pink-50" />
            </div>

            {/* Main Info */}
            <div className="px-6 space-y-4">
                <section className="bg-white rounded-2xl p-6 border border-brand-gold/20 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">El Plan Actual</h3>
                            <p className="text-xs text-gray-400">Todo listo para el 10 de Julio</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-xl">
                            <span className="text-gray-500">Alojamiento</span>
                            <span className="font-bold text-brand-fuchsia">Votando...</span>
                        </div>
                        <div className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-xl">
                            <span className="text-gray-500">Evento Estrella</span>
                            <span className="font-bold text-brand-gold">Boat Party</span>
                        </div>
                    </div>

                    <button
                        onClick={sharePlan}
                        className="w-full flex items-center justify-center gap-2 bg-brand-fuchsia text-white rounded-xl py-3 font-bold shadow-lg shadow-brand-fuchsia/20"
                    >
                        <Share2 size={18} />
                        INVITAR AL ESCUADRÓN
                    </button>
                </section>
            </div>

            {/* Code Display */}
            <div className="px-6 text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">CÓDIGO DE GRUPO: <span className="text-brand-gold">{groupCode}</span></p>
            </div>
        </div>
    );
};

const KPICard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
    <div className={`p-4 rounded-2xl border border-brand-gold/10 shadow-sm flex flex-col gap-2 ${color}`}>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            {icon}
        </div>
        <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{label}</p>
            <p className="text-lg font-elegant text-gray-800">{value}</p>
        </div>
    </div>
);

export default Home;
