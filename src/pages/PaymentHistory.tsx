
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TableTimeline } from '@/components/ui/TableTimeline';

import { TRANSACTIONS } from '../data/transactions';

export default function PaymentHistory() {


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 pb-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Payment History
          </CardTitle>

          <p className="text-muted-foreground text-sm">Complete transaction history across all accounts</p>

        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6 pb-8 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Complete Transaction History</h4>
                <p className="text-xs text-muted-foreground">Across all accounts (24 months)</p>
              </div>
              <button
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8," 
                    + TRANSACTIONS.map(t => `"${t.date}","${t.description}","$${t.amount.toFixed(2)}"`).join("\\n");
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", `navy-federal-transaction-history-${new Date().toISOString().split('T')[0]}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
toast.success("Download complete! CSV saved to downloads.");


                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Download CSV
              </button>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="backdrop-blur-xl bg-gradient-to-b from-black/20 to-transparent rounded-3xl border border-cyan-500/30 shadow-2xl"
            >
              <TableTimeline transactions={TRANSACTIONS} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
