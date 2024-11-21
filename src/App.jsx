import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import PaymentSuccess from './components/PaymentSuccess';
import ViewCampaign from './components/ViewCampaign';
import CreateCampaign from './components/CreateCampaign';
import HowItWorks from './pages/HowItWorks';
import { Toaster } from "@/components/ui/toaster"
import PageNotFound from './components/PageNotFound';
import { Loader } from 'lucide-react';
function App() {

  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout flex justify-center ">
        <Loader/>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/features" element={<Features />} /> */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/callback" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/create-campaign/:campaignType" element={<CreateCampaign />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/campaign/:campaignId" element={<ViewCampaign/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;