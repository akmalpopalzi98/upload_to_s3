import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const NotificationAlert = ({
  notification,
}: {
  notification: string | null;
}) => {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="red" title="No File name" icon={icon}>
      {notification}
    </Alert>
  );
};

export default NotificationAlert;
