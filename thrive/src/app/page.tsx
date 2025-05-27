import Link from 'next/link';
import Image from 'next/image';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { BarChart2, CreditCard, Shield, ArrowRight, CheckCircle2, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 sticky top-0 bg-[var(--color-bg-light)]/80 backdrop-blur-sm z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Thrive Logo" width={40} height={40} />
            <span className="text-2xl font-mono font-bold text-[var(--color-text-dark)]">Thrive</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors">
              Login
            </Link>
            <Button variant="default" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-sm font-medium mb-4">
              🚀 The Future of Personal Finance
            </div>
            <h1 className="text-5xl font-bold text-[var(--color-text-dark)] leading-tight">
              Take Control of Your <span className="text-[var(--color-primary)]">Financial Future</span>
            </h1>
            <p className="text-xl text-[var(--color-text-dark)]/80">
              Track your net worth, monitor spending, and make smarter financial decisions with Thrive's powerful personal finance tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-dark)]/60">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[var(--color-primary-light)]" />
                ))}
              </div>
              <p>Join 10,000+ users already using Thrive</p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -inset-4 bg-[var(--color-primary-light)] rounded-3xl transform rotate-3"></div>
            <Card className="border-[var(--border-color-light)] shadow-sm relative">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-[var(--hover-color-light)] rounded w-1/3"></div>
                    <div className="h-8 bg-[var(--hover-color-light)] rounded w-1/4"></div>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-light)]/50 rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-[var(--hover-color-light)] rounded-lg"></div>
                    <div className="h-24 bg-[var(--hover-color-light)] rounded-lg"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-text-dark)] mb-4">
            Why Choose Thrive?
          </h2>
          <p className="text-[var(--color-text-dark)]/80">
            Everything you need to manage your finances in one place
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-[var(--border-color-light)] hover:border-[var(--color-primary)] transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <CardTitle className="text-[var(--color-text-dark)]">Track Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[var(--color-text-dark)]/80">
                Monitor your assets and liabilities in real-time with beautiful visualizations.
              </CardDescription>
              <ul className="mt-4 space-y-2">
                {['Real-time updates', 'Historical tracking', 'Custom categories'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[var(--color-text-dark)]/80">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[var(--border-color-light)] hover:border-[var(--color-primary)] transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <CardTitle className="text-[var(--color-text-dark)]">Smart Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[var(--color-text-dark)]/80">
                Get insights into your spending habits and make better financial decisions.
              </CardDescription>
              <ul className="mt-4 space-y-2">
                {['Spending analytics', 'Budget tracking', 'Smart notifications'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[var(--color-text-dark)]/80">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[var(--border-color-light)] hover:border-[var(--color-primary)] transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <CardTitle className="text-[var(--color-text-dark)]">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[var(--color-text-dark)]/80">
                Your financial data is encrypted and protected with enterprise-grade security.
              </CardDescription>
              <ul className="mt-4 space-y-2">
                {['Bank-level security', 'Data encryption', 'Regular backups'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[var(--color-text-dark)]/80">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-text-dark)] mb-4">
            Loved by Users
          </h2>
          <p className="text-[var(--color-text-dark)]/80">
            See what our users have to say about their experience with Thrive
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Small Business Owner",
              content: "Thrive has completely transformed how I manage my business finances. The insights are invaluable.",
              rating: 5
            },
            {
              name: "Michael Chen",
              role: "Software Engineer",
              content: "Finally, a finance app that's both powerful and easy to use. The net worth tracking is fantastic.",
              rating: 5
            },
            {
              name: "Emily Rodriguez",
              role: "Financial Advisor",
              content: "I recommend Thrive to all my clients. It's the perfect tool for personal finance management.",
              rating: 5
            }
          ].map((testimonial) => (
            <Card key={testimonial.name} className="border-[var(--border-color-light)]">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                  ))}
                </div>
                <p className="text-[var(--color-text-dark)]/80 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-medium text-[var(--color-text-dark)]">{testimonial.name}</p>
                  <p className="text-sm text-[var(--color-text-dark)]/60">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-[var(--color-primary)] text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already managing their money smarter with Thrive. Start your free trial today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="group" asChild>
                <Link href="/signup">
                  Start Your Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-[var(--border-color-light)]">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Thrive Logo" width={32} height={32} />
              <span className="text-xl font-mono text-[var(--color-text-dark)]">Thrive</span>
            </div>
            <p className="text-[var(--color-text-dark)]/60 text-sm">
              The smart way to manage your personal finances.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[var(--color-text-dark)]">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[var(--color-text-dark)]/60 hover:text-[var(--color-primary)]">Features</Link></li>
              <li><Link href="#" className="text-[var(--color-text-dark)]/60 hover:text-[var(--color-primary)]">Pricing</Link></li>
              <li><Link href="#" className="text-[var(--color-text-dark)]/60 hover:text-[var(--color-primary)]">Security</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[var(--color-text-dark)]">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[var(--color-text-dark)]/60 hover:text-[var(--color-primary)]">About</Link></li>
              <li><Link href="#" className="text-[var(--color-text-dark)]/60 hover:text-[var(--color-primary)]">Blog</Link></li>
              <li><Link href="#" className="text-[var(--color-text-dark)]/60 hover:text-[var(--color-primary)]">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[var(--color-text-dark)]">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[var(--color-text-dark)]/60 hover:text-[var(--color-primary)]">Privacy</Link></li>
              <li><Link href="#" className="text-[var(--color-text-dark)]/60 hover:text-[var(--color-primary)]">Terms</Link></li>
              <li><Link href="#" className="text-[var(--color-text-dark)]/60 hover:text-[var(--color-primary)]">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-[var(--color-text-dark)]/60">
          © {new Date().getFullYear()} Thrive. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
