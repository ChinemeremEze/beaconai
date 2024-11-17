import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';

export const useAuthMutation = (mutationKey, url, options = {}) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const mutationWithAuth = async (data) => {
    if (!isAuthenticated) {
      throw new Error('User is not authenticated');
    }

    const token = await getAccessTokenSilently();
    
    const response = await fetch(url, {
      method: 'POST', // Default method for mutation
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return useMutation({
    mutationKey,
    mutationFn: mutationWithAuth,
  });
};