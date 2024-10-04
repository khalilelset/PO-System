import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from "@mui/x-data-grid";
import OrderDetails from "./orderdt"; // Ensure correct import
import theme from "../../globalStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios"; // Use axios for API requests

const columns: GridColDef[] = [
  {
    field: "name",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Order Name</strong>,
  },
  {
    field: "description",
    flex: 2,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Description</strong>,
  },
  {
    field: "totalprice",
    type: "number",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Total Price</strong>,
  },
  {
    field: "status",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Status</strong>,
    renderCell: (params) => {
      const { value } = params;
      let color = "blue"; // Default color for "Pending"
      
      if (value === "Accepted") {
        color = "green";
      } else if (value === "Rejected") {
        color = "red";
      }
      return (
        <div
          style={{
            color: color,
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
    field: "date",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Date</strong>,
  },
];
export default function OrdersDataGrid() {
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [filtername, setFiltername] = useState("All");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/ordersbyworker", {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('idtoken')
          }
        }); 
        console.log("API Response:", response.data); 
        
        const orders = response.data; 
        const formattedOrders = orders.map((order:any, index:any) => ({
          id: index,
          name: order.order_name,
          description: order.order_desc,
          totalprice: `$${order.total_price}`,
          quantity:order.quantity,
          unit_price:order.unit_price,
          status: order.order_status,
          reason:order.reason,
          
          date: new Date(order.order_date).toLocaleDateString(),
        }));
        setRows(formattedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders()
  }, []);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
    setOpen(true);
  };
  const filteredRows = rows.filter(
    (row) =>
      (row.name?.toLowerCase().includes(searchTerm.toLowerCase())||
    row.description?.toLowerCase().includes(searchTerm.toLowerCase())||
    row.status?.toLowerCase().includes(searchTerm.toLowerCase())
  ) &&
      (filter === "" || row.status?.toLowerCase() === filter.toLowerCase())
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Box display="flex" alignItems="center" gap={2} mb={3} sx={{ width: '90%' }}>
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
      <Box sx={{ flexGrow: 1, width: '90%'}}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick 
          slots={{
            toolbar: GridToolbar, // Use lowercase key if necessary
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
      </Box>
      {selectedRow && (
        <OrderDetails
          id={selectedRow.id}
          name={selectedRow.name}
          description={selectedRow.description}
          status={selectedRow.status}
          date={selectedRow.date}
          quantity={selectedRow.quantity} // Ensure this prop is provided if used
          unit_price={selectedRow.unit_price}
          totalPrice={selectedRow.totalprice}
          reason={selectedRow.reason} // Ensure this prop is provided if used
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      )}
    </Box>
  );
}
