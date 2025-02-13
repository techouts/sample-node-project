import React from "react";
import { timingTitle } from "./Constants";
import { Storetime, StoreTimingTitle } from "./FindStoresStyle";

export const StoreTimings = ({ storeValues }: any) => {
  const weekdaysTiming = storeValues?.map(
    (timings: any) =>
      timings?.openingTime?.formattedHour &&
      timings?.weekDay == "Mon" &&
      `Weekdays: ${timings?.openingTime?.formattedHour} to ${timings?.closingTime?.formattedHour}`
  );
  const weekendsTiming = storeValues?.map(
    (timings: any) =>
      timings?.openingTime?.formattedHour &&
      timings?.weekDay == "Sun" &&
      `Weekends: ${timings?.openingTime?.formattedHour} to ${timings?.closingTime?.formattedHour}`
  );
  return (
    <>
      {storeValues && <StoreTimingTitle>{timingTitle}</StoreTimingTitle>}
      <Storetime>{weekdaysTiming}</Storetime>
      <Storetime>{weekendsTiming}</Storetime>
    </>
  );
};
