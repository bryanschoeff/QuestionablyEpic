import React from "react";
import { useTranslation } from "react-i18next";
import "./Covenants.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { getItemIcon } from "../Engine/ItemUtilities";

const useStyles = makeStyles({
  root: { padding: 0, height: 26 },
});

export default function ConduitObject(props) {
  const { t } = useTranslation();
  const conduit = props.conduit;
  //console.log(conduit);
  const classes = useStyles();

  const itemQuality = (quality) => {
    switch (quality) {
      case "Legendary":
        return "#ff8000";
        break;
      case "Epic":
        return "#a335ee";
        break;
      case "Uncommon":
        return "#328CE3";
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

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Card className={classes.root} variant="outlined">
        <CardActionArea disabled={false}>
          <Grid
            container
            display="inline-flex"
            wrap="nowrap"
            justify="space-between"
          >
            <Grid item xs="auto">
              <CardContent
                style={{
                  padding: "0px",
                  display: "inline-flex",
                }}
              >
                <div className="container">
                  <img
                    alt=""
                    width={26}
                    height={26}
                    src={conduit.icon}
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: itemQuality("Uncommon"),
                      padding: 0,
                      margin: 0,
                    }}
                  />
                  <div
                    className="bottom-right"
                    // style={{ color: itemQuality("Uncommon") }}
                  >
                    {conduit.itemLevel}
                  </div>
                </div>
              </CardContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <CardContent style={{ padding: 0, width: "100%" }}>
              <Grid
                container
                display="inline"
                direction="column"
                justify="space-around"
                xs="auto"
              >
                <Grid
                  container
                  wrap="nowrap"
                  justify="space-between"
                  alignItems="center"
                  style={{ width: "100%" }}
                >
                  <Grid item xs={10} display="inline">
                    <Typography
                      // variant="subtitle1"
                      wrap="nowrap"
                      display="inline"
                      align="left"
                      style={{
                        //color: itemQuality("Uncommon"),
                        color: 'Goldenrod',
                        fontSize: "12px",
                        paddingLeft: "4px",
                      }}
                    >
                      {conduit.name}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid
                    item
                    xs={2}
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
                        color: upgradeColor(conduit.hps),
                        paddingLeft: "2px",
                        paddingRight: "2px",
                        fontSize: "14px",
                      }}
                    >
                      {conduit.hps}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
