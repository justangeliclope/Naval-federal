 # TODO: Update Login Restriction for Redeployed Personnel

## Steps:
1. [x] Update `src/contexts/AuthContext-fixed.tsx` — change login return type to distinguish restriction from failure
2. [x] Update `src/pages/DashboardLogin.tsx` — handle new return type, skip "Invalid" toast when restricted
3. [x] Update `src/pages/LoginRestricted.tsx` — update message for successful restriction reason
4. [x] Build & verify — TypeScript compiles without errors

