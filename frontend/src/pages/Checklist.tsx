import React from 'react';
import { ListChecks, CheckCircle2, Circle, User } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const Checklist: React.FC = () => {
    const queryClient = useQueryClient();
    const deviceUuid = localStorage.getItem('deviceUuid') || 'guest-123';

    const { data: items, isLoading } = useQuery({
        queryKey: ['checklist'],
        queryFn: async () => {
            const { data } = await api.get('/checklist');
            return data;
        }
    });

    const toggleMutation = useMutation({
        mutationFn: ({ id, is_done }: { id: number, is_done: boolean }) =>
            api.put(`/checklist/${id}`, { is_done, device_uuid: deviceUuid }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['checklist'] }),
    });

    if (isLoading) return <div className="p-8 text-center text-brand-gold animate-pulse">Cargando tareas...</div>;

    return (
        <div className="p-6 space-y-8 pb-20">
            <div className="space-y-2">
                <h2 className="text-3xl font-elegant text-gray-800">Checklist</h2>
                <p className="text-xs text-brand-gold uppercase font-bold tracking-widest">Lo que no puede faltar</p>
            </div>

            <div className="space-y-6">
                {['global', 'Friday', 'Saturday', 'Sunday'].map((scope) => {
                    const scopeItems = items?.filter((i: any) => i.scope === scope);
                    if (!scopeItems || scopeItems.length === 0) return null;

                    return (
                        <section key={scope} className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">
                                {scope === 'global' ? 'General' : scope}
                            </h3>
                            <div className="space-y-2">
                                {scopeItems.map((item: any) => (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleMutation.mutate({ id: item.id, is_done: !item.is_done })}
                                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${item.is_done ? 'bg-gray-50 border-transparent opacity-60' : 'bg-white border-brand-gold/10 shadow-sm'
                                            }`}
                                    >
                                        {item.is_done ? (
                                            <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                                        ) : (
                                            <Circle className="text-brand-gold/30 shrink-0" size={24} />
                                        )}
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${item.is_done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                                {item.title}
                                            </p>
                                            {item.is_done && item.done_by && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <User size={10} className="text-gray-400" />
                                                    <span className="text-[10px] text-gray-400">Hecho por {item.done_by}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            <div className="fixed bottom-24 right-6 uppercase text-[10px] bg-white border border-brand-gold/20 px-4 py-2 rounded-full shadow-lg font-bold text-brand-gold">
                + Añadir Tarea
            </div>
        </div>
    );
};

export default Checklist;
