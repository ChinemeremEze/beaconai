import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useAuthFetch = (queryKey, url, options = {}) => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const fetchWithAuth = async () => {
    if (!isAuthenticated) {
      throw new Error('User is not authenticated');
    }

    const token = await getAccessTokenSilently();
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return useQuery({
    queryKey,
    queryFn: fetchWithAuth,
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });
};