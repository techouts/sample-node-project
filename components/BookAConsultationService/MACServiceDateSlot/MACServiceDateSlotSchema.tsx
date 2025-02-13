export type AVAILABLE_SLOTS = {
  id: number;
  slotTime: string;
};

export default interface MACServiceDateSlotSchema {
  dateAndTimeTitle: string;
  timeDuration: string;
  availableSlotTitle: string;
  slotTimings: AVAILABLE_SLOTS[];
}
