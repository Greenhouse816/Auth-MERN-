import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import PasswordStrengthBar from "react-password-strength-bar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  value,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  showBar,
  passValue,
  barClass,
  onChangeScore,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      value={value}
      InputProps={
        name === "password" || name === "oldPassword"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
    {showBar ? (
      <PasswordStrengthBar
        password={passValue}
        className={barClass}
        onChangeScore={onChangeScore}
        minLength={6}
      />
    ) : null}
  </Grid>
);

export default Input;
