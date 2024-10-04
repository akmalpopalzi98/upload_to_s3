import styles from "../styles.module.css";
// import Image from "next/image";
const SpaceImage = ({ url }: { url: string }) => {
  return <img src={url} alt="Image" width={300} height={300} />;
};

export default SpaceImage;
