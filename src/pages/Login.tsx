import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Phone, Globe, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [language, setLanguage] = useState("english");
  const [showOtp, setShowOtp] = useState(false);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिन्दी (Hindi)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" }
  ];

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }
    setShowOtp(true);
    toast({
      title: "OTP Sent",
      description: `OTP sent to +91 ${phone}`,
    });
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Login Successful",
      description: "Welcome to KrishiMitra AI!",
    });
    navigate("/dashboard");
  };

  const handleSignup = () => {
    if (!name || !region || phone.length !== 10) {
      toast({
        title: "Incomplete Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    setShowOtp(true);
    toast({
      title: "OTP Sent",
      description: `OTP sent to +91 ${phone}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Leaf className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold text-primary">KrishiMitra AI</h1>
          </div>
          <p className="text-muted-foreground">Your Smart Farming Companion</p>
        </div>

        {/* Language Selection */}
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-primary" />
              <Label htmlFor="language">Select Language / भाषा चुनें</Label>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Login/Signup Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Farmer!</CardTitle>
            <CardDescription>
              Login or create a new account to access smart farming features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <div>
                  <Label htmlFor="login-phone" className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4" />
                    Mobile Number
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="login-phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="flex-1"
                      disabled={showOtp}
                    />
                    {!showOtp && (
                      <Button onClick={handleSendOtp} variant="secondary">
                        Send OTP
                      </Button>
                    )}
                  </div>
                </div>

                {showOtp && (
                  <div>
                    <Label htmlFor="otp" className="flex items-center gap-2 mb-2">
                      Enter OTP
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                    />
                  </div>
                )}

                <Button 
                  onClick={handleVerifyOtp} 
                  className="w-full" 
                  variant="hero"
                  disabled={!showOtp}
                >
                  Login
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="signup-phone" className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4" />
                    Mobile Number
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="flex-1"
                      disabled={showOtp}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="region">Region/State</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="telangana">Telangana</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="west-bengal">West Bengal</SelectItem>
                      <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="bihar">Bihar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {showOtp && (
                  <div>
                    <Label htmlFor="signup-otp" className="flex items-center gap-2 mb-2">
                      Enter OTP
                    </Label>
                    <Input
                      id="signup-otp"
                      type="text"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                    />
                  </div>
                )}

                <Button 
                  onClick={showOtp ? handleVerifyOtp : handleSignup} 
                  className="w-full" 
                  variant="hero"
                >
                  {showOtp ? "Verify & Sign Up" : "Send OTP"}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </TabsContent>
            </Tabs>

            {/* Farmer illustration text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                📱 Simple mobile login • No email required
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                🌾 Join 50,000+ farmers using KrishiMitra
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;