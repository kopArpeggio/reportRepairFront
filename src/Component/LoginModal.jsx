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

import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import Swal from "sweetalert2";

// or via CommonJS

function LoginModal({ open, setOpen }) {
  const [formData, setFormData] = useState("");

  const test = () => {
    localStorage.setItem("Auth", "Success");
    location.reload();
  };
  const SweetAlert = () => {
    handleClose();
    Swal.fire({
      icon: "error",
      title: "เข้าสู่ระบบ",
      text: "Password หรือ Username ผิดพลาด",
    });
  };

  const handleClose = () => setOpen(false);

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
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
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
            <Typography
              id="transition-modal-title"
              variant="h5"
              sx={{ fontFamily: "'Prompt', sans-serif" }}
              component="h2"
            >
              เข้าสู่ระบบ
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e?.preventDefault();
                  formData?.username == "admin" && formData?.password == "12345"
                    ? test()
                    : SweetAlert();
                }}
              >
                <TextField
                  id="standard-basic"
                  label="ชื่อผู้ใช้"
                  variant="standard"
                  onChange={(e) => {
                    setFormData({ ...formData, username: e?.target?.value });
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "28px",
                      "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" },
                    },
                  }}
                  sx={{
                    width: "100%",
                    fontFamily: "'Prompt', sans-serif",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รหัสผ่าน"
                  variant="standard"
                  sx={{ width: "100%", mt: 4 }}
                  type="password"
                  onChange={(e) => {
                    setFormData({ ...formData, password: e?.target?.value });
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
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  sx={{ mt: 4, mb: 2 }}
                  startIcon={<LoginIcon />}
                >
                  เข้าสู่ระบบ
                </Button>
              </Box>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default LoginModal;
