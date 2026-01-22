import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './components/MainLayout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import Votes from './pages/Votes';
import Checklist from './pages/Checklist';

// Temporary placeholder pages
const BudgetP: React.FC = () => <div className="p-4"><h2>Presupuesto y Bote</h2></div>;

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const groupId = localStorage.getItem('groupId');
  if (!groupId) return <Navigate to="/join" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/join" element={<Landing />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="itinerario" element={<Itinerary />} />
            <Route path="votos" element={<Votes />} />
            <Route path="presupuesto" element={<BudgetP />} />
            <Route path="checklist" element={<Checklist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
