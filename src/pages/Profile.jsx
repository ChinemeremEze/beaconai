import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import CampaignModal from '../modals/CampaignModal'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Loader2, PlusCircle, FolderOpen} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '../hooks/useAuthFetch';
// import CampaignList from '../components/CampaignList';
// import CreateCampaign from '../components/CreateCampaign';

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  // const mockCampaigns = [
  //   { id: 1, title: "Software Engineer", type: "Basic", approvedCandidates: 3 },
  //   { id: 2, title: "Senior Product Manager", type: "Senior", approvedCandidates: 2 },
  //   { id: 3, title: "Chief Technology Officer", type: "Executive", approvedCandidates: 1 },
  // ];
  const { data: campaigns, error, isLoading: fetchisLoading,  } = useAuthFetch(['campaigns'], `http://localhost:3000/api/campaigns/`);
  let filteredCampaigns = campaigns
  //console.log(campaigns)
  

  const handleCampaignClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  const handleCreateCampaign = () => {
    // Navigate to the create campaign page
    navigate('/create-campaign');
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading || fetchisLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div className="container mx-auto px-4 py-16 text-center">Please log in to view this page.</div>;
  }

  if (campaigns){
    filteredCampaigns = campaigns.filter(campaign => {
      if (activeTab === 'all') return true
      return campaign.Status === activeTab
    })
  }

  if (campaigns)
   
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title> Chika.ai | Source smarter, Hire Faster</title>
        <meta name="description" content="Discover how Chika.ai streamlines the hiring process, connecting top talent with innovative companies through AI-powered recruitment." />
      </Helmet>
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome, {user?.name}!</h1>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-pink-600">My Campaigns</h2>
                <Button 
                  onClick={openModal}
                  className="bg-pink-600 hover:bg-pink-700 text-white">

                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Campaign
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="py-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Active">Active</TabsTrigger>
                <TabsTrigger value="Paused">Paused</TabsTrigger>
                <TabsTrigger value="Done">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
              {campaigns.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <FolderOpen className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">You don't have any campaigns yet.</p>
                  <p className="text-gray-500">Create your first campaign to get started!</p>
                </div>
              ) : filteredCampaigns.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <FolderOpen className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">No campaigns found for the selected status.</p>
                </div>
              ) : (
                <div>
                  {filteredCampaigns.map(campaign => (
                  <Card key={campaign.Id} className="mb-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCampaignClick(campaign.Id)}>
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.Name}</h3>
                        <p className="text-gray-600">{campaign.Company} - {campaign.Location}</p>
                        {campaign.Candidates && campaign.Candidates.length > 0 && <p className="text-gray-600">Num of Interested A+ Candidates: <span className='text-pink-500 font-bold'>{campaign.Candidates.length}</span></p>}
                        
                      </div>
                      <div className={`px-3 py-1 rounded-full ${campaign.Status === 'Active' ? 'bg-green-100 text-green-800' : campaign.Status === 'Done' ? 'bg-pink-100 text-gray-800' : 'bg-gray-100 text-gray-800'}`}>
                        {campaign.Status}
                      </div>
                    </CardContent>
                  </Card>
                   ))}
                </div>
              )}
          </CardContent> 
        </Card>
      </motion.div>
    </div>
    <CampaignModal isOpen={isModalOpen} onClose={closeModal} />
  </div>
    // <div className="container mx-auto px-4 py-16">
    //   <Card className="mb-8 bg-pink-50">
    //     <CardContent className="flex flex-col items-center pt-6">
    //       <Avatar className="w-32 h-32 mb-4">
    //         <AvatarImage src={user.picture} alt={user.name} />
    //         <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    //       </Avatar>
    //       <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
    //       <p className="text-gray-600 mb-4">{user.email}</p>
    //       <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-100">Edit Profile</Button>
    //     </CardContent>
    //   </Card>

    //   <div className="flex justify-between items-center mb-6">
    //     <h2 className="text-2xl font-bold text-pink-600">My Campaigns</h2>
    //     <Button 
    //       onClick={handleCreateCampaign}
    //       className="bg-pink-600 hover:bg-pink-700 text-white"
    //     >
    //       <PlusCircle className="mr-2 h-4 w-4" />
    //       Create New Campaign
    //     </Button>
    //   </div>

    //   <Card>
    //     <CardContent className="py-4">
    //       {campaigns.map(campaign => (
    //         <Card key={campaign.Id} className="mb-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCampaignClick(campaign.Id)}>
    //           <CardContent className="flex justify-between items-center p-4">
    //             <div>
    //               <h3 className="font-semibold text-lg">{campaign.Name}</h3>
    //               <p className="text-gray-600">{campaign.Company} - {campaign.Location}</p>
    //               {campaign.Candidates && campaign.Candidates.length > 0 && <p className="text-gray-600">Num of Interested A+ Candidates: <span className='text-pink-500 font-bold'>{campaign.Candidates.length}</span></p>}
                  
    //             </div>
    //             <div className={`px-3 py-1 rounded-full ${campaign.Status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
    //               {campaign.Status}
    //             </div>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </CardContent>
    //   </Card>
    // </div>
  );
}