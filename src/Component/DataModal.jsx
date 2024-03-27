import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupIcon from "@mui/icons-material/Group";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { updateReportRepairById } from "../apis/reportRepairApi";
import { getImageUrl } from "../utils/utils";

function dataModal({ setOpen, open, item, getReport }) {
  const [file, setFile] = useState();
  const [formData, setFormData] = React.useState();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const style = {
    fontFamily: "'Prompt', sans-serif" ,
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setOpen(false);
    getReport();
  };
  return (
    <div>
      {" "}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              รายละเอียดของพัสดุ
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e?.preventDefault();
                  updateReportRepairById({ ...formData, id: item?.id });
                  handleClose();
                }}
              >
                <TextField
                  id="standard-basic"
                  label="พัสดุ"
                  variant="standard"
                  defaultValue={item?.row?.item}
                  onChange={(e) => {
                    setFormData({ ...formData, item: e?.target?.value });
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "28px",
                      "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EditIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="standard-basic"
                  label="เบอร์โทรศัพท์"
                  variant="standard"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item?.row?.phoneNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, phoneNumber: e?.target?.value });
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "28px",
                      "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SmartphoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="standard-basic"
                  label="แผนก"
                  variant="standard"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item?.row?.department}
                  onChange={(e) => {
                    setFormData({ ...formData, department: e?.target?.value });
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "28px",
                      "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="standard-basic"
                  label="ยี่ห้อ"
                  variant="standard"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item?.row?.brand}
                  onChange={(e) => {
                    setFormData({ ...formData, brand: e?.target?.value });
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "28px",
                      "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  sx={{ mt: 2 }}
                  startIcon={<CloudUploadIcon />}
                >
                  รูปภาพ
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setFile(reader.result);
                        setFormData({
                          ...formData,
                          picture: e?.target?.files[0],
                        });
                      };
                      reader.readAsDataURL(e?.target?.files[0]);
                    }}
                  />
                </Button>
                <Box
                  sx={{
                    display: "grid",
                    justifyContent: "center",
                    width: "160",
                  }}
                >
                  <img
                    // src={!file ? "/assets/img/no-image.png" : file}
                    src={
                      file
                        ? file
                        : item?.row?.picture
                        ? getImageUrl(item?.row?.picture)
                        : "/assets/img/no-image.png"
                    }
                    style={{ width: 150 }}
                  />
                </Box>
                <br />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 3 }}
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  บันทึก
                </Button>
              </Box>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default dataModal;
