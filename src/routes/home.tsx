import Marquee from "react-fast-marquee";
import { Container } from "@/components/ui/container";
import { MarqueImg } from "@/components/ui/marquee-img";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RainbowButton } from "../components/ui/rainbow-button";

import { 
  Brain, 
  Users, 
  MessageSquare, 
  Code, 
  UserCheck,
  Play,
  Settings,
  MessageCircle,
  Trophy,
  BarChart3,
  Target,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const HomePage = () => {
  const practiceCards = [
    {
      title: "Aptitude Tests",
      description: "Practice MCQ tests with instant scoring and detailed explanations",
      icon: Brain,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      features: ["Multiple choice questions", "Instant scoring", "Performance analytics"]
    },
    {
      title: "Group Discussions",
      description: "Engage with AI candidates in realistic GD scenarios",
      icon: Users,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      features: ["AI-powered peers", "Topic variety", "Communication skills"]
    },
    {
      title: "AI Interviews",
      description: "Customizable mock interviews with role-based questions",
      icon: MessageSquare,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      features: ["Custom job descriptions", "Experience level tuning", "Tech stack specific"]
    },
    {
      title: "Technical Rounds",
      description: "Coding challenges and system design discussions",
      icon: Code,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      features: ["Live coding", "System design", "Algorithm challenges"]
    },
    {
      title: "HR Interviews",
      description: "Behavioral questions and company culture discussions",
      icon: UserCheck,
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-600",
      features: ["Behavioral questions", "Culture fit", "Salary negotiation"]
    }
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Choose Your Mode",
      description: "Select from aptitude tests, GD, technical, or HR interviews",
      icon: Target
    },
    {
      step: "02", 
      title: "Customize Settings",
      description: "Set your experience level, role, and specific requirements",
      icon: Settings
    },
    {
      step: "03",
      title: "Get Questions",
      description: "Receive personalized questions tailored to your profile",
      icon: MessageCircle
    },
    {
      step: "04",
      title: "Practice & Learn",
      description: "Engage in realistic interview scenarios with AI feedback",
      icon: Play
    },
    {
      step: "05",
      title: "Review Feedback",
      description: "Get detailed insights and improvement suggestions",
      icon: BarChart3
    }
  ];

  const features = [
    {
      title: "Personalized Questions",
      description: "AI-generated questions based on your role and experience",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Instant Feedback",
      description: "Get immediate insights on your performance and areas to improve",
      icon: Zap,
      color: "text-green-600"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your improvement over time with detailed analytics",
      icon: BarChart3,
      color: "text-purple-600"
    },
    {
      title: "Role-based Simulation",
      description: "Practice interviews specific to your target job role",
      icon: UserCheck,
      color: "text-orange-600"
    },
    {
      title: "AI Group Discussion Peers",
      description: "Practice GDs with intelligent AI candidates that respond naturally",
      icon: Users,
      color: "text-pink-600"
    },
    {
      title: "Performance Analytics",
      description: "Deep insights into your strengths and improvement areas",
      icon: Trophy,
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="flex-col w-full pb-24">
      {/* Hero Section */}
      <Container>
        <div className="my-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-7xl font-bold mb-4">
              <span className="text-outline font-extrabold">
                prepHub
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-4xl mx-auto">
              Interviews can be tough, but with prepHub, you’re never alone. Practice with AI-powered tools, get instant insights, and turn nervous energy into top performance.
            </p>
            
            <RainbowButton className="px-8 py-6 text-lg h-14">
              Start Preparing
              <ArrowRight className="ml-2 h-5 w-5" />
            </RainbowButton>
          </div>

          {/* Hero Image */}
          <div className="w-full mt-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 h-[420px] drop-shadow-md overflow-hidden relative border">
            <img
              src="assets/img/hero.jpg"
              alt="AI Interview Preparation Platform"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </Container>

      {/* Practice Modes Section */}
      <Container>
        <div className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Practice Modes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from multiple practice modes tailored to your interview needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceCards.map((card, index) => (
              <Card key={index} className={`${card.color} hover:shadow-lg transition-all duration-300 cursor-pointer group`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">{card.title}</CardTitle>
                  <CardDescription className="text-gray-600">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {card.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to start your interview preparation journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                  {step.step}
                </div>
                <div className="mb-4">
                  <step.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <Container>
        <div className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in your interviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl border hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Company Marquee */}
      <div className="w-full my-12">
        <Container>
          <p className="text-center text-gray-600 mb-6">Trusted by candidates preparing for top companies</p>
        </Container>
        <Marquee pauseOnHover>
          <MarqueImg img="/assets/img/logo/google.png" />
          <MarqueImg img="/assets/img/logo/adobe.png" />
          <MarqueImg img="/assets/img/logo/infosys.png" />
          <MarqueImg img="/assets/img/logo/perssistence.png" />
          <MarqueImg img="/assets/img/logo/microsoft.png" />
        </Marquee>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Ace Your Interview?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of successful candidates who prepared with prepHub</p>
            <RainbowButton className="px-8 py-6 text-lg h-14">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </RainbowButton>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;