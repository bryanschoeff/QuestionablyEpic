import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
export default function UserLogTextInput(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  return (
    <TextField
      className={classes.root}
      id="filled-basic"
      label={t("Paste WarcraftLog Link Here")}
      variant="outlined"
      onChange={props.changed}
      value={props.loglink}
      size="small"
      style={{ width: "100%" }}
    />
  );
}