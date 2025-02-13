export const arr1 = [
  "booked",
  "pending",
  "pickpackconfirmed",
  "pick_pack",
  "awaiting_courier_collection",
  "processing",
  "awaiting_wave",
  "assigned",
  "rejected",
  "fulfilled",
  "partially_fulfilled",
  "awaiting_courier_collection",
  "active_lodged",
  "pending_pickup",
  "pickup_rescheduled",
];
export const arr2 = [
  "in transit",
  "out for delivery",
  "reattempt",
  "lost",
  "shipped",
  "ready for pickup",
];
export const arr3 = ["complete", "delivered", "collected"];
export const arr4 = ["escalated", "cancelled", "expired"];
export const cancelStatus = ["awaiting_confirmation", "processing"];
export const trackCancel = ["cancelled"];
export const rtoundeliveredStatus = ["undelivered"];
export const rtoStatus = [
  "rto initiated",
  "rto in-transit",
  "rto processing",
  "rto out for delivery",
  "rto delivered",
  "rto processed",
];
export const rtoRefundInitiated = ["rto_refund_initiated"];
export const rtoRefundCompleted = ["rto_refund_completed"];
export const undeliveredStatus = [
  ...rtoStatus,
  ...rtoRefundCompleted,
  ...rtoRefundInitiated,
];
// return order status
export const returnInit = [
  "return initiated",
  "return processing",
  "return",
  "exchange initiated",
];
export const returnPicked = ["return picked"];
export const returnFailed = [
  "return pickup failed",
  "return cancelled",
  "refund rejected",
  "qc fail",
];
export const returnInTransit = [
  "return in-transit",
  "reverse shipment-out for delivery",
];
export const returnReceived = ["return received"];
export const refundCompleted = [
  "refund completed",
  "refund initiated",
  "refund pending",
  "exchange processed",
  "return processed",
];
export const returnOrderStatus = [
  ...returnInit,
  ...returnPicked,
  ...returnInTransit,
  ...returnFailed,
  ...returnReceived,
  ...refundCompleted,
];

export const canelledOrderInitialStatus = ["cancelled"];
export const cancelledOrderSecondaryStatus = ["refund initiated"];
export const cancelledOrderTertiaryStatus = ["refund completed"];

export const cancelledOrderStatus = [
  ...canelledOrderInitialStatus,
  ...cancelledOrderSecondaryStatus,
  ...cancelledOrderTertiaryStatus,
];
