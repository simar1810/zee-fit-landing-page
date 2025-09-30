import { motion } from 'motion/react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface JoinNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinNowModal({ isOpen, onClose }: JoinNowModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Welcome to the Zeefit movement! 🎉');
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({ name: '', phone: '', email: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 bg-white/95 backdrop-blur-md shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-3xl mb-2 zeefit-gradient-text">
            Join Now
          </DialogTitle>
          <p className="text-gray-600">
            Ready to transform your fitness journey with our community?
          </p>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <Label htmlFor="name" className="text-gray-700">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="border-gray-300 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300"
              required
            />
          </motion.div>

          {/* Phone Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="phone" className="text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="border-gray-300 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300"
              required
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-2"
          >
            <Label htmlFor="email" className="text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="border-gray-300 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white py-3 rounded-full transition-all duration-300 hover:scale-105 zeefit-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Join the Movement 🚀'
              )}
            </Button>
          </motion.div>

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs text-gray-500 text-center"
          >
            By joining, you agree to be part of India's first community fitness movement. 
            We respect your privacy and will never spam you.
          </motion.p>
        </motion.form>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-green-400/20 to-orange-400/20 rounded-full blur-xl" />
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-orange-400/20 to-green-400/20 rounded-full blur-xl" />
      </DialogContent>
    </Dialog>
  );
}