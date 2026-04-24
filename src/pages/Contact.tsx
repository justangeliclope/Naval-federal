import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const RECIPIENT_EMAIL = 'NavalFederal@outlook.com';
const SERVICE_ID = 'service_s3p331i';
const TEMPLATE_ID = 'template_cngdev5';
const PUBLIC_KEY = 'BJpYKcL-RkcewwM0d';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      emailjs.init(PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: RECIPIENT_EMAIL,
        to_name: 'Navy Federal Support',
        from_name: formData.name,
        from_email: formData.email,
        subject: `Contact Form: ${formData.subject}`,
        message: formData.message
      });
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll respond within 24 hours."
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Send Failed',
        description: 'Please try again or email us directly.'
      });
      console.error('Contact email error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-navy to-orange bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help. Reach out via email or our contact form.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Mail className="w-8 h-8 text-orange" />
                Email Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-orange/10 rounded-xl">
                <Mail className="w-6 h-6 text-orange" />
                <div>
                  <p className="font-semibold">Primary Contact</p>
                  <a href="mailto:NavalFederal@outlook.com" className="text-lg font-bold hover:text-orange">
                    NavalFederal@outlook.com
                  </a>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Response time: 24-48 hours</p>
                <p>Available: Mon-Fri 8AM-8PM ET</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-blue/10 rounded-xl">
                <Phone className="w-6 h-6 text-blue" />
                <div>
                  <p className="font-semibold">Phone Support</p>
                  <p className="text-sm text-gray-600 italic">Calls are restricted at the moment</p>
                </div>
              </div>
                <div className="flex items-start gap-3 p-4 bg-green/10 rounded-xl">
                <MapPin className="w-6 h-6 text-green mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Mail</p>
                  <p className="text-lg">PO Box 3500<br />Merrifield, VA 22119-3500</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center text-2xl">
              <Send className="w-8 h-8 text-orange" />
              Send Us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-orange to-orange-dark hover:from-orange-dark h-12 text-lg" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
