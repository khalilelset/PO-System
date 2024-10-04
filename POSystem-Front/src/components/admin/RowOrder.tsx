import { styled } from "@mui/material/styles";
import { useState } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TableBody } from "@mui/material";
//import OrderDetails from "./OrderDetails";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {

    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "blue";
    case "accepted":
      return "green";
    case "rejected":
      return "red";
    default:
      return "black"; // Default color if status doesn't match any case
  }
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Row {
  name: string;
  orderby: string;
  unitprice: number;
  quantity: number;
  description: string;
  status: "pending" | "accepted" | "rejected";
  date: string;
}

interface RowOrderProps {
  row: Row;
}

const RowOrder: React.FC<RowOrderProps> = ({ row }) => {
  const [isopen, setisopen] = useState(false);
  return (
    <TableBody>
      {isopen ? (
     <></>
      ) : (
        <StyledTableRow key={row.name} onClick={() => setisopen(!isopen)}>
          <StyledTableCell component="th" scope="row">
            {row.name}
          </StyledTableCell>
          <StyledTableCell>{row.description} </StyledTableCell>
          <StyledTableCell>{row.unitprice * row.quantity}$</StyledTableCell>
          <StyledTableCell sx={{ color: getStatusColor(row.status) }}>
            {row.status}
          </StyledTableCell>
        </StyledTableRow>
      )}
    </TableBody>
  );
};

export default RowOrder;
