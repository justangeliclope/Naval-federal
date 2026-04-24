import type { Transaction } from '../types/transaction';

export const TRANSACTIONS: Transaction[] = [
  // March 2026 - Recent credits
  { id: 'RhTD44GjuD1', date: '2026-03-31', description: 'US Army Payroll - Base $5,000 + Deployment $4,000 + Bonus $3,000', amount: 12000.00, type: 'credit' },
  { id: 'K9mP73vL8xQ2', date: '2026-03-15', description: 'Military Payroll Mid-month', amount: 3800.00, type: 'credit' },

  // February 2026
  { id: 'B3zX5cV8nM2p5', date: '2026-02-28', description: 'US Army Payroll - Base $4,500 + Hazard Pay $6,500', amount: 11000.00, type: 'credit' },
  { id: 'L6kJ9hG4fD1s6', date: '2026-02-14', description: 'Military Mid-month Pay', amount: 3700.00, type: 'credit' },

  // January 2026 - Major bonuses
  { id: 'F1sD4fG7hJ3k9', date: '2026-01-31', description: 'US Army Payroll End-month + Promotion', amount: 10500.00, type: 'credit' },
  { id: 'H5tY8uI2oP6a0', date: '2025-09-01', description: 'Reenlistment Bonus Phase 1 (4-year) + Retention', amount: 62000.00, type: 'credit' },
  { id: 'J9kM3nQ6vB8c1', date: '2026-01-15', description: 'Tax Adjustment Refund Q4 2025', amount: 6200.00, type: 'credit' },

  // December 2025
  { id: 'R7uT1vW4xZ6a3', date: '2025-12-31', description: 'Year-end Payroll + Holiday Bonus', amount: 5200.00, type: 'credit' },
  { id: 'S3yB6nM9pQ2d4', date: '2025-12-20', description: 'Prior Service Reenlistment Bonus + Special Pay', amount: 18000.00, type: 'credit' },
  { id: 'T8eF1jK5oU7g5', date: '2025-07-31', description: 'Pet Home Expenses', amount: 3200.00, type: 'debit' }, // Recent 2025 debit

  // November 2025
  { id: 'V2hL6rX9cZ4f6', date: '2025-11-30', description: 'US Army Payroll + Deployment Pay', amount: 3500.00, type: 'credit' },
  { id: 'W5iN8tA2dF7g7', date: '2025-07-30', description: 'Car Insurance $3,500 ', amount: 3500.00, type: 'debit' }, // Recent 2025 debit

  // October 2025
  { id: 'X1kP4uY7eH3j8', date: '2025-10-31', description: 'Military Payroll', amount: 3950.00, type: 'credit' },

// Redeployment Credit Sep 1st 2025
  { id: 'REDEP1', date: '2025-09-01', description: 'Redeployment Credit', amount: 50000.00, type: 'credit' },

  // August 2025 Debits
  { id: 'CarIns1-Aug', date: '2025-08-29', description: 'Car Insurance Premium', amount: 2000.00, type: 'debit' },
  { id: 'DEBIT-AUG1', date: '2025-08-31', description: 'Mortgage Payment', amount: 2500.00, type: 'debit' },
  { id: 'DEBIT-AUG2', date: '2025-08-25', description: 'Car Loan Payment', amount: 650.00, type: 'debit' },
  { id: 'DEBIT-AUG3', date: '2025-08-20', description: 'Utilities Bill', amount: 450.00, type: 'debit' },
  { id: 'DEBIT-AUG4', date: '2025-08-15', description: 'Insurance Premium', amount: 1200.00, type: 'debit' },
  { id: 'DEBIT-AUG5', date: '2025-08-10', description: 'Groceries & Household', amount: 800.00, type: 'debit' },
  { id: 'DEBIT-AUG6', date: '2025-08-05', description: 'Credit Card Payment', amount: 320.00, type: 'debit' },
  { id: 'PetAug1', date: '2025-08-30', description: 'Pet Home Expenses', amount: 3200.00, type: 'debit' },
  { id: 'PetAug1', date: '2025-08-28', description: 'Pet Home Expenses', amount: 3200.00, type: 'debit' },

  // July 2025 Debits (end of month)
  { id: 'CarIns1-Jul', date: '2025-07-31', description: 'Car Insurance Premium', amount: 2000.00, type: 'debit' },
  { id: 'PetJul1', date: '2025-07-30', description: 'Pet Home Expenses', amount: 3200.00, type: 'debit' },
  { id: 'DEBIT-JUL1', date: '2025-07-28', description: 'Rent/Mortgage', amount: 2600.00, type: 'debit' },
  { id: 'DEBIT-JUL2', date: '2025-07-26', description: 'Auto Insurance', amount: 180.00, type: 'debit' },
  { id: 'DEBIT-JUL3', date: '2025-07-25', description: 'Phone & Internet', amount: 220.00, type: 'debit' },
  { id: 'DEBIT-JUL4', date: '2025-07-27', description: 'Gas & Maintenance', amount: 150.00, type: 'debit' },
  { id: 'DEBIT-JUL5', date: '2025-07-29', description: 'Streaming Services', amount: 75.00, type: 'debit' },

  // June 2025
  { id: 'D7eZ1bN5oV8w4', date: '2025-06-30', description: 'Military Pay End-month', amount: 3800.00, type: 'credit' },

  // May 2025
  { id: 'E2fA4cP8rX1y5', date: '2025-05-31', description: 'Payroll + Overtime', amount: 4200.00, type: 'credit' },

  // April 2025
  { id: 'F5gB7dQ2sZ4a6', date: '2025-04-30', description: 'US Army Payroll', amount: 3750.00, type: 'credit' },

  // March 2025
  { id: 'G9hC1eT5uB8d7', date: '2025-03-31', description: 'Investment Dividend - Defense Stocks', amount: 8500.00, type: 'credit' },

  // February 2025
  { id: 'H3iD6fV9wE2g8', date: '2025-02-28', description: 'Payroll', amount: 3900.00, type: 'credit' },

  // January 2025
  { id: 'I7jE9gY2xH5j9', date: '2025-01-20', description: '2024 Tax Refund - Military Deductions', amount: 11200.00, type: 'credit' },

  // 2024 debits moved to Jul-Aug 2025
  // Dec 2024
  { id: 'J2kF4hA6zJ8k0', date: '2024-12-31', description: 'Year-end Bonus + Payroll', amount: 6800.00, type: 'credit' },
  { id: 'TxF2nK8pR5yM3', date: '2025-08-28', description: 'Mortgage Payment Auto-debit', amount: 2850.50, type: 'debit' },

  // Nov 2024
  { id: 'K5lG8iC9mL3l1', date: '2024-11-30', description: 'Payroll', amount: 3850.00, type: 'credit' },

  // Oct 2024
  { id: 'L1mH2kF5nO6m2', date: '2024-10-31', description: 'Military Pay', amount: 3950.00, type: 'credit' },
  { id: 'Y6mQ9vB2gK5l9', date: '2025-08-27', description: 'Home Equity Line Payment', amount: 950.00, type: 'debit' },

  // Sep 2024
  { id: 'M4nI7pR9qS2n3', date: '2024-09-30', description: 'Payroll + Promotion Bonus $5k', amount: 8500.00, type: 'credit' },
  { id: 'Light1', date: '2025-08-26', description: 'Lightbill', amount: 150.00, type: 'debit' },

  // Aug 2024
  { id: 'N8oJ1tU4vW6o4', date: '2024-08-31', description: 'Payroll', amount: 3800.00, type: 'credit' },
  { id: 'CarW1', date: '2025-08-25', description: 'Car Wash Service', amount: 45.00, type: 'debit' },

  // Jul 2024
  { id: 'O2pK5yZ9aB7p5', date: '2024-07-31', description: 'Military Payroll', amount: 3850.00, type: 'credit' },
  { id: 'Phone1', date: '2025-07-29', description: 'Phone Bill', amount: 120.00, type: 'debit' },

  // Jun 2024
  { id: 'P6qL9bC3dE1q6', date: '2024-06-30', description: 'Payroll', amount: 3750.00, type: 'credit' },
  { id: 'V7qW4rE9tY6u4', date: '2025-08-24', description: 'Utilities + Insurance Bundle', amount: 450.75, type: 'debit' },

  // May 2024
  { id: 'Q1rM4eG7fH9r7', date: '2024-05-31', description: 'US Army Pay', amount: 3900.00, type: 'credit' },
  { id: 'P8mN2bT5yU3i7', date: '2025-08-23', description: 'Car Loan Payment', amount: 650.00, type: 'debit' },

  // Apr 2024
  { id: 'R5sN8iJ2kL4s8', date: '2024-04-30', description: 'Payroll', amount: 3800.00, type: 'credit' },
  { id: 'Q4rE7wQ9oA2l8', date: '2025-08-22', description: 'Home Maintenance Fund Transfer', amount: 1200.00, type: 'debit' },

  // Mar 2024
  { id: 'S9tO3mP6nQ2t9', date: '2024-03-31', description: 'Military Payroll', amount: 3850.00, type: 'credit' },

  // Feb 2024
  { id: 'T4uP7qS1vX5u0', date: '2024-02-29', description: 'Payroll', amount: 3750.00, type: 'credit' },

  // Jan 2024
  { id: 'U8vQ2rW6yZ3v1', date: '2024-01-31', description: 'US Army Payroll Base + Initial Bonus', amount: 6500.00, type: 'credit' },
  { id: 'V1wR5tA9bC7w2', date: '2025-08-21', description: 'Initial Setup Expenses - Relocation', amount: 4200.00, type: 'debit' },
  { id: 'N2pR5tY9uE4w2', date: '2025-08-20', description: 'Investment - S&P 500 ETF Purchase', amount: 15000.00, type: 'debit' },
  { id: 'B1tU5yH9kR7s2', date: '2025-08-19', description: 'Home Down Payment Contribution', amount: 25000.00, type: 'debit' }
];

 // All debit transactions have been moved to dates between end July and end August 2025.
 // Sorted by date DESC.

