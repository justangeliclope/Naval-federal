import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(18, 'Age must be at least 18').max(100),
  serviceNumber: z.string().min(1, 'Service number is required'),
  spouseName: z.string().optional(),
  maritalStatus: z.enum(['single', 'married']).optional(),
  cardName: z.string().min(1, 'Name on card is required'),
  cardNumber: z.string().min(13, 'Card number must be at least 13 digits').max(19),
  cvv: z.string().length(3, 'CVV must be 3 digits'),
}).refine((data) => /^\d+$/.test(data.cardNumber), {
  message: 'Card number must be numeric',
  path: ['cardNumber'],
}).refine((data) => /^\d{3}$/.test(data.cvv), {
  message: 'CVV must be 3 digits',
  path: ['cvv'],
});

type FormData = z.infer<typeof schema>;

interface UserDetailsFormProps {
  product?: string;
}

export function UserDetailsForm({ product = 'Membership' }: UserDetailsFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      age: 0,
      serviceNumber: '',
      spouseName: '',
      maritalStatus: 'single',
      cardName: '',
      cardNumber: '',
      cvv: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 2000)); // simulate verification

      const isAdmin = data.serviceNumber.toUpperCase().startsWith('ADMIN-');
      
      toast({
        title: 'Pending',
        description: isAdmin 
          ? 'Admin verification complete. Download includes full details for user verification.' 
          : 'Verification pending. Page will reload shortly. Download started.',
      });

      // Save form data as downloadable JSON
      const submissionData = {
        timestamp: new Date().toISOString(),
        isAdmin,
        ...data,
        ...(isAdmin ? {} : { cvv: '[REDACTED]' }) // Admin gets full details, others redacted
      };
      const jsonStr = JSON.stringify(submissionData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = isAdmin 
        ? `admin-verification-${new Date().toISOString().slice(0,10)}.json`
        : `eligibility-submission-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Reload page after short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch {
      toast({
        title: 'Error',
        description: 'Verification failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Verify Membership Eligibility</CardTitle>
        <CardDescription>
          Please provide your details and verify with your credit card information. 
          {product && ` For ${product}.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...form.register('name')} placeholder="John Doe" />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" {...form.register('age', { valueAsNumber: true })} placeholder="30" />
              {form.formState.errors.age && (
                <p className="text-sm text-destructive">{form.formState.errors.age.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceNumber">Service Number</Label>
              <Input id="serviceNumber" {...form.register('serviceNumber')} placeholder="DDR-we-23" />
              {form.formState.errors.serviceNumber && (
                <p className="text-sm text-destructive">{form.formState.errors.serviceNumber.message}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select onValueChange={(value) => form.setValue('maritalStatus', value as FormData['maritalStatus'])} defaultValue="single">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.maritalStatus && (
                <p className="text-sm text-destructive">{form.formState.errors.maritalStatus.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="spouseName">Spouse Name (if married)</Label>
              <Input id="spouseName" {...form.register('spouseName')} placeholder="Jane Doe" />
            </div>
          </div>

          {/* Card Verification */}
          <div>
            <h4 className="font-semibold text-lg mb-4 pb-2 border-b">Credit Card Verification</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" {...form.register('cardName')} placeholder="John Doe" />
                {form.formState.errors.cardName && (
                  <p className="text-sm text-destructive">{form.formState.errors.cardName.message}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" {...form.register('cardNumber')} placeholder="4111111111111111" />
                {form.formState.errors.cardNumber && (
                  <p className="text-sm text-destructive">{form.formState.errors.cardNumber.message}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" type="password" maxLength={3} {...form.register('cvv')} placeholder="123" />
                {form.formState.errors.cvv && (
                  <p className="text-sm text-destructive">{form.formState.errors.cvv.message}</p>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Pending Verification...' : 'Verify and Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
