import UploadImage from "../components/UploadImage";

const CreateSpacesPage = async () => {
  return (
    <div style={{ marginTop: "6%" }}>
      <h2 style={{ textAlign: "center" }}>Upload a file to create a space</h2>
      <UploadImage />
    </div>
  );
};

export default CreateSpacesPage;
