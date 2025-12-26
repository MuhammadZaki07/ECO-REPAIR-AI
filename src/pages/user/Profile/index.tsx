import ProfileContent from "./components/profile-content";
import ProfileHeader from "./components/profile-header";

function ProfilePage() {
  return (
    <div className="container overflow-y-auto mx-auto space-y-6 lg:px-4 lg:py-10">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}

export default ProfilePage;
