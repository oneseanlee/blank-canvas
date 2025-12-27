import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Landing } from '@/pages/Landing';
import { Auth } from '@/pages/Auth';
import { Dashboard } from '@/pages/Dashboard';
import { NotFound } from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}
