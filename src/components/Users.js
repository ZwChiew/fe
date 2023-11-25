import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper, Button, Box, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setGlobalState } from "./context";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export const Users = () => {
  const columns = [
    {
      headerClassName: "header",
      field: "id",
      headerName: "ID",
      width: 230,
      sortable: false,
    },
    {
      headerClassName: "header",
      field: "name",
      headerName: "Username",
      width: 140,
    },
    {
      headerClassName: "header",
      field: "fullname",
      headerName: "Name",
      width: 150,
    },
    {
      headerClassName: "header",
      field: "position",
      headerName: "Position",
      width: 150,
      sortable: false,
    },

    {
      headerClassName: "header",
      field: "address",
      headerName: "Address",
      width: 630,
      sortable: false,
    },
    {
      field: "edit",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleRowClick(params)}
        >
          {" "}
          Edit{" "}
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => clickDelete(params.row.id)}
        >
          {" "}
          Delete{" "}
        </Button>
      ),
    },
  ];
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
  const userCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);

  const clickDelete = async (userId) => {
    try {
      setGlobalState("loading", true);
      // Delete the user document from Firestore
      await deleteDoc(doc(db, "users", userId));
      // Update the users state by removing the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setGlobalState("loading", false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleRowClick = (params) => {
    setGlobalState("EditingEntry", params.row);
    navigate("editUser");
  };

  const createNew = () => {
    let dummy = {
      name: "",
      password: "",
      fullname: "",
      position: "",
      address: "",
      messages: [
        "Welcome to the strata expert system, how can I help you today ? Given below is a sample question",
        "What is the minimum requirement to join the strata management act 757 ?",
        "To join as a commitee, one must be at least 21 years old and not a defaulter",
      ],
    };
    setGlobalState("EditingEntry", dummy);
    navigate("editUser");
  };

  return (
    <Paper style={{ padding: "30px", marginTop: "60px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={8}>
          <Typography variant="h3" style={{ marginBottom: "25px" }}>
            Users List
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Typography variant="h3" style={{ marginBottom: "25px" }}>
            <Button
              onClick={() => createNew()}
              size="large"
              variant="contained"
            >
              Create
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              "& .header": {
                fontSize: "20px",
                outline: "none !important",
              },
            }}
          >
            <DataGrid
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              disableRowSelectionOnClick
              rows={users}
              columns={columns}
              sx={{
                boxShadow: 2,
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: "16px",
                },
                "& .MuiDataGrid-root": {
                  outline: "none !important",
                },
                "& .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: { paddresss: 0, paddresssSize: 5 },
                },
              }}
              //paddresssSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Box>
        </div>
      </Grid>
    </Paper>
  );
};
