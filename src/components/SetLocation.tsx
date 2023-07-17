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
    if (selectedLocation) {
      setSelectedLocationId(selectedLocation);
      dispatch(actions.app.setAppSelectedLocationId(getSelectedLocationId()));
    } else {
      if (selectedLocationId) {
        dispatch(actions.app.setAppSelectedLocationId(selectedLocationId));
        setSelectedLocationId(selectedLocationId);
      }
    }
  }, [selectedLocation, selectedLocationId]);

  return <>{children}</>;
};

export default SetLocation;
