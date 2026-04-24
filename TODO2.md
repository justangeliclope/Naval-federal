# Payment Amount Validation Plan

## Information Gathered:
- Payment form: src/pages/CreditCardDashboard.tsx
- State: paymentAmount (string), selectedAccount ('checking' or 'savings')
- Balances: checking $124,056.78, high-yield savings $601,634.52 (hardcoded in SelectItem)
- Current button onClick: destructive toast error, reset state

## Plan:
1. Define accountBalances = { checking: 124056.78, savings: 601634.52 }
2. Get balance = accountBalances[selectedAccount]
3. On confirm: 
   - if (!paymentAmount || parseFloat(paymentAmount) > balance) => toast destructive error
   - else toast success, reset state
4. Disable button if invalid

## Dependent Files: None

## Followup steps:
1. Read src/pages/CreditCardDashboard.tsx (already have from recent)
2. [x] Create TODO2.md (done)
3. [x] Edit file per plan
4. [x] Test with `npm run build` (success)
5. [x] Update TODO2.md
6. [x] Task complete

Confirm plan?

