import React from "react";
import { Badge } from "@chakra-ui/react";
import Status from "../../utils/Status";

interface IProps {
  status: string;
}

export function StatusBadge({ status }: IProps) {
  const getCurrentStatus = (status: string) => Status.getCurrentOrderStatus(status);

  const getBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge colorScheme="orange">{getCurrentStatus(status)}</Badge>;

      case "closed":
        return <Badge colorScheme="green">{getCurrentStatus(status)}</Badge>;

      default:
        return <Badge colorScheme="blue">{getCurrentStatus(status)}</Badge>;
    }
  };

  return getBadge(status);
}
