import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Calendar, ListChecks, Wallet, BarChart2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-gold-light bg-glam-pattern bg-blend-soft-light flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-gold/20 safe-p-top px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-elegant text-brand-fuchsia tracking-wider">Bride Squad</h1>
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
                    <span className="text-brand-gold font-bold">M</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 safe-p-bottom">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-gold/20 bottom-nav flex justify-around items-center px-2 py-2">
                <NavItem to="/" icon={<Home size={24} />} label="Inicio" />
                <NavItem to="/itinerario" icon={<Calendar size={24} />} label="Plan" />
                <NavItem to="/votos" icon={<BarChart2 size={24} />} label="Votos" />
                <NavItem to="/presupuesto" icon={<Wallet size={24} />} label="Bote" />
                <NavItem to="/checklist" icon={<ListChecks size={24} />} label="Check" />
            </nav>
        </div>
    );
};

interface NavItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }: { isActive: boolean }) =>
                cn(
                    "flex flex-col items-center justify-center gap-1 transition-colors min-w-[64px]",
                    isActive ? "text-brand-fuchsia" : "text-gray-400"
                )
            }
        >
            <div className="relative">
                {icon}
            </div>
            <span className="text-[10px] font-medium uppercase tracking-tighter">{label}</span>
        </NavLink>
    );
};

export default MainLayout;
