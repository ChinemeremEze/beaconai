import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from 'lucide-react';

const campaignTypes = [
  {
    name: "Basic Campaign",
    features: [
      "Access to 100,000+ candidate profiles",
      "10 outreach sequences",
      "Basic AI matching algorithm",
      "Email support"
    ],
    price: "$3,000",
    link: "/create-campaign/basic",
  },
  {
    name: "Senior Campaign",
    features: [
      "Access to 250,000+ candidate profiles",
      "25 outreach sequences",
      "Advanced AI matching algorithm",
      "Email and chat support",
      "Customized outreach templates"
    ],
    price: "$7,000",
    link: "/create-campaign/senior",
  },
  {
    name: "Executive Campaign",
    features: [
      "Access to 500,000+ candidate profiles",
      "Unlimited outreach sequences",
      "Premium AI matching algorithm",
      "24/7 dedicated support",
      "Customized outreach templates",
      "Exclusive executive network access"
    ],
    price: "$13,000",
    link: "/create-campaign/executive",
  },
];

const CampaignModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSelectCampaign = (campaignLink) => {
    navigate(campaignLink);
    onClose(); // Close the modal after redirect
  };

  const handleClose = () => {
    onClose();
    navigate('/profile'); // Navigate back to the profile page
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 "
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] p-6 relative max-h-[90vh] overflow-y-auto
            bg-gradient-to-b from-white to-pink-100"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">Choose a Campaign Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campaignTypes.map((campaign, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="flex flex-col p-6 border border-pink-100 rounded-lg shadow-sm "
                >
                  <h3 className="text-xl font-semibold text-pink-600 mb-3">{campaign.name}</h3>
                  <ul className="space-y-2 mb-4 flex-grow">
                    {campaign.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-pink-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-gray-900 mb-4">{campaign.price}</p>
                    <button
                      onClick={() => handleSelectCampaign(campaign.link)}
                      className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition duration-300 ease-in-out"
                    >
                      Select {campaign.name}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-300 ease-in-out"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CampaignModal;