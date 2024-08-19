import { theme } from "../../themes/Default";

export const styles = {
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#5e5d5c",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  typo: {
    margin: theme.spacing(3, 3, 2),
  },
  passBar: {
    width: "100%",
  },
};
