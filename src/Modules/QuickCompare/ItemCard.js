import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {
  getTranslatedItemName,
  buildStatString,
  getItemIcon,
} from "../Engine/ItemUtilities";
import "./ItemCard.css";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import socketImage from "../../Images/Resources/EmptySocket.png";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ItemCard(props) {
  const classes = useStyles();
  const item = props.item;
  const statString = buildStatString(item.stats, item.effect);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const test = false;

  const itemQuality = (quality) => {
    switch (quality) {
      case "Legendary":
        return "#ff8000";
        break;
      case "Epic":
        return "#a335ee";
        break;
      case "Uncommon":
        return "#328CE3"; // Previously #0070dd
        break;
      case "Common":
        return "#1eff00";
        break;
      default:
        return "#fff";
    }
  };

  const upgradeColor = (num) => {
    if (num > 0) {
      return "#4CBB17";
    } else if (num < 0) {
      return "#ad2c34";
    } else {
      return "#fff";
    }
  };

  const socket =
    props.item.socket === "Yes" ? (
      <div style={{ display: "inline" }}>
        <img
          src={socketImage}
          width={15}
          height={15}
          style={{ verticalAlign: "middle" }}
        />{" "}
        /
      </div>
    ) : null;

  const tertiary =
    props.item.tertiary !== "None" ? (
      <div style={{ display: "inline" }}> / {props.item.tertiary} </div>
    ) : null;

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card className={classes.root} variant="outlined">
        {/* <CardActionArea disabled={true}> */}
        <Grid
          container
          display="inline-flex"
          wrap="nowrap"
          justify="space-between"
        >
          <Grid item xs="auto">
            <CardContent
              style={{
                padding: "4.5px 4.5px 0.5px 4.5px",
                display: "inline-flex",
              }}
            >
              <div className="container">
                <img
                  alt="img"
                  width={56}
                  height={56}
                  src={getItemIcon(item.id)}
                  style={{
                    borderRadius: 4,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: itemQuality("Uncommon"),
                  }}
                />
                <div className="bottom-right"> {item.level} </div>
              </div>
            </CardContent>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <CardContent style={{ padding: 4, width: "100%" }}>
            <Grid
              item
              container
              display="inline"
              direction="column"
              justify="space-around"
              xs="auto"
            >
              <Grid
                container
                item
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
                style={{ width: "100%" }}
              >
                <Grid item xs={11} display="inline">
                  <Typography
                    variant="subtitle1"
                    wrap="nowrap"
                    display="inline"
                    align="left"
                    style={{ color: itemQuality("Uncommon") }}
                  >
                    {getTranslatedItemName(item.id, currentLanguage)}
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    paddingLeft: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    wrap="nowrap"
                    display="inline"
                    align="center"
                    style={{
                      color: upgradeColor(props.item.softScore),
                      paddingLeft: "2px",
                      paddingRight: "2px",
                    }}
                  >
                    {props.item.softScore}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                item
                container
                display="inline"
                direction="row"
                xs="auto"
                justify="space-between"
              >
                <Grid item xs={11}>
                  <Typography
                    variant="subtitle1"
                    wrap="nowrap"
                    display="block"
                    align="left"
                  >
                    {socket} {statString} {tertiary}
                  </Typography>
                </Grid>

                <Grid item xs={1} display="inline-flex" align="center">
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon
                      style={{ color: "#ad2c34", paddingTop: 2 }}
                      fontSize="small"
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        {/* </CardActionArea> */}
      </Card>
    </Grid>
  );
}
