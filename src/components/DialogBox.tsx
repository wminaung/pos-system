import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { theme } from "@/config/myTheme";
import { Box } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, backgroundColor: theme.main, color: theme.white }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
interface Props {
  children: React.ReactNode;
  btnText: string;
  title: string;
  width?: string;
}
export default function DialogBox({ children, btnText, title, width }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        style={{ backgroundColor: "#025464" }}
        sx={{
          width: width || "180px",
        }}
        startIcon={<AddIcon fontSize="large" />}
        onClick={handleClickOpen}
      >
        {btnText}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
