import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useError } from '@/contexts/ErrorContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

const schema = z.object({
  serviceNumber: z.string().min(1, 'Service number is required'),
});

type FormData = z.infer<typeof schema>;

interface EligibilityFormProps {
  product: string;
}

export function EligibilityForm({ product }: EligibilityFormProps) {
  const { showError } = useError();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceNumber: '',
    },
  });

const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    
    if (data.serviceNumber === 'CCN-25-015') {
      if (isMobile) {
        showError("not eligible to redeployed personnel");
      } else {
        showError("Not Eligible");
      }
    } else {
      showError("not found");
    }
    
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Check Eligibility</CardTitle>
        <CardDescription>Enter your service number to check eligibility for {product}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceNumber">Service Number</Label>
            <Input
              id="serviceNumber"
              {...form.register('serviceNumber')}
              placeholder="DDR-we-23"
            />
            {form.formState.errors.serviceNumber && (
              <p className="text-sm text-destructive">
                {form.formState.errors.serviceNumber.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full min-h-[44px]" disabled={loading}>
            {loading ? 'Checking...' : 'Check Eligibility'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

