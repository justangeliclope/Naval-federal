# EmailJS Troubleshooting Checklist

## Code Fixes Applied ✅
- [x] EmailJS v2 API: `emailjs.send(serviceId, templateId, {to_email})`
- [x] Global init with useEffect([publicKey])
- [x] .env created with VITE_EMAILJS_PUBLIC_KEY=uOpRj841uYYONwbECfA_a
- [x] Error handling with unknown → Error casting + status/text logging
- [x] Fixed 422 "recipients empty" by using to_email param

## To Send Emails (User Action Required) 🔧
1. **Get Credentials** (EmailJS dashboard):
   ```
   Service ID: e.g. service_abc123
   Template ID: e.g. template_def456
   ```
2. **Configure Template**:
   - Add {{to_email}} field
   - Map to 'to_email' param
3. **Update .env**:
   ```
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_def456
   ```
4. **Restart dev server**: Ctrl+C → `npm run dev`
5. **Test**:
   - Visit CreditCardDashboard → Make Payment → Insufficient Funds
   - Check console/network → 200 OK
Check Majluciasmith.97@gmail.com inbox

## Common Remaining Issues
| Issue | Symptom | Fix |
|-------|---------|-----|
| 422 recipients empty | Network error | Template {{to_email}} field |
| 403 forbidden | Console 403 | Public key invalid/unverified |
| No send | 'env vars missing' | .env + restart |
| CORS | Browser block | EmailJS CDN ok |

**Status**: Code ready. User configure EmailJS dashboard + .env → emails send.

Run `npm run dev` and test payment → check console!

