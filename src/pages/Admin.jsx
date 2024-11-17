import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"


// Mock data (replace with actual API calls in production)
const mockProfiles = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', campaignsCount: 3 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', campaignsCount: 2 },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', campaignsCount: 1 },
];

const mockCampaigns = [
  { id: 1, title: 'Software Engineer', type: 'Basic', createdBy: 'Alice Johnson', candidatesCount: 10 },
  { id: 2, title: 'Senior Product Manager', type: 'Senior', createdBy: 'Bob Smith', candidatesCount: 5 },
  { id: 3, title: 'Chief Technology Officer', type: 'Executive', createdBy: 'Charlie Brown', candidatesCount: 3 },
];



export default function Admin() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profiles");
    const [profiles, setProfiles] = useState(mockProfiles);
    const [campaigns, setCampaigns] = useState(mockCampaigns);

    const handleViewCampaign = (campaignId) => {
        navigate(`/campaign/${campaignId}`);
    };
    useEffect(() => {
        // In a real application, you would fetch the data from your API here
        // setProfiles(await fetchProfiles());
        // setCampaigns(await fetchCampaigns());
    }, []);

    if (isLoading) {
        return <div className="container mx-auto px-4 py-16 text-center">Loading ...</div>;
    }

    if (!isAuthenticated || user.role !== 'admin') {
        return <div className="container mx-auto px-4 py-16 text-center">Access Denied. Admin privileges required.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16">
        <Card className="w-full">
            <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-pink-600">Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profiles" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-600">User Profiles</TabsTrigger>
                <TabsTrigger value="campaigns" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-600">Campaigns</TabsTrigger>
                </TabsList>
                <TabsContent value="profiles">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Campaigns</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {profiles.map((profile) => (
                        <TableRow key={profile.id}>
                        <TableCell>{profile.name}</TableCell>
                        <TableCell>{profile.email}</TableCell>
                        <TableCell>{profile.campaignsCount}</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm" className="border-pink-600 text-pink-600 hover:bg-pink-100">
                            View Details
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TabsContent>
                <TabsContent value="campaigns">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Candidates</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {campaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                        <TableCell>{campaign.title}</TableCell>
                        <TableCell>{campaign.type}</TableCell>
                        <TableCell>{campaign.createdBy}</TableCell>
                        <TableCell>{campaign.candidatesCount}</TableCell>
                        <TableCell>
                            <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-pink-600 text-pink-600 hover:bg-pink-100"
                            onClick={() => handleViewCampaign(campaign.id)}
                            >
                            View Campaign
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TabsContent>
            </Tabs>
            </CardContent>
        </Card>
        </div>
    );
}