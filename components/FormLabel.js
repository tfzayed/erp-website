import { FormLabel, Typography } from "@mui/material";

const Label = ({ label, required, ...rest }) => {
  return (
    <FormLabel {...rest}>
      {label}
      {required && (
        <Typography
          sx={{
            color: "red",
            marginLeft: "5px",
          }}
          variant="span"
        >
          *
        </Typography>
      )}
    </FormLabel>
  );
};

export default Label;
