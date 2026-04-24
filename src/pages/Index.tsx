import { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";


import AccountHeader from "@/components/AccountHeader";
import BalanceCard from "@/components/BalanceCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import type { Transaction } from '../types/transaction';
import { TRANSACTIONS as allTransactions } from '@/data/transactions';

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const BASE_DATA = {
  savings: 220000.75,
  checking: 85000.25,
  moneyMarket: 45000.00,
  certificates: 32500.50,
  ira: 28500.80,
};

const totalLiquidity = Object.values(BASE_DATA).reduce((sum, v) => sum + v, 0);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Index = () => {
  const [isPrivate, setIsPrivate] = useState(false);

  const serviceNumber = "CCN-25-015";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-16">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 space-y-8 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-slate-200/50">
        <AccountHeader
          name="Lucia"
          serviceNumber={serviceNumber || "CCN-25-015"}
          isPrivate={isPrivate}
          onTogglePrivacy={() => setIsPrivate(!isPrivate)}
        />
        <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 space-y-3 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Combined Liquidity</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight font-mono">
            <AnimatedCounter value={totalLiquidity} />
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Last synced: {new Date().toLocaleString()}
          </p>
        </motion.header>
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div variants={item}>
            <BalanceCard 
              label="Savings Account" 
              amount={isPrivate ? 0 : BASE_DATA.savings} 
              subtitle="+2.4% APY" 
              colorScheme="savings" 
            />
          </motion.div>
          <motion.div variants={item}>
            <BalanceCard 
              label="Withdrawable Immediately" 
              amount={isPrivate ? 0 : BASE_DATA.checking} 
              subtitle="Checking · No hold period" 
              colorScheme="checking" 
              showAction 
              actionLabel="Initiate Transfer" 
            />
          </motion.div>
        </motion.div>
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={item}>
            <BalanceCard 
              label="Money Market" 
              amount={isPrivate ? 0 : BASE_DATA.moneyMarket} 
              subtitle="+4.1% APY · $2,500 min" 
              colorScheme="money" 
            />
          </motion.div>
          <motion.div variants={item}>
            <BalanceCard 
              label="Share Certificates" 
              amount={isPrivate ? 0 : BASE_DATA.certificates} 
              subtitle="12-mo term · Matures Aug 2026" 
              colorScheme="certificates" 
            />
          </motion.div>
          <motion.div variants={item}>
            <BalanceCard 
              label="IRA Contributions" 
              amount={isPrivate ? 0 : BASE_DATA.ira} 
              subtitle="Roth IRA · YTD contrib $6,500" 
              colorScheme="ira" 
            />
          </motion.div>
        </motion.div>
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
            <Badge variant="outline" className="text-xs uppercase">Live · 5 newest</Badge>
          </div>
          <Card className="overflow-hidden border-0 shadow-xl">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b-2 border-slate-200">
                  <TableHead className="w-28 font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Description</TableHead>
                  <TableHead className="w-32 font-mono text-right font-semibold text-slate-700">Amount</TableHead>
                  <TableHead className="w-24 font-semibold text-slate-700">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTransactions.slice(0,5).map((tx: Transaction) => (
                  <TableRow key={tx.id} className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/30 border-b border-slate-100 transition-all">
                    <TableCell className="font-mono text-sm font-medium">{formatDate(tx.date)}</TableCell>
<TableCell className="font-medium text-slate-900">
  {tx.description}
  <div className="text-xs text-slate-500 mt-1 font-mono">{tx.id}</div>
</TableCell>
                    <TableCell className="text-right">
  <span className="font-sans font-semibold text-sm text-slate-900 drop-shadow-sm">
                    <span className="font-sans font-semibold text-sm text-slate-900 drop-shadow-sm">
                        {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </span>
                    </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tx.type === 'credit' ? "default" : "destructive"} className="capitalize shadow-sm">
                        {tx.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/50 border-t flex justify-end">
              <Link to="/transaction-ledger" className="no-underline">
                <Button size="sm" className="font-mono uppercase text-xs tracking-wider shadow-sm hover:shadow-md bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8">
                  View Full History →
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;

