import { motion } from "framer-motion";
import { ShieldAlert, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import emailjs from '@emailjs/browser';

const TransferRestricted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;

    if (publicKey && serviceId && templateId) {
        emailjs.send(serviceId, templateId, {
to_email: 'Majluciasmith.97@gmail.com',
          message: `Your transfer has been restricted due to our KYC compliance policy. 
We do not accept transfers from your account number because Brass does not 
accept transfers from OPay POS accounts. Please use other supported bank accounts.`
        }, { publicKey }).then(() => {

        console.log('Transfer restriction notification sent successfully');
      }).catch((error) => {
        console.error('Failed to send EmailJS notification:', error);
        console.error('Status:', error.status, 'Text:', error.text);
      });
    } else {
      console.log('EmailJS env vars missing - no email sent');
    }
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="card-surface max-w-md w-full text-center space-y-6 py-12 px-8"
      >
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Transfer Restricted</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Can't initiate transfers to personnel who are not deployed to the US.
            Please contact your unit finance office for further assistance.
          </p>
        </div>

        <div className="pt-2 text-xs text-muted-foreground font-mono uppercase tracking-label">
          Error Code: XFER-DEPLOY-401
        </div>

        <Button
          onClick={() => navigate("/")}
          className="mt-4 w-full font-semibold uppercase tracking-tight"
          variant="destructive"
        >
          <Home className="h-4 w-4 mr-2" />
          Return to Dashboard
        </Button>
      </motion.div>
    </div>
  );
};

export default TransferRestricted;

