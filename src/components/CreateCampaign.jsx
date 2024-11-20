import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth0 } from '@auth0/auth0-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import { useAuthMutation } from '../hooks/useAuthMutation';
import CampaignModal from '../modals/CampaignModal';

const CAMPAIGN_PRICES = {
    basic: import.meta.env.VITE_APP_BASIC_CAMPAIGN_PRICE,
    senior: import.meta.env.VITE_APP_SENIOR_CAMPAIGN_PRICE,
    executive: import.meta.env.VITE_APP_EXECUTIVE_CAMPAIGN_PRICE
}

const CAMPAIGN_AMOUNTS = {
    basic: 300000,
    senior: 700000,
    executive: 1200000
};
  
export default function CreateCampaign() {

    const navigate = useNavigate();
    //const [campaignType, setCampaignType] = useState('Basic');
    const { user, isAuthenticated, isLoading } = useAuth0()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { campaignType } = useParams();
    const campaignTypes = ['basic', 'senior', 'executive'];
    useEffect(() => {
       // if (!campaignType) navigate('/profile');
        if (campaignType && campaignType.indexOf(campaignTypes) === -1) {
            setIsModalOpen(true);
        }
    }, [campaignType]);
  
    const handleModalClose = () => {
      setIsModalOpen(false); // Close the modal
    };
  
    const handleCampaignTypeSelect = (campaignType) => {
      setCampaignType(campaignType);
      setIsModalOpen(false);
      navigate(`/create-campaign/${campaignType}`); // Redirect to the selected campaign type
    };
  

    const amount = useMemo(() => {
        return (CAMPAIGN_AMOUNTS[campaignType]);
    }, [campaignType]);

    const priceId = useMemo(() => {
        return (CAMPAIGN_PRICES[campaignType]);
    }, [campaignType]);

    const { mutate: createCampaignMutation, isLoading: isSubmitting } = useAuthMutation(
        ['createCampaign'],
        'http://localhost:3000/api/payments/create-payment-intent'
    );
    const [formData, setFormData] = useState({
        ['Name']: '',
        ['Company']: '',
        ['Job Title']: '',
        ['Amount']: amount,
        ['Job Description']: '',
        ['Calendy URL']: '',
        ['Similar Title Keywords']: '',
        ['Industries']: '',
        ['Location']: '',
        ['Years Of Experience']: '',
        ['Education']: '',
        ['Job Posting URL']: '',
        ['Compensation']: '',
        ['Show Compensation']: 'Yes',
        ['Responsibilities']: '',
        ['Ideal Hire']: '',
        ['Company Info']: '',
        ['Momentum']: '',
        ['Team']: '',
        ['Pitch']: '',
        ['Tech Stack']: '',
        currency: 'usd',
    });

    const [error, setError] = useState('')
    if (isLoading) {
        return <div className="container mx-auto px-4 py-16 text-center">Loading ...</div>
    }
    
    if (!isAuthenticated) {
        return <div className="container mx-auto px-4 py-16 text-center">Please log in to create a campaign.</div>
    }
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? "Yes" : "No")  : value
        }));
    };
    const handleSelectChange = (value) => {
        setFormData(prevData => ({
          ...prevData,
          type: value
        }))
      }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
    
        // Here you would typically send the formData to your API
       
        // Simulating an API call
        formData["Campaign Type"] = campaignType.charAt(0).toUpperCase() + campaignType.slice(1).toLowerCase();
        formData['Status'] = "Active";
        formData["Client Name"] = user.name
        formData["Client ID"] = user.sub
        formData["priceId"] = priceId

        createCampaignMutation(formData, {
            onSuccess: (data) => {
                const { client_secret, campaignType, amount } = data;
                if (client_secret) {
                    navigate('/payment', { state: { client_secret, campaignType, amount } });
                } else {
                    setError('Failed to retrieve client secret. Please try again.');
                }
            },
            onError: (err) => {
                console.log(err)
                setError('Failed to create campaign. Please try again.');
            },
        });
    }

    if(!campaignType){
        return <CampaignModal isOpen={true} onClose={handleModalClose} />
    }

    if (campaignType)
        return (
        <div className="container mx-auto px-4 py-16">
            <Card className="max-w-6xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-pink-600">Create New Campaign</CardTitle>
                </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div>
                            <Label htmlFor="Name">Campaign Name</Label>
                            <Input id="Name" name="Name" value={formData['Name']} onChange={handleInputChange} required />
                            {/* <Input id="amount" value={`$${amount}`} readOnly className="bg-pink-50" /> */}
                        </div>
                        <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" value={`$${amount/100}`} readOnly className="bg-pink-50" />
                        </div>
                        {/* <div>
                            <Label htmlFor="Campaign Type">Campaign Type</Label>
                            <Select onValueChange={setCampaignType} defaultValue={campaignType}>
                                <SelectTrigger>
                                <SelectValue placeholder="Select campaign type" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="Basic">Basic</SelectItem>
                                <SelectItem value="Senior">Senior Level</SelectItem>
                                <SelectItem value="Executive">Executive Level</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <Label htmlFor="Company">Company Name</Label>
                        <Input id="Company" name="Company" value={formData['Company']} onChange={handleInputChange} required />
                        </div>
                        <div>
                        <Label htmlFor="Calendy URL">Calendy URL</Label>
                        <Input id="Calendy URL" name="Calendy URL" value={formData['Calendy URL']} type="url" onChange={handleInputChange} required/>
                        </div>
                    </div>
            
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <Label htmlFor="Job Title">Job Title</Label>
                        <Input id="Job Title" name="Job Title" value={formData['Job Title']} onChange={handleInputChange} required />
                        </div>
                        <div>
                        <Label htmlFor="similarTitleKeywords">Similar Job Title Keywords</Label>
                        <Input id="similarTitleKeywords" name="Similar Title Keywords" value={formData['Similar Title Keywords']} onChange={handleInputChange} required/>
                        </div>
                    </div>
            
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <Label htmlFor="Industries">Industries</Label>
                        <Input id="Industries" name="Industries" value={formData.Industries} onChange={handleInputChange} required />
                        </div>
                        <div>
                        <Label htmlFor="Location">Job Location</Label>
                        <Input id="Location" name="Location" value={formData.Location} onChange={handleInputChange} required placeholder="Remote" />
                        </div>
                    </div>
            
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <Label htmlFor="Years Of Experience">Years of Experience Required</Label>
                        <Input id="Years Of Experience" name="Years Of Experience" type="number" min={0} value={formData['Years Of Experience']} onChange={handleInputChange} required />
                        </div>
                        <div>
                        <Label htmlFor="Education">Education Level Required</Label>
                        <Select name="Education" defaultValue={"bachelors"} onValueChange={(value) => handleInputChange({ target: { name: 'Education', value } })}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="High School">High School</SelectItem>
                            <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                            <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                            <SelectItem value="Ph.D.">Ph.D.</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
            

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="Job Description">Job Description</Label>
                            <Textarea id="Job Description" name="Job Description" value={formData['Job Description']} onChange={handleInputChange} required  />
                        </div>
                        <div>
                            <Label htmlFor="Job Posting URL">Job Posting URL</Label>
                            <Input id="Job Posting URL" name="Job Posting URL" type="url" value={formData['Job Posting URL']} onChange={handleInputChange} />
                        </div>
                    </div>
                   
            
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="Compensation">Compensation</Label>
                            <Input id="Compensation" name="Compensation" value={formData.Compensation} onChange={handleInputChange} required  />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="Show Compensation"
                                name="Show Compensation"
                                checked={formData['Show Compensation'] === "Yes"? true: false}
                                onCheckedChange={(checked) => handleInputChange({ target: { name: 'Show Compensation', type: 'checkbox', checked } })}
                            />
                            <Label htmlFor="Show Compensation">Show Compensation</Label>
                        </div>
                    </div>
            
                    <div>
                        <Label htmlFor="Responsibilities">Responsibilities</Label>
                        <Textarea id="Responsibilities" name="Responsibilities" value={formData.Responsibilities} onChange={handleInputChange} required />
                    </div>

                    {campaignType !== 'basic' && (
                        <div>
                            <Label htmlFor="Ideal Hire">Describe your Ideal Hire  </Label>
                            <Textarea id="Ideal Hire" name="Ideal Hire" value={formData["Ideal Hire"]} onChange={handleInputChange} />
                        </div>
                    )}
            
                    {campaignType === 'executive' && (
                        <>
                        <div>
                            <Label htmlFor="Company Info">Company Info</Label>
                            <Textarea id="Company Info" name="Company Info" value={formData['Company Info']} onChange={handleInputChange} required />
                        </div>
            
                        <div>
                            <Label htmlFor="Momentum">Momentum</Label>
                            <Textarea id="Momentum" name="Momentum" value={formData.Momentum} onChange={handleInputChange} required />
                        </div>
            
                        <div>
                            <Label htmlFor="Team">Team</Label>
                            <Textarea id="Team" name="Team" value={formData.Team} onChange={handleInputChange} required />
                        </div>
            
                        <div>
                            <Label htmlFor="Pitch">Pitch</Label>
                            <Textarea id="Pitch" name="Pitch" value={formData.Pitch} onChange={handleInputChange} required />
                        </div>
            
                        <div>
                            <Label htmlFor="Tech Stack">Tech Stack</Label>
                            <Textarea id="Tech Stack" name="Tech Stack" value={formData['Tech Stack']} onChange={handleInputChange} required />
                        </div>
                        </>
                    )}
                {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="flex items-center">
                    <AlertCircle className="mr-2" />
                    {error}
                    </span>
                </div>
                )}
                <Button type="submit" disabled={isSubmitting} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                {isSubmitting ? 'Submitting...' : 'Create Campaign'}
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
    );
}