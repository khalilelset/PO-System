/* eslint-disable @typescript-eslint/ban-ts-comment */
import  { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from "@mui/x-data-grid";
import OrderDetails from "./OrderDetails";
import theme from "../../globalStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from 'axios';
import Loading from "../Loading";

interface Orders {
  ID: string;
  order_name: string;
  order_desc: string;
  link: string;
  price_diff: any;
  order_status: string;
  order_date: string;
  quantity: number;
  unit_price: number;
  total_price:number;
  reason:null;
  analysis:string;
  score:null;
  worker_id:string;
  user_fullname:string;
}


const columns: GridColDef[] = [
  {
    field: "order_name",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Order Name</strong>,
  },
  {
    field: "user_fullname",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Order By</strong>,
  },
  {
    field: "order_desc",
    flex: 2,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Description</strong>,
  },
  {
    field: "total_price",
    type: "number",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Total Price</strong>,
  },
  {
    field: "order_status",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Status</strong>,
    renderCell: (params) => {
      const { value } = params;
      
      return (
        <div
          style={{
            color: value === "Accepted" ? "green" : value === "Rejected" ? "red" : "blue",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {value}
        </div>
      );
    },
  },
  {
    field: "order_date",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Date</strong>,
  },
];



export default function OrdersDataGrid() {

  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [filtername, setFiltername] = useState("All");
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/orders", {   
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('idtoken') || ''
          }
        });
        
        //const response = await axios.get(');
        
        const ordersWithId = response.data.map((orders: any, index: number) => ({
          ...orders,
          id: orders.ID || index.toString(), 
          total_price: `${orders.total_price}$`,
          date: new Date(orders.order_date).toLocaleDateString()
        }));
         setOrders(ordersWithId);
      } catch (err ) {
       // setError('Failed to fetch users');
       console.log(err)
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);


  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
    setOpen(true);
  };


/*
  ID: string;
  order_name: string;
  order_desc: string;
  link: string;
  price_diff: any;
  order_status: string;
  order_date: string;
  quantity: number;
  unit_price: number;
  total_price:number;
  reason:null;
  analysis:string;
  score:null;
  worker_id:string;
  user_fullname:string;
*/

  const filteredRows = orders.filter(
    (row) =>
      (row.order_name?.toLowerCase().includes(searchTerm.toLowerCase())||
    row.order_desc?.toLowerCase().includes(searchTerm.toLowerCase())||
    row.order_status?.toLowerCase().includes(searchTerm.toLowerCase())||
    row.user_fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  )
    &&
      (filter === "" || row.order_status?.toLowerCase() === filter.toLowerCase())
  );

  return (
    <>
   {loading ? (<Loading/>) : (
    <div style={{ height: 400, width: "100%" }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <SearchIcon style={{ color: theme.palette.primary.main }} />
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "25%" }}
        />
        <Box>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={filtername}
            onChange={(e) => {
              const value = e.target.value;
              setFilter(value === "All" ? "" : value.toLowerCase());
              setFiltername(value);
            }}
            style={{ marginBottom: "20px" }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Accepted"}>Accepted</MenuItem>
            <MenuItem value={"Rejected"}>Rejected</MenuItem>
          </Select>
        </Box>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        //@ts-ignore
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        sx={{
          color: theme.palette.text.primary,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            color: theme.palette.text.primary,
            textAlign: "center",
          },
        }}
        onRowClick={handleRowClick}
      />
      {selectedRow && (
        <OrderDetails
          name={selectedRow.order_name}
          orderby={selectedRow.user_fullname}
          unitprice={selectedRow.unit_price}
          quantity={selectedRow.quantity}
          description={selectedRow.order_desc}
          status={selectedRow.order_status}
          date={selectedRow.date}
          link={selectedRow.link}
          reason={selectedRow.reason}
          isopen={open}
          setisopen={setOpen}
        />
      )}
    </div>)}
    </>
  );
}