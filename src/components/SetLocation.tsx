import { useAppSlice } from "@/store/slices/appSlice";
import { getSelectedLocationId, setSelectedLocationId } from "@/utils";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const SetLocation = ({ children }: Props) => {
  const {
    state: {
      app: { selectedLocationId },
    },
    actions,
    dispatch,
  } = useAppSlice();
  const selectedLocation = getSelectedLocationId();
  useEffect(() => {
    if (!selectedLocation) {
      if (selectedLocationId) {
        setSelectedLocationId(selectedLocationId);
        actions.app.setAppSelectedLocationId(selectedLocationId);
      }
    } else {
      setSelectedLocationId(selectedLocation);
      actions.app.setAppSelectedLocationId(selectedLocation);
    }
  }, [selectedLocation, selectedLocationId]);

  return <>{children}</>;
};

export default SetLocation;
