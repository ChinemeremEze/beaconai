import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuthFetch } from '../hooks/useAuthFetch';
import { useAuthMutation } from '../hooks/useAuthMutation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CheckCircle, XCircle, UserX } from 'lucide-react'

// Mock data (same as before)
const mockCampaign = {
  id: '1',
  title: 'Senior Software Engineer',
  company: 'TechCorp',
  location: 'San Francisco, CA',
  ownerId: 'user123',

};

export default function ViewCampaign() {
    const { campaignId } = useParams();
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0();
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const { data: campaign, error: campaignError, isLoading: isLoadingCampaign } = useAuthFetch(['campaign'], `http://localhost:3000/api/campaign/${campaignId}`);
    
    const { mutate: approveCandidate, isLoading, isError, isSuccess, error} = useAuthMutation(['campaigns', campaignId, selectedCandidate?.id],
      `http://localhost:3000/api/candidate/approve/${campaignId}/${selectedCandidate?.id}`);
    
    const { mutate: rejectCandidate, isLoading: isRejectLoading, isError: isRejectError, isSuccess : isRejectSuccess, error: rejectError,
      } = useAuthMutation(['campaigns', campaignId, selectedCandidate?.id], `http://localhost:3000/api/candidate/reject/${campaignId}/${selectedCandidate?.id}`);
      // Define a handler to trigger the mutation
    const handleApprove = () => {
      handleStatusChange(selectedCandidate.id, "Approved")
      approveCandidate({
          calendlyLink: campaign['Calendy URL'], // example of data you might send, adjust as needed
      });
    };

    const handleReject = () => {
      handleStatusChange(selectedCandidate.id, "Rejected")
      rejectCandidate({
        calendlyLink: campaign['Calendy URL'], // example of data you might send, adjust as needed
      });
    };

    const handleCandidateSelect = async (candidate) => {
      try {
          setSelectedCandidate(candidate);       // Set the selected candidate in state
      } catch (error) {
          console.error('Failed to fetch candidate:', error);
          // Optionally handle error or show an error message
      }
    };

    const handleStatusChange = (candidateId, newStatus) => {
        campaign.candidates = (campaign.candidates.map(c => 
          c.id === candidateId ? { ...c, Status: newStatus } : c
        ));
    
        if (selectedCandidate && selectedCandidate.id === candidateId) {
          setSelectedCandidate(prev => prev ? { ...prev, Status: newStatus } : null);
        }
        console.log(campaign)
    };

    if (isLoadingCampaign) {
        return <div className="flex justify-center items-center h-screen"><p className="text-pink-600">Loading</p></div>;
    }

    if (campaignError) {
        navigate('/profile')
    }
    const filteredCandidates = campaign?.candidates.filter(candidate => {
      if (selectedStatus === 'All') return true
      return candidate.Status === selectedStatus
    }) || []

    return (
    <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 bg-pink-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-pink-600">{campaign?.Name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><span className="font-semibold">Job Title:</span> {campaign?.['Job Title']}</p>
            </div>
            <div>
              <p><span className="font-semibold">Location:</span> {campaign?.Location}</p>
            </div>
            <div>
              <p><span className="font-semibold">Campaign Type:</span> {campaign?.['Campaign Type']}</p>
            </div>
            <div>
              <p><span className="font-semibold">Status:</span> {campaign?.Status}</p>
            </div>
            <div>
              <p><span className="font-semibold">Created At:</span> {campaign?.createdAt ? format(new Date(campaign.createdAt), 'PPP') : 'N/A'}</p>
            </div>
            <div>
              <p><span className="font-semibold">Compensation:</span> {campaign?.compensation}</p>
            </div>
           
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-pink-600">Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedStatus} onValueChange={(value) => setSelectedStatus(value)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="All" className="text-xs sm:text-sm">All</TabsTrigger>
                <TabsTrigger value="To Be Decided" className="text-xs sm:text-sm">To Be Decided</TabsTrigger>
                <TabsTrigger value="Approved" className="text-xs sm:text-sm">Approved</TabsTrigger>
                <TabsTrigger value="Rejected" className="text-xs sm:text-sm">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
              {campaign.candidates.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <UserX className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">No candidates added for this campaign yet.</p>
                </div>
              ) : filteredCandidates.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <UserX className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">No candidates found for the selected status.</p>
                </div>
              ) : (
              <ScrollArea className="h-[500px] pr-4">
                {filteredCandidates
                  // .filter(candidate => 
                  //     selectedStatus === 'All' || 
                  //     (selectedStatus === 'To Be Decided' && candidate.Status === 'To Be Decided') ||
                  //     (selectedStatus === 'Approved' && candidate.Status === 'Approved') ||
                  //     (selectedStatus === 'Rejected' && candidate.Status === 'Rejected')
                  .map(candidate => (
                  <div 
                    key={candidate.id} 
                    className={`flex items-center space-x-4 mb-4 p-2 rounded cursor-pointer ${selectedCandidate && selectedCandidate.id === candidate.id ? 'bg-pink-100' : 'hover:bg-pink-50'}`}
                    onClick={() => handleCandidateSelect(candidate)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={candidate["Photo URL"]} alt={candidate.Name} />
                      <AvatarFallback>{candidate.Name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{candidate.Name}</h3>
                      <p className="text-sm text-gray-600">{candidate["Company Name"]}</p>
                    </div>
                  </div>
                ))}
            </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-pink-600">Candidate Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCandidate ? (
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedCandidate['Photo URL']} alt={selectedCandidate.Name} />
                    <AvatarFallback>{selectedCandidate.Name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCandidate.Name}</h2>
                    <p className="text-gray-600">{selectedCandidate["Company Name"]}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold">LinkedIn:</p>
                    <a href={selectedCandidate["LinkedIn URL"]} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
                      {selectedCandidate?.["LinkedIn URL"]}
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold">Phone:</p>
                    <p>{selectedCandidate?.["Phone Number"]}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Location:</p>
                    <p>{selectedCandidate.Location}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Summary:</p>
                  <p>{selectedCandidate?.Notes}</p>
                </div>
                {   selectedCandidate.Status === 'To Be Decided' ? (
                    <div className="flex space-x-4">
                        <Button 
                        onClick={() => handleApprove(selectedCandidate.id)} 
                        className="bg-pink-600 hover:bg-pink-700"
                        >
                        Approve
                        </Button>
                        <Button 
                        onClick={() => handleReject(selectedCandidate.id)} 
                        variant="outline" 
                        className="border-pink-600 text-pink-600 hover:bg-pink-100"
                        >
                        Reject
                        </Button>
                    </div>
                    ):
                    (
                        <span className={`px-3 py-1 rounded-full ${
                        selectedCandidate.Status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {selectedCandidate.Status}
                        </span>
                    )
                }
                {/* <div className="flex space-x-4">
                  <Button onClick={() => handleApprove(selectedCandidate.id)} className="bg-pink-600 hover:bg-pink-700">
                    Approve
                  </Button>
                  <Button onClick={() => handleReject(selectedCandidate.id)} variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-100">
                    Reject
                  </Button>
                </div> */}
              </div>
            ) : (
              <p className="text-center text-gray-500">Select a candidate to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-pink-600">Campaign Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-pink-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Total Candidates</h3>
              <p className="text-3xl font-bold text-pink-600">{campaign.candidates.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Approved</h3>
              <p className="text-3xl font-bold text-green-600">
                {campaign.candidates.filter(c => c.Status === 'Approved').length}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Rejected</h3>
              <p className="text-3xl font-bold text-red-600">
                {campaign.candidates.filter(c => c.Status === 'Rejected').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}