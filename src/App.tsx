import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { CheckingSavings } from '@/pages/CheckingSavings';
import { CreditCards } from '@/pages/CreditCards';
import { AutoLoans } from '@/pages/AutoLoans';
import { Membership } from '@/pages/Membership';
import { About } from '@/pages/About';
import Contact from '@/pages/Contact';
import PaymentHistory from '@/pages/PaymentHistory';
import TransferRestricted from '@/pages/TransferRestricted';
import LoginRestricted from '@/pages/LoginRestricted';
import CreditCardDashboard from '@/pages/CreditCardDashboard';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import { Toaster } from '@/components/ui/toaster';
import { ErrorProvider } from '@/contexts/ErrorContext';
import NotFound from '@/pages/NotFound';

import { AuthProvider } from '@/contexts/AuthContext-fixed';

function AppContent() {
  const isSpecialBg = false;
  
  return (
    <ErrorProvider>
      <AuthProvider>
        <div className={`min-h-screen flex flex-col ${isSpecialBg ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gray-50'}`}>
          <Navbar />


        <div className={`pb-24 flex-1`}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/checking-savings" element={<CheckingSavings />} />
            <Route path="/credit-cards" element={<CreditCards />} />

            <Route path="/auto-loans" element={<AutoLoans />} />
            <Route path="/membership" element={<Membership />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<CreditCardDashboard />} />

            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/transfer-restricted" element={<TransferRestricted />} />
            <Route path="/login-restricted" element={<LoginRestricted />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
          <Footer />
        </div>
      </AuthProvider>
    </ErrorProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

