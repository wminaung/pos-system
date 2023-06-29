import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const OrderReviewPage = () => {
  const router = useRouter();
  const query = router.query as { [key: string]: string };
  const locationId = Number(query.locationId);
  const tableId = Number(query.tableId);

  if (!locationId || !tableId) {
    return <h3>Please scan again</h3>;
  }

  return <div>OrderReviewPage</div>;
};

export default OrderReviewPage;
