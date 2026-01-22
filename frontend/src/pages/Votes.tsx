import React from 'react';
import { BarChart2, Star, ThumbsUp } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const Votes: React.FC = () => {
    const queryClient = useQueryClient();
    const deviceUuid = localStorage.getItem('deviceUuid') || 'guest-123'; // Emulating for now

    const { data: votes } = useQuery({
        queryKey: ['votes'],
        queryFn: async () => {
            const { data } = await api.get('/votes');
            return data;
        }
    });

    // Mocked options for now
    const options = [
        { id: 1, type: 'accommodation', name: 'Apartamento Ruzafa Glam', votes: votes?.find((v: any) => v.item_id === 1 && v.item_type === 'accommodation')?.count || 0 },
        { id: 2, type: 'accommodation', name: 'Penthouse Cabanyal Beach', votes: votes?.find((v: any) => v.item_id === 2 && v.item_type === 'accommodation')?.count || 0 },
    ];

    const voteMutation = useMutation({
        mutationFn: (voteData: any) => api.post('/votes', voteData),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['votes'] }),
    });

    return (
        <div className="p-6 space-y-8 pb-20">
            <div className="space-y-2">
                <h2 className="text-3xl font-elegant text-gray-800">Votaciones</h2>
                <p className="text-xs text-brand-gold uppercase font-bold tracking-widest">Decidiendo el mejor plan</p>
            </div>

            <section className="space-y-4">
                <h3 className="font-elegant text-xl text-brand-fuchsia border-b border-brand-fuchsia/10 pb-2">Alojamiento</h3>
                <div className="space-y-3">
                    {options.map((opt) => (
                        <div key={opt.id} className="bg-white rounded-2xl p-4 border border-brand-gold/10 shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800">{opt.name}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={12} className="text-brand-gold fill-brand-gold" />
                                    <span className="text-xs text-brand-gold font-bold">{opt.votes} votos</span>
                                </div>
                            </div>
                            <button
                                onClick={() => voteMutation.mutate({
                                    device_uuid: deviceUuid,
                                    display_name: 'Invitada',
                                    item_type: opt.type,
                                    item_id: opt.id
                                })}
                                className="bg-brand-pink text-brand-fuchsia p-3 rounded-xl active:bg-brand-fuchsia active:text-white"
                            >
                                <ThumbsUp size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Placeholder for results */}
            <div className="bg-brand-gold/5 rounded-3xl p-6 text-center space-y-3 border border-brand-gold/10">
                <BarChart2 className="mx-auto text-brand-gold" size={32} />
                <h4 className="font-elegant text-lg">Plan Ganador</h4>
                <p className="text-sm text-gray-500 italic">Los resultados finales se fijarán el 1 de junio.</p>
            </div>
        </div>
    );
};

export default Votes;
