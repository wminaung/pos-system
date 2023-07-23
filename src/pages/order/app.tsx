import Navigate from "@/components/Navigate";
import { prisma } from "@/utils/db";
import { Typography } from "@mui/material";
import { location, table } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";

interface Props {
  table:
    | (table & {
        location: location | null;
      })
    | null;
}

const OrderApp = ({ table }: Props) => {
  if (!table) {
    return (
      <Typography variant="h6" textAlign={"center"}>
        There is no Table Please Create table first from{" "}
        <Link href={"/backoffice"}> backoffice</Link>
      </Typography>
    );
  }

  const tableId = table.id;
  const locationId = table.location_id;
  return <Navigate to={`/order/location/${locationId}/table/${tableId}`} />;
};

export default OrderApp;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const table = await prisma.table.findFirst({
    include: {
      location: true,
    },
  });

  return {
    props: {
      table: table,
    },
  };
};
