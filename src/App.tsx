import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import ClientDashboard from './pages/ClientDashboard';
import WorkshopDashboard from './pages/WorkshopDashboard';
import Analysis from './pages/Analysis';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import HelpCenter from './pages/HelpCenter';
import Profile from './pages/Profile';
import UserStats from './pages/UserStats';
import { LoginForm } from './components/LoginForm';
import { AuthGate } from './components/AuthGate';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          
          <Route path="login" element={
            <AuthGate requireAuth={false}>
              <LoginForm />
            </AuthGate>
          } />

          <Route path="client" element={
            <AuthGate>
              <ClientDashboard />
            </AuthGate>
          } />
          
          <Route path="workshop" element={
            <AuthGate>
              <WorkshopDashboard />
            </AuthGate>
          } />
          
          <Route path="analysis" element={
            <AuthGate>
              <Analysis />
            </AuthGate>
          } />
          
          <Route path="admin" element={
            <AuthGate>
              <AdminDashboard />
            </AuthGate>
          } />
          
          <Route path="settings" element={
            <AuthGate>
              <Settings />
            </AuthGate>
          } />
          
          <Route path="profile" element={
            <AuthGate>
              <Profile />
            </AuthGate>
          } />
          
          <Route path="help" element={
            <AuthGate>
              <HelpCenter />
            </AuthGate>
          } />
          
          <Route path="stats" element={
            <AuthGate>
              <UserStats />
            </AuthGate>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
