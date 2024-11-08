import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="w-full max-w-md mx-auto">
        <header>
          <h2 className="text-2xl font-bold text-center">User Profile</h2>
        </header>
        <div className="text-center">
          <img src={user.picture} alt={user.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <button variant="outline" onClick={() => window.alert('Edit profile functionality to be implemented')}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}