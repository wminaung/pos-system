import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "@/components/Layout";
import OrderRow from "@/components/OrderRow";
import { useAppSlice } from "@/store/slices/appSlice";
import { theme } from "@/config/myTheme";
import { Typography } from "@mui/material";
import { Order } from "@/typings/types";
import Loading from "@/components/Loading";

const boldStyle = { fontWeight: "bold" };

//*** <<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>> */
const OrderPage = () => {
  const {
    state: { orders },
  } = useAppSlice();

  return (
    <Layout title="Order">
      {!orders.length ? (
        <Typography variant="h2">There is no order yet</Typography>
      ) : (
        showOrdersTable(orders)
      )}
    </Layout>
  );
};
export default OrderPage;
// todo
const showOrdersTable = (orders: Order[]) => {
  return (
    <TableContainer component={Paper} sx={{ bgcolor: theme.second }}>
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
  );
};
