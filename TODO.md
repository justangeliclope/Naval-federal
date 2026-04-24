# Login Logic Fix — TODO

## Plan
1. [x] Create TODO.md (this file)
2. [x] Fix `src/contexts/AuthContext-fixed.tsx`
   - [x] Refactor duplicated localStorage init logic into a single helper
   - [x] Fix `logout()`: remove `setRestrictionReason(null)` so restriction reason persists
   - [x] Fix `unlock()`: reset `loginCount` to 0 and remove from localStorage
   - [x] Fix `resetRestriction()`: reset `loginCount` to 0 and remove from localStorage
3. [x] Verify no edits needed in DashboardLogin.tsx, LoginRestricted.tsx, CreditCardDashboard.tsx
4. [x] Build and test

