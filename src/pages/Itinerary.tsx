import React from 'react';
import { Plus, Train, Hotel, Ship, PartyPopper, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const Itinerary: React.FC = () => {
    const { data: blocks, isLoading } = useQuery({
        queryKey: ['itinerary'],
        queryFn: async () => {
            const { data } = await api.get('/itinerary');
            return data;
        },
    });

    const days = ['2026-07-10', '2026-07-11', '2026-07-12'];

    if (isLoading) return <div className="p-8 text-center text-brand-gold animate-pulse">Cargando plan...</div>;

    return (
        <div className="p-6 space-y-8 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-elegant text-gray-800">Itinerario</h2>
                    <p className="text-xs text-brand-gold uppercase font-bold tracking-widest">Fin de semana inolvidable</p>
                </div>
                <button className="w-12 h-12 bg-brand-fuchsia text-white rounded-2xl shadow-lg shadow-brand-fuchsia/30">
                    <Plus />
                </button>
            </div>

            <div className="space-y-10">
                {days.map((day, idx) => (
                    <DaySection
                        key={day}
                        dayStr={day}
                        label={['Viernes', 'Sábado', 'Domingo'][idx]}
                        blocks={blocks?.filter((b: any) => b.day.startsWith(day))}
                    />
                ))}
            </div>
        </div>
    );
};

const DaySection = ({ dayStr, label, blocks }: { dayStr: string, label: string, blocks?: any[] }) => {
    return (
        <div className="space-y-4 relative">
            <div className="flex items-center gap-4">
                <div className="bg-brand-gold text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    {label}
                </div>
                <div className="h-px flex-1 bg-brand-gold/20"></div>
                <span className="text-[10px] text-gray-400 font-medium">{dayStr}</span>
            </div>

            <div className="space-y-4 ml-2 border-l-2 border-dashed border-brand-gold/20 pl-6 py-2">
                {blocks && blocks.length > 0 ? (
                    blocks.map((block) => (
                        <div key={block.id} className="bg-white rounded-2xl p-4 shadow-sm border border-brand-gold/10 relative group">
                            <div className="absolute -left-[35px] top-4 w-4 h-4 rounded-full bg-brand-gold border-4 border-brand-gold-light"></div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] bg-brand-pink text-brand-fuchsia px-2 py-0.5 rounded-md font-bold">{block.slot}</span>
                                <span className="text-xs font-bold text-gray-400">{block.est_cost > 0 ? `${block.est_cost}€` : 'Gratis'}</span>
                            </div>
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                {getIcon(block.title)}
                                {block.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">{block.description}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-xs text-gray-400 italic">Nada planeado todavía...</div>
                )}
            </div>
        </div>
    );
};

const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('tren') || t.includes('viaje')) return <Train size={16} className="text-brand-fuchsia" />;
    if (t.includes('hotel') || t.includes('alojamiento') || t.includes('check')) return <Hotel size={16} className="text-brand-gold" />;
    if (t.includes('barco') || t.includes('boat')) return <Ship size={16} className="text-brand-fuchsia" />;
    if (t.includes('cena') || t.includes('copas') || t.includes('fiesta')) return <PartyPopper size={16} className="text-brand-gold" />;
    return <MapPin size={16} className="text-gray-300" />;
};

export default Itinerary;
