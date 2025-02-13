import React from "react";
import { PinPointTooltipText } from "./FindStoresStyle";

export const SingleStoreTiming = ({ storeValues }: any) => {
  const weekdaysTiming = storeValues?.map(
    (timings: any) =>
      timings?.openingTime?.formattedHour &&
      timings?.weekDay == "Mon" &&
      `Opens: ${timings?.openingTime?.formattedHour} to ${timings?.closingTime?.formattedHour}`
  );
  return (
    <>
      {storeValues && (
        <PinPointTooltipText>{weekdaysTiming}</PinPointTooltipText>
      )}
    </>
  );
};
