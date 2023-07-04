import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Layout from "@/components/Layout";
import { useBackoffice } from "@/contexts/BackofficeContext";
import OrderRow from "@/components/OrderRow";

const boldStyle = { fontWeight: "bold" };
const OrderPage = () => {
  const { orders } = useBackoffice();

  return (
    <Layout title="Order">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order Id</TableCell>
              <TableCell sx={boldStyle} align="right">
                No. of menus
              </TableCell>
              <TableCell sx={boldStyle} align="right">
                Table Id
              </TableCell>
              <TableCell sx={boldStyle} align="right">
                Proce
              </TableCell>
              <TableCell sx={boldStyle} align="right">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};
export default OrderPage;
