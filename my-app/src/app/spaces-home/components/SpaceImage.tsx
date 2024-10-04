import styles from "../styles.module.css";
// import Image from "next/image";
const SpaceImage = ({ url }: { url: string }) => {
  return (
    <div>
      <img src={url} alt="Image" width={300} height={300} />
    </div>
  );
};

export default SpaceImage;
