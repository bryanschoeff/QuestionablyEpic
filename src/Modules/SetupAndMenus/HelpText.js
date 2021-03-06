import { render } from "react-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, Grid, AccordionDetails, AccordionSummary, Typography, Divider, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
    padding: "8px 16px 8px 16px",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function HelpText(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  let helpText = props.text;

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={true} elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.column}>
            <Typography className={classes.heading} style={{ color: "limegreen" }} align="left" variant="h6">
              {t("HowToUse")}
            </Typography>
          </div>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          <Typography style={{ color: "##fffff7", marginBottom: 0 }} align="left" variant="subtitle1" display="inline" paragraph>
            {helpText}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
