import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import ClientDashboard from './pages/ClientDashboard';
import WorkshopDashboard from './pages/WorkshopDashboard';
import Analysis from './pages/Analysis';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="client" element={<ClientDashboard />} />
          <Route path="workshop" element={<WorkshopDashboard />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
