import { Box, Modal } from "@mui/material";

const FormModal = ({ children, width, open, setOpen, reset }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    maxHeight: "80%",
    overflowY: "auto",
  };
  const handleClose = () => {
    if (reset) {
      reset();
    }
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default FormModal;
