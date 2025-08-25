'use client'
import { useSession } from "next-auth/react";
import Test from "@/app/components/Test"
import UploadExample from "@/app/components/FileUpload"

const MyComponent = () => {
  const { data: session, status } = useSession();

  // Check if the session is loading
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If there's no session, redirect or show login message
  if (!session) {
    return <div>You are not logged in. Please log in.</div>;
  }

  // Access session data
  const { user } = session;  // user will include the role and id you added in the custom session

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <p>Your role is: {user?.role}</p>
      <p>Your user ID is: {user?.id}</p>

      <div>
        <Test />
        <UploadExample />
      </div>
    </div>
  );
};

export default MyComponent;
