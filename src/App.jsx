import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import setupAxios from "./axios/setupAxios";

import {
  AppBar,
  Backdrop,
  Button,
  CardMedia,
  Fade,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DataModal from "./Component/DataModal";
import MenuIcon from "@mui/icons-material/Menu";
import LoginModal from "./Component/LoginModal";
import { useEffect } from "react";
import { deleteReportById, getAllReport } from "./apis/reportRepairApi";
import CreateModal from "./Component/CreateModal";
import { getImageUrl } from "./utils/utils";

function App() {
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState("");
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [openCreateReportRepair, setopenCreateReportRepair] =
    React.useState(false);
  const [reportRepair, setReportRepair] = React.useState(false);

  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleOpenCreateReportRepair = () => setopenCreateReportRepair(true);
  setupAxios(axios);

  const isAuthorized = localStorage.getItem("Auth");

  const getReport = () => {
    getAllReport().then((res) => {
      setReportRepair(res?.data);
    });
  };

  useEffect(() => {
    getReport();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "item",
      headerName: "พัสดุ",
      width: 250,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "เบอร์โทรศัพท์",
      type: "number",
      width: 180,
      editable: true,
      valueGetter: (params) =>
        `${
          params?.row?.phoneNumber?.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "$1-$2-$3"
          ) || ""
        } `,
    },
    {
      field: "name",
      headerName: "ชื่อ-นามสกุล",
      width: 260,
      editable: true,
    },
    {
      field: "department",
      headerName: "แผนก",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },

    {
      field: "brand",
      headerName: "ยี่ห้อ",
      type: "number",
      width: 160,
      editable: true,
    },
    {
      field: "picture",
      headerName: "รูปภาพ",
      type: "number",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <CardMedia
          component="img"
          height="150px"
          image={
            params?.row?.picture
              ? getImageUrl(params?.row?.picture)
              : "/assets/img/no-image.png"
          }
        />
      ),
    },
    {
      field: "Button",
      headerName: "",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      renderCell: (params) =>
        isAuthorized ? (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setOpen(true);
                setItem(params);
              }}
            >
              <ModeEditIcon />
              แก้ไข
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteReportById(params?.id).then(() => {
                  getAllReport().then((res) => {
                    setReportRepair(res?.data);
                  });
                });
              }}
            >
              <ModeEditIcon />
              ลบ
            </Button>
          </>
        ) : (
          ""
        ),
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="promptRegular">
        <AppBar position="sticky">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="inherit" onClick={handleOpenCreateReportRepair}>
              แจ้งซ่อม
            </Button>
            {isAuthorized ? (
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  localStorage.removeItem("Auth");
                  location.reload();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={handleOpenLoginModal}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ height: "900px", width: "100%" }}>
        <DataModal
          setOpen={setOpen}
          open={open}
          item={item}
          getReport={getReport}
        />
        <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
        <CreateModal
          open={openCreateReportRepair}
          setOpen={setopenCreateReportRepair}
          getReport={getReport}
        />
        <DataGrid
          className="promptRegular"
          style={{
            fontFamily: "'Prompt', sans-serif",
            background: "rgba(235, 235, 235, 0.84)",
          }}
          rows={reportRepair}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          getRowHeight={(params) => {
            return 180;
          }}
        />
      </Box>
    </>
  );
}

export default App;
