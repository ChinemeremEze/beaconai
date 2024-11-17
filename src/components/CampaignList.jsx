import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthFetch } from '../hooks/useAuthFetch';


// Mock data for campaigns

const mockCampaigns = [
  { id: 1, title: "Software Engineer", type: "Basic", approvedCandidates: 3 },
  { id: 2, title: "Senior Product Manager", type: "Senior", approvedCandidates: 2 },
  { id: 3, title: "Chief Technology Officer", type: "Executive", approvedCandidates: 1 },
];

export default function CampaignList() {
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const { data, error, isLoading } = useAuthFetch(['campaigns'], 'http://localhost:3000/api/campaigns');

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(data)
    return (
        <div>
        <h3 className="text-xl font-semibold mb-4">Your Campaigns</h3>
        <div className="grid gap-4 md:grid-cols-2">
            {mockCampaigns.map((campaign) => (
            <Card key={campaign.id} className="cursor-pointer" onClick={() => setSelectedCampaign(campaign)}>
                <CardHeader>
                <CardTitle>{campaign.title}</CardTitle>
                </CardHeader>
                <CardContent>
                <p>Type: {campaign.type}</p>
                <p>Approved Candidates: {campaign.approvedCandidates}</p>
                </CardContent>
            </Card>
            ))}
        </div>
        {selectedCampaign && (
            <Card className="mt-8">
            <CardHeader>
                <CardTitle>{selectedCampaign.title} Details</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Type: {selectedCampaign.type}</p>
                <p>Approved Candidates: {selectedCampaign.approvedCandidates}</p>
                <button className="mt-4" onClick={() => alert("View candidates functionality to be implemented")}>
                View Approved Candidates
                </button>
            </CardContent>
            </Card>
        )}
        </div>
    );
}
