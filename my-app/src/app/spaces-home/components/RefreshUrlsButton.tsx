import { Dispatch, SetStateAction } from "react";

const RefreshUrlsButton = ({
  className,
  setRefresh,
}: {
  className: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={className}
      onClick={() => {
        localStorage.removeItem("resolved_urls");
        setRefresh(true);
      }}
    >
      Refresh
    </button>
  );
};

export default RefreshUrlsButton;
