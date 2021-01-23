import {
  addMissingTimestamps,
  getUniqueObjectsFromArray,
  reduceTimestamps,
  fightDurationCalculator,
  importHealerLogData,
  importDamageLogData,
  importCastsLogData,
  durationmaker,
  sumDamage,
  importSummaryData,
  importExternalCastsLogData,
  importCharacterIds,
  importEnemyCasts,
  importEnemyIds,
} from "../Functions/Functions";
import moment from "moment";

/* =============================================
   This Function Imports all the Data for the Chart/Log Details
   component. This Function should be bound to the Component that is imported into, so all data
   retreived by it is returned/setting the state in that component. This is
   sent down through the Fight Selector Button Component, down to the Log
   Import Component. When a menu item generated by the Logimport function
   is clicked, It will call this function (as well as a few others, i.e
   setting the current report id etc), The start time and end time are
   passed through to this function.
  =============================================*/

// PLease Note that all the 'this.' statements in this file do not actually affect this file.
// They are refering to the component the function is imported into.
//
function getUnique(arr, comp) {
  // store the comparison  values in array
  const unique = arr
    .map((e) => e[comp])
    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the false indexes & return unique objects
    .filter((e) => arr[e])
    .map((e) => arr[e]);
  return unique;
}

export default async function updatechartdata(starttime, endtime) {
  //  Set the Loading State of the loading spinner so that the user knows data is being loaded.
  this.setState({ loadingcheck: true });
  let healerDurations = [];
  let sortedDataUnmitigatedWithCooldowns = [];
  let sortedDataMitigatedDamageWithCooldowns = [];
  let sortedDataUnmitigatedNoCooldowns = [];
  let sortedDataMitigatedDamageNoCooldowns = [];
  let damagingAbilities = [];

  // Fight Length of the selected report is calculated and coverted to seconds as a string
  const fightLength = moment
    .duration(fightDurationCalculator(endtime, starttime))
    .asSeconds()
    .toString();

  // Import Healer Info from the Logs healing table for each healing class.
  // See: "importHealerLogData" in the functions file for more info.
  const healers = await importHealerLogData(
    starttime,
    endtime,
    this.state.reportid
  );

  const playerIDs = await importCharacterIds(
    starttime,
    endtime,
    this.state.reportid
  );

  const enemyIDs = await importEnemyIds(
    starttime,
    endtime,
    this.state.reportid
  );

  // Import summary Info from the Logs Summary table.
  // This contains our data for Gear, Stats, Conduits, Soulbinds etc etc.
  // See: "importSummaryData" in the functions file for more info.
  const summary = await importSummaryData(
    starttime,
    endtime,
    this.state.reportid
  );

  // Import all the damage-taken from the log for friendly targets.
  // See: "importDamageLogData" in the functions file for more info.
  const damage = await importDamageLogData(
    starttime,
    endtime,
    this.state.reportid
  );

  // Map Healer Data for ID, Name and Class.
  const healerIDName = healers.map((key) => ({
    id: key.id,
    name: key.name,
    class: key.type,
  }));

  // Import the log data for Casts for each healer in the log.
  // See: "importCastsLogData" fpr mpre info.
  const cooldowns = await importCastsLogData(
    starttime,
    endtime,
    this.state.reportid,
    healers.map((key) => key.id)
  );

  const externals = await importExternalCastsLogData(
    starttime,
    endtime,
    this.state.reportid,
    healers.map((key) => key.id)
  );

  const enemyCasts = await importEnemyCasts(
    starttime,
    endtime,
    this.state.reportid
  );
  console.log(enemyCasts);

  // Map the damaging abilities and guids to an array of objects.
  damage.map((key) =>
    damagingAbilities.push({
      ability: key.ability.name,
      guid: key.ability.guid,
    })
  );

  // Filter the array to unique entries for Ability name and Guid.
  const uniqueArray = damagingAbilities.filter(
    (ele, ind) =>
      ind ===
      damagingAbilities.findIndex(
        (elem) => elem.ability === ele.ability && elem.guid === ele.guid
      )
  );

  // Map the cooldown data imported into an array of cooldowns in this format (HealerName - CooldownName).
  // Then We make a unique list of Cooldowns from the previously mapped array, then create an array from this.
  // We do this for the chart data as these are needed for dataKeys for the chart.

  const uniqueArrayCD = Array.from(
    new Set(
      cooldowns.map(
        (key) =>
          healerIDName
            .filter((obj) => {
              return obj.id === key.sourceID;
            })
            .map((obj) => obj.name) +
          " - " +
          key.ability.name
      )
    )
  );

  // Map the cooldown casts into objects for the chart.
  // Them we map Cooldown Casts and using the duration maker function to add extra data points for the times the cooldown should be active.
  // These are pushed into the new array healerDurations during the map
  cooldowns
    .map((key) => ({
      ability: key.ability.name,
      guid: key.ability.guid,
      timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
        .startOf("second")
        .valueOf(),
      [healerIDName
        .filter((obj) => {
          return obj.id === key.sourceID;
        })
        .map((obj) => obj.name) +
      " - " +
      key.ability.name]: 1,
    }))
    .map((key) =>
      healerDurations.push(
        durationmaker(
          key.guid,
          key.timestamp,
          Object.getOwnPropertyNames(key).slice(3),
          moment(fightDurationCalculator(endtime, starttime))
            .startOf("second")
            .valueOf()
        )
      )
    );

  // Attempting to create a list for Custom legend to use with wowhead tooltip
  // Create Ability List With Guids for legend (Testing)
  // Get Unique Objects from Ability list for the custom legend
  // Concat the Unique Ability List with the Cooldown List
  const uniqueArrayNewForLegend = getUniqueObjectsFromArray(
    damage.map((key) => ({
      value: key.ability.name,
      id: key.ability.guid,
    })),
    "id"
  ).concat(uniqueArrayCD);

  // Map the Unmitigated damage taken & timestamps.
  // Timestamps are caluated via function by minusing the start of the the fight in ms from the end in ms.
  // Then converted to the started of the nearest second otherwise the chart will show each individual ms.
  // We Don't need to delve that deep into MS for the chart.
  const unmitigatedDamageMap = damage.map((key) => ({
    timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
      .startOf("second")
      .valueOf(),
    [key.ability.name]: key.unmitigatedAmount,
  }));

  // Map the Mitigated damage taken & timestamps.
  // Timestamps are caluated via function by minusing the start of the the fight in ms from the end in ms.
  // Then converted to the started of the nearest second otherwise the chart will show each individual ms.
  // We Don't need to delve that deep into MS for the chart.
  const mitigatedDamageMap = damage.map((key) => ({
    timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
      .startOf("second")
      .valueOf(),
    [key.ability.name]: key.amount,
  }));

  // Map cooldown casts for the Timeline Table.
  const updateddatacastsTimeline = cooldowns.map((key) => ({
    ability: key.ability.name,
    guid: key.ability.guid,
    timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
      .startOf("second")
      .format("mm:ss"),
    name: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    class: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.class)
      .toString(),
  }));

  // Map cooldown casts for the Timeline Table.
  const updateddatacastsExternalsTimeline = externals.map((key) => ({
    ability: key.ability.name,
    guid: key.ability.guid,
    timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
      .startOf("second")
      .format("mm:ss"),
    caster: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    target: playerIDs
      .filter((obj) => {
        return obj.id === key.targetID;
      })
      .map((obj) => obj.name)
      .toString(),
    casterClass: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.class)
      .toString(),
    targetClass: playerIDs
      .filter((obj) => {
        return obj.id === key.targetID;
      })
      .map((obj) => obj.class)
      .toString(),
  }));

  console.log(updateddatacastsExternalsTimeline);

  // Map cooldown casts for the Timeline Table.
  const enemyCastsTimeline = enemyCasts.map((key) => ({
    ability: key.ability.name,
    guid: key.ability.guid,
    timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
      .startOf("second")
      .format("mm:ss"),
    name: enemyIDs
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    id: key.sourceID,
    parentId: key.sourceID,
  }));

  const updateddatacastsExternalTimeline = cooldowns.map((key) => ({
    ability: key.ability.name,
    guid: key.ability.guid,
    timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
      .startOf("second")
      .format("mm:ss"),
    name: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    class: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.class)
      .toString(),
  }));

  // Flatten the map we just created into an array.
  let cooldownwithdurations = healerDurations.flat();

  // Create any missing timestamps in the fight (i.e no damage, these are needed so the chart doesn't stretch the areas to the next point.)
  let times = addMissingTimestamps(fightDurationCalculator(endtime, starttime));

  // Concat the damage arrays with the cooldown durations with the missing durations
  let unmitigatedDamageFromLogWithTimesAddedAndCooldowns = unmitigatedDamageMap.concat(
    cooldownwithdurations,
    times
  );
  let mitigatedDamageFromLogWithTimesAddedAndCooldowns = mitigatedDamageMap.concat(
    cooldownwithdurations,
    times
  );
  let unmitigatedDamageFromLogWithTimesAddedNoCooldowns = unmitigatedDamageMap.concat(
    times
  );
  let mitigatedDamageFromLogWithTimesAddedNoCooldowns = mitigatedDamageMap.concat(
    times
  );

  // Sort the Arrays by Timestamp
  unmitigatedDamageFromLogWithTimesAddedAndCooldowns.sort((a, b) =>
    a.timestamp > b.timestamp ? 1 : -1
  );
  mitigatedDamageFromLogWithTimesAddedAndCooldowns.sort((a, b) =>
    a.timestamp > b.timestamp ? 1 : -1
  );
  unmitigatedDamageFromLogWithTimesAddedNoCooldowns.sort((a, b) =>
    a.timestamp > b.timestamp ? 1 : -1
  );
  mitigatedDamageFromLogWithTimesAddedNoCooldowns.sort((a, b) =>
    a.timestamp > b.timestamp ? 1 : -1
  );

  // Reduce the arrays removing any duplicate timestamps//
  let unmitigatedDamageTimestampsReducedWithCooldowns = reduceTimestamps(
    unmitigatedDamageFromLogWithTimesAddedAndCooldowns
  );
  let mitigatedDamageTimestampsReducedWithCooldowns = reduceTimestamps(
    mitigatedDamageFromLogWithTimesAddedAndCooldowns
  );
  let unmitigatedDamageTimestampsReducedNoCooldowns = reduceTimestamps(
    unmitigatedDamageFromLogWithTimesAddedNoCooldowns
  );
  let mitigatedDamageTimestampsReducedNoCooldowns = reduceTimestamps(
    mitigatedDamageFromLogWithTimesAddedNoCooldowns
  );

  Object.keys(
    unmitigatedDamageTimestampsReducedWithCooldowns
  ).forEach((element) =>
    sortedDataUnmitigatedWithCooldowns.push(
      unmitigatedDamageTimestampsReducedWithCooldowns[element]
    )
  );
  Object.keys(
    mitigatedDamageTimestampsReducedWithCooldowns
  ).forEach((element) =>
    sortedDataMitigatedDamageWithCooldowns.push(
      mitigatedDamageTimestampsReducedWithCooldowns[element]
    )
  );
  Object.keys(
    unmitigatedDamageTimestampsReducedNoCooldowns
  ).forEach((element) =>
    sortedDataUnmitigatedNoCooldowns.push(
      unmitigatedDamageTimestampsReducedNoCooldowns[element]
    )
  );
  Object.keys(mitigatedDamageTimestampsReducedNoCooldowns).forEach((element) =>
    sortedDataMitigatedDamageNoCooldowns.push(
      mitigatedDamageTimestampsReducedNoCooldowns[element]
    )
  );

  let summedUnmitigationDamage = sumDamage(
    sortedDataUnmitigatedNoCooldowns,
    fightLength
  );

  let summedUnmitigatedDamagePerSecond = Object.keys(summedUnmitigationDamage)
    .filter((obj) => {
      return obj !== "timestamp";
    })
    .map((key) => {
      return {
        ability: key,
        damage: Math.round(summedUnmitigationDamage[key] / fightLength),
      };
    })
    .sort((a, b) => (b.damage > a.damage ? 1 : -1));

  let summedMitigationDamage = sumDamage(
    sortedDataMitigatedDamageNoCooldowns,
    fightLength
  );
  let summedMitigationDamagePerSecond = Object.keys(summedMitigationDamage)
    .filter((obj) => {
      return obj !== "timestamp";
    })
    .map((key) => {
      return {
        ability: key,
        damage: Math.round(summedMitigationDamage[key] / fightLength),
      };
    })
    .sort((a, b) => (b.damage > a.damage ? 1 : -1));

  this.setState({
    unmitigatedChartDataNoCooldownsOriginal: sortedDataUnmitigatedNoCooldowns,
    unmitigatedChartDataNoCooldowns: sortedDataUnmitigatedNoCooldowns,
    mitigatedChartDataNoCooldownsOriginal: sortedDataMitigatedDamageNoCooldowns,
    mitigatedChartDataNoCooldowns: sortedDataMitigatedDamageNoCooldowns,
    legenddata: uniqueArrayNewForLegend,
    unmitigatedChartData: sortedDataUnmitigatedWithCooldowns,
    mitigatedChartData: sortedDataMitigatedDamageWithCooldowns,
    Updateddatacasts: updateddatacastsTimeline,
    abilityList: uniqueArray,
    cooldownlist: uniqueArrayCD,
    loadingcheck: false,
    healernames: summary.map((key) => ({
      name: key.name,
      icon: key.icon,
      talents: key.combatantInfo.talents,
      soulbindAbilities: key.combatantInfo.artifact,
      soulbindConduits: key.combatantInfo.heartOfAzeroth,
      type: key.type,
      stats: [
        {
          intellect: key.combatantInfo.stats.Intellect.min,
          crit: key.combatantInfo.stats.Crit.min,
          haste: key.combatantInfo.stats.Haste.min,
          mastery: key.combatantInfo.stats.Mastery.min,
          versatility: key.combatantInfo.stats.Versatility.min,
          leech: key.combatantInfo.stats.Leech.min,
          ilvl: key.combatantInfo.stats["Item Level"].min,
        },
      ],
    })),
    currentEndTime: endtime,
    currentStartTime: starttime,
    summedUnmitigatedDamagePerSecond: summedUnmitigatedDamagePerSecond,
    summedMitigationDamagePerSecond: summedMitigationDamagePerSecond,
    externalUsageTimelineData: updateddatacastsExternalsTimeline,
    enemyCastsTimelineData: enemyCastsTimeline,
  });
}
