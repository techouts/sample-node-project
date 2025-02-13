import { NitrogenCachePurge } from '../../utility/NitrogenCachePurge';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GenChunks } from './pdp-cache-purge';
import axios from 'axios';
import { CardTransaction, merchant_id } from '../../utility/APIConstants';

const payload = {
  order_id: null,
  payment_method_type: 'UPI',
  payment_method: 'UPI',
  merchant_id: merchant_id,
  redirect_after_payment: 'true',
  format: 'json',
  txn_type: 'UPI_PAY',
  sdk_params: 'true',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderid = '' } = req.body;

  if (!!orderid === false) {
    return res.status(401).json({ message: 'Please validate the Payload' });
  }

  try {
    const data = {
      ...payload,
      order_id: orderid,
    };

    const juspayRes = (
      await axios.post(CardTransaction, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'cache-control': 'no-cache',
          'x-merchantid': merchant_id,
        },
      })
    ).data;

    const { txn_uuid } = juspayRes;

    const { amount, merchant_vpa, merchant_name, tr, mcc } =
      juspayRes.payment.sdk_params;

    const upi_url = `upi://pay?pa=${merchant_vpa}&pn=${merchant_name}&tr=${tr}&am=${amount}&tid=${txn_uuid}&cu=INR&tn=Pay%20for%20SSBeauty&mc=${mcc}`;

    if (!upi_url.includes('undefined')) {
      return res.status(200).send({ upi_url });
    }

    return res.status(200).send({ upi_url: null });
  } catch (err) {
    console.log('err', err);
    return res.status(500).send('Error revalidating');
  }
}
