import { AuthGetCredentials } from "../utils";

const SpacesPage = async () => {
  const creds = AuthGetCredentials();
  console.log(creds);
  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>
        How to use this app
      </h2>
    </div>
  );
};

export default SpacesPage;
