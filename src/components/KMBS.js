import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper, Button, Box, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setGlobalState } from "./context";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import axios from "axios";
import ErrorSnackbar from "./Snackbar";
import { useGlobalState } from "./context";

export const KBMS = () => {
  const columns = [
    {
      headerClassName: "header",
      field: "name",
      headerName: "FAQ Name",
      width: 350,
      sortable: false,
    },
    {
      headerClassName: "header",
      field: "type",
      headerName: "Type",
      width: 120,
    },
    {
      headerClassName: "header",
      field: "domain",
      headerName: "Domain",
      width: 140,
    },
    {
      headerClassName: "header",
      field: "answer",
      headerName: "Answer",
      width: 650,
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
  const [rules, setRules] = useState([]);
  let navigate = useNavigate();
  const ruleCollectionRef = collection(db, "rules");
  useEffect(() => {
    const getRules = async () => {
      setGlobalState("loading", true);
      const data = await getDocs(ruleCollectionRef);
      setRules(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setGlobalState("loading", false);
    };
    getRules();
  }, []);

  const clickDelete = async (ruleId) => {
    try {
      setGlobalState("loading", true);
      // Delete the rule document from Firestore
      await deleteDoc(doc(db, "rules", ruleId));
      var myParams = {
        data: "KB Updated",
      };
      await axios
        .post("http://localhost:5000/api/noti", myParams)
        .then(function (response) {
          let output = response.data;
          console.log(output);
        })
        .catch(function (error) {
          console.log(error);
        });
      // Update the rules state by removing the deleted user
      setRules((prevRules) => prevRules.filter((rule) => rule.id !== ruleId));
      setGlobalState("loading", false);
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  const handleRowClick = (params) => {
    setGlobalState("EditingEntry", params.row);
    navigate("editRule");
  };

  const createNew = () => {
    let dummy = {
      name: "",
      answer: "",
      domain: "",
      type: "",
      dataset: [],
    };
    setGlobalState("EditingEntry", dummy);
    navigate("editRule");
  };

  const [success] = useGlobalState("success");
  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        setGlobalState("success", false);
      }, 2000);

      // Clear the timeout to avoid unnecessary state updates
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  return (
    <Paper style={{ padding: "30px", marginTop: "60px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={8}>
          <Typography variant="h3" style={{ marginBottom: "25px" }}>
            FAQs List
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
              rows={rules}
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
                  paginationModel: { pageSize: 25 },
                  // paginationModel: { paddresss: 0, paddresssSize: 5 },
                },
              }}
              paddresssSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Box>
        </div>
      </Grid>
      {success && (
        <ErrorSnackbar
          message={"Database successfully updated"}
          c={"success"}
        ></ErrorSnackbar>
      )}
    </Paper>
  );
};
