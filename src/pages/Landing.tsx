import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Leaf, 
  TrendingUp, 
  Shield, 
  Wifi, 
  Bug,
  DollarSign,
  Globe,
  Users,
  Award,
  ChevronRight,
  Smartphone,
  Cloud
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Leaf,
      title: "Smart Crop Prediction",
      description: "AI-powered recommendations based on soil, weather, and market data",
      color: "text-primary"
    },
    {
      icon: Bug,
      title: "Disease Detection",
      description: "Upload photos for instant disease identification and treatment advice",
      color: "text-destructive"
    },
    {
      icon: DollarSign,
      title: "Market Price Tracking",
      description: "Real-time mandi rates and profit forecasting for better decisions",
      color: "text-harvest"
    },
    {
      icon: Wifi,
      title: "Works Offline",
      description: "Access recommendations even without internet connectivity",
      color: "text-sky"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab",
      quote: "KrishiMitra helped me increase my wheat yield by 30% this season!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra",
      quote: "The disease detection feature saved my entire cotton crop from pests.",
      rating: 5
    },
    {
      name: "Mohammed Ali",
      location: "Karnataka",
      quote: "Market price predictions helped me sell at the right time for maximum profit.",
      rating: 5
    }
  ];

  const partners = [
    "Ministry of Agriculture",
    "ICAR",
    "State Agricultural Universities",
    "NABARD"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">KrishiMitra AI</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="lg">
                About
              </Button>
              <Button variant="ghost" size="lg">
                Features
              </Button>
              <Button variant="hero" size="lg" onClick={() => navigate("/login")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            AI-Powered Crop Recommendations for Farmers
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Personalized, multilingual, and science-backed advice for better yield & income.
            Join thousands of farmers already using KrishiMitra AI.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate("/login")}
              className="group"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
            >
              Learn More
            </Button>
          </div>

          {/* Hero Illustration */}
          <div className="relative">
            <div className="bg-gradient-sky rounded-2xl p-8 shadow-glow">
              <div className="flex justify-center items-center gap-8">
                <div className="text-left">
                  <Smartphone className="h-32 w-32 text-sky-foreground mb-4" />
                  <p className="text-sky-foreground font-semibold">Mobile Friendly</p>
                </div>
                <div className="text-center">
                  <Users className="h-40 w-40 text-primary" />
                  <p className="text-primary font-bold text-lg mt-2">Smart Farming</p>
                </div>
                <div className="text-right">
                  <Cloud className="h-32 w-32 text-sky-foreground mb-4" />
                  <p className="text-sky-foreground font-semibold">AI Powered</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Features That Empower Farmers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-medium transition-shadow">
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Farmers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-harvest fill-harvest" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Trusted By
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <Card className="p-6 w-full text-center hover:shadow-medium transition-shadow">
                <Globe className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="font-semibold text-sm">{partner}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Start Your Smart Farming Journey Today
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already increasing their yields and profits with KrishiMitra AI
          </p>
          <Button 
            variant="secondary" 
            size="xl"
            onClick={() => navigate("/login")}
            className="group"
          >
            Get Started for Free
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">KrishiMitra AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 KrishiMitra AI. Empowering farmers with technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;