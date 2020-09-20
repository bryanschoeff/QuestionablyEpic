import React from "react";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";

export default function UserLogTextInput(props) {
  const { t } = useTranslation();

  return (
    <TextField
      error={props.reportid !== "err" ? false : true}
      id="filled-basic"
      label={
        props.reportid !== "err"
          ? t("HDUserInputs.Loglink")
          : "Incorrect Link / Report ID Provided :("
      }
      variant="outlined"
      onChange={props.changed}
      value={props.loglink}
      size="small"
      style={{ width: "100%", minWidth: 600 }}
    />
  );
}