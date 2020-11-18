import React, { Component } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import chroma from "chroma-js";
import "./Chart.css";
import moment from "moment";
import i18n from "i18next";
import { Paper } from "@material-ui/core";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilityList: this.props.abilityList,
      data: this.props.chartdata,
      left: "dataMin",
      right: "dataMax",
      refAreaLeft: "",
      refAreaRight: "",
      top: "dataMax+1",
      bottom: "dataMin-1",
      top2: "dataMax+20",
      bottom2: "dataMin-20",
      animation: true,
    };
  }

  drawAreas() {
    // Provided prop array of abilities and guids are mapped for datakeys then made into a unique array of ability names.
    let abilities = Array.from(
      new Set(this.props.abilityList.map((key) => key.ability))
    );
    let cooldowns = this.props.cooldown;
    let dataSet = abilities;
    let dataset2 = cooldowns;
    let areaArr = [];
    let count = 0;
    let len = dataSet.length;
    let len2 = dataset2.length;
    // Sets the Colour Scale of the Damaging Abilities (uses brewer colour scales: See in Resources Folder)
    let colorCodes = chroma.scale("Spectral").colors(len);
    // Sets the Colour Scale of the Cooldown Abilities (uses brewer colour scales: See in Resources Folder)
    let colorCodeCooldowns = chroma.scale("Paired").colors(len2);

    // Pushes Each datakey for ability with a colour from the generated scale to an array for the chart.
    for (let i in dataSet) {
      if (dataSet.hasOwnProperty(i)) {
        areaArr.push(
          <Area
            type="linear"
            fillOpacity={0.9}
            dataKey={abilities[i]}
            stackId="1"
            key={i}
            stroke={null}
            fill={colorCodes[i]}
            animationDuration={300}
            yAxisId="1"
            connectNulls={true}
          />
        );
        count = count + 1;
      }
    }

    // if props.showcds is true Pushes Each datakey for ability with a colour from the generated scale to an array for the chart.
    if (this.props.showcds === true) {
      for (let i in dataset2) {
        if (dataset2.hasOwnProperty(i)) {
          areaArr.push(
            <Area
              type="step"
              fillOpacity={0.5}
              dataKey={cooldowns[i]}
              stackId="1"
              key={i}
              stroke={null}
              fill={colorCodeCooldowns[i]}
              animationDuration={300}
              yAxisId="2"
              connectNulls={true}
            />
          );
          count = count + 1;
        }
      }
    }
    return areaArr;
  }

  // Generates a set of ticks based on the log length, otherwise the chart doesn't show the missing timestamps
  customticks = (loglength) => {
    let ticks = [];
    let tickcount = 0;
    let length = moment(loglength).startOf("second") / 1000;
    for (let i = 0; i < length; i++) {
      ticks = ticks.concat(tickcount + 1000);
      tickcount = tickcount + 1000;
    }
    return ticks.flat();
  };

  // The charts data is set here on component mount. The data is passed from the CooldownPlannerModule.
  componentDidMount() {
    this.setState({ data: this.props.chart });
  }

  // The charts legend is generated here from the charts entries, and is matched with the provided ability list prop to return a matching guid for the wowhead tooltip
  renderColorfulLegendText = (value, entry) => {
    return (
      <a
        data-wowhead={
          "spell=" +
          this.props.abilityList
            .filter((obj) => {
              return obj.ability === value;
            })
            .map((obj) => obj.guid)
        }
      >
        <span style={{ fontSize: "0.7rem" }}>{value}</span>
      </a>
    );
  };

  render() {
    // Shortens long numbers i.e 1000000 will be 1M
    const DataFormater = (number) => {
      if (number > 1000000000) {
        return (number / 1000000000).toString() + "B";
      } else if (number > 1000000) {
        return (number / 1000000).toString() + "M";
      } else if (number > 1000) {
        return (number / 1000).toString() + "K";
      } else if (number === 0) {
        return "";
      }
      return number.toString();
    };

    return (
      <Paper style={{ padding: 10 }} elevation={0}>
        <ResponsiveContainer className="ResponsiveContainer" aspect={4 / 0.8}>
          <AreaChart
            data={
              this.props.dataToShow === true
                ? this.props.unmitigated
                : this.props.mitigated
            }
            margin={{ left: 22, right: -44 }}
            width="100%"
          >
            <XAxis
              dataKey="timestamp"
              scale="time"
              ticks={this.customticks(this.props.endtime)}
              type="number"
              tickFormatter={(timeStr) => moment(timeStr).format("mm:ss")}
              stroke="#f5f5f5"
              domain={[0, this.props.timeend]}
            />
            <YAxis
              yAxisId="1"
              mirror={true}
              stroke="#f5f5f5"
              tickFormatter={DataFormater}
              label={{
                value: i18n.t(
                  "CooldownPlannerChartLabels.UnmitigatedDamageLabel"
                ),
                angle: -90,
                fill: "#f5f5f5",
                fontWeight: "bold",
                position: "left",
                offset: 12,
              }}
            />
            <YAxis
              yAxisId="2"
              orientation="right"
              stroke="#f5f5f5"
              tick={false}
              domain={["dataMin", 5]}
            />
            <Legend
              verticalAlign="bottom"
              iconType="square"
              iconSize={8}
              formatter={this.renderColorfulLegendText}
              wrapperStyle={{
                padding: 2,
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
              width="97%"
              margin={{ right: 44 }}

              // payload={this.props.legendata}
            />
            <Tooltip
              labelStyle={{ color: "#ffffff" }}
              contentStyle={{
                backgroundColor: "#1b1b1b",
                border: "1px solid #1b1b1b",
              }}
              labelFormatter={(timeStr) => moment(timeStr).format("mm:ss")}
            />
            {this.drawAreas()}
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}

export default Chart;
