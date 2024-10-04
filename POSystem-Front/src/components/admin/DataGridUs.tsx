import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowParams,
} from "@mui/x-data-grid";
import theme from "../../globalStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import UserDetails from "./UserDetails";
import axios from "axios";
import Loading from "../Loading";
import AddUser from "./AddUser";

interface Users {
  id: string;
  FULLNAME: string;
  email: string;
  position: "Admin" | "Authorizer" | "Employee";
  status: string;
}

const columns: GridColDef[] = [
  {
    field: "FULLNAME",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "rgb(190,190,190)" }}>{"User Name"}</strong>
    ),
  },
  {
    field: "email",
    flex: 2,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "rgb(190,190,190)" }}>{"Email"}</strong>
    ),
  },
  {
    field: "position",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "rgb(190,190,190)" }}>{"Role"}</strong>
    ),
    renderCell: (params) => {
      const { value } = params;
      return (
        <div
          style={{
            color:
              value === "Admin"
                ? theme.palette.teni.main
                : value === "Authorizer"
                ? theme.palette.telet.main
                : theme.palette.khames.main,
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
    field: "status",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "rgb(190,190,190)" }}>{"Status"}</strong>
    ),
    renderCell: (params) => {
      const { value } = params;
      return (
        <div
          style={{
            color:
              value === "working"
                ? theme.palette.telet.main
                : value === "Not verified"
                ? theme.palette.teni.main
                : "red",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {value}
        </div>
      );
    },
  },
];

export default function UsersDataGrid() {
  const [selectedRow, setSelectedRow] = useState<Users | null>(null); // Explicit typing here
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filtername, setFiltername] = useState("All");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  /*const [error, setError] = useState<string | null>(null);*/

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/users",
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("idtoken") || "",
            },
          }
        );
        console.log(response.data);
        console.log("opsjconcdjncd");
        const usersWithId = response.data.map((user: any, index: number) => ({
          ...user,
          id: user.ID || index.toString(),
        }));
        setUsers(usersWithId);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [open]);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row as Users); // Explicit type assertion here
    setOpen(true);
  };
/*FULLNAME: string;
  email: string;
  position: "Admin" | "Authorizer" | "Employee";
  status: string; */
  const filteredRows = users.filter(
    (row) =>
      (row.FULLNAME?.toLowerCase().includes(searchTerm.toLowerCase())||
     row.email?.toLowerCase().includes(searchTerm.toLowerCase())||
     row.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     row.status?.toLowerCase().includes(searchTerm.toLowerCase())
  )
    &&
      row.position?.toLowerCase().includes(filter.toLowerCase())
  );

  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", width: "60%" }}
              gap={2}
              mb={3}
            >
              <SearchIcon style={{ color: theme.palette.primary.main }} />
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "25%" }}
              />
              <Box>
                <InputLabel id="demo-simple-select-helper-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={filtername}
                  onChange={(e) => {
                    if (e.target.value === "All") {
                      setFilter("");
                      setFiltername("All");
                    } else {
                      setFilter(e.target.value);
                      setFiltername(e.target.value);
                    }
                  }}
                  style={{ marginBottom: "20px" }}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"Authorizer"}>Authorizer</MenuItem>
                  <MenuItem value={"Employee"}>Employee</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box>
              <AddUser />
            </Box>
          </Box>

          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            slots={{
              toolbar: GridToolbar,
            }}
            sx={{
              color: theme.palette.telet.main,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "red",
                color: "red",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                color: "black",
                textAlign: "center",
              },
            }}
            onRowClick={handleRowClick}
          />
          {selectedRow && (
            <UserDetails
              id={selectedRow.id}
              username={selectedRow.FULLNAME}
              email={selectedRow.email}
              role={selectedRow.position}
              isopen={open}
              setisopen={setOpen}
            />
          )}
        </div>
      )}
    </>
  );
}
