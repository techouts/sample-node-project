import axios from "axios";
import { QyPaymentStatus, merchant_id } from "../../utility/APIConstants";
import { NextApiRequest, NextApiResponse } from "next";

export const failedQRStatus = [
  "AUTHENTICATION_FAILED",
  "AUTHORIZATION_FAILED",
  "JUSPAY_DECLINED",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { order_id = "" } = req.query;

  if (!!order_id === false) {
    return res.status(401).json({ message: "Please validate the Payload" });
  }

  try {
    const juspayPaymentStatus = (
      await axios.get(`${QyPaymentStatus}${order_id}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
          'x-merchantid': merchant_id
        },
      })
    ).data;

    const { status, return_url, order_id: orderID } = juspayPaymentStatus;

    return res.status(200).send({ status, return_url, orderID });
  } catch (err) {
    console.log("err", err);
    return res
      .status(500)
      .send({ status: "failed", data: JSON.stringify(err) });
  }
}
