import React, { useEffect } from "react";
import MiniItemCard from "./MiniItemCard";
import TopSetComponent from "./TopSetComponent";
import TopSetStatsPanel from "./TopSetStatsPanel";
import { testList } from "./TestData";

function TopGearReport(props) {

    let topSet = props.topSet;
    console.log(topSet);
    let itemList = (topSet !== null && 'itemList' in topSet) ? topSet.itemList : [];
    let statList = (topSet !== null && 'bonus_stats' in topSet) ? topSet.bonus_stats : {};
    console.log("Top Set: " + JSON.stringify(itemList));

    //itemList = JSON.parse([{"id":178692,"level":146,"name":"","slot":"Head","softScore":71,"socket":false,"tertiary":"","effect":"","uniqueHash":"17869289822","offhandID":0,"active":false,"stats":{"intellect":38,"stamina":0,"haste":25,"mastery":46,"versatility":0,"crit":0,"leech":0,"bonus_stats":{}}},{"id":173146,"level":151,"name":"","slot":"Neck","softScore":53,"socket":true,"tertiary":"","effect":"","uniqueHash":"17314648580","offhandID":0,"active":false,"stats":{"intellect":0,"stamina":0,"haste":71,"mastery":29,"versatility":0,"crit":0,"leech":0,"bonus_stats":{}}},{"id":172263,"level":151,"name":"","slot":"Shoulder","softScore":61,"socket":false,"tertiary":"","effect":"","uniqueHash":"17226371577","offhandID":0,"active":false,"stats":{"intellect":31,"stamina":0,"haste":29,"mastery":0,"versatility":0,"crit":29,"leech":0,"bonus_stats":{}}},{"id":180123,"level":184,"name":"","slot":"Back","softScore":61,"socket":false,"tertiary":"","effect":"","uniqueHash":"18012389517","offhandID":0,"active":false,"stats":{"intellect":31,"stamina":0,"haste":41,"mastery":0,"versatility":0,"crit":22,"leech":0,"bonus_stats":{}}},{"id":172258,"level":151,"name":"","slot":"Chest","softScore":83,"socket":false,"tertiary":"","effect":"","uniqueHash":"1722582615","offhandID":0,"active":false,"stats":{"intellect":40,"stamina":0,"haste":0,"mastery":40,"versatility":0,"crit":40,"leech":0,"bonus_stats":{}}},{"id":178767,"level":184,"name":"","slot":"Wrist","softScore":62,"socket":false,"tertiary":"","effect":"","uniqueHash":"17876789190","offhandID":0,"active":false,"stats":{"intellect":31,"stamina":0,"haste":0,"mastery":21,"versatility":41,"crit":0,"leech":0,"bonus_stats":{}}},{"id":172260,"level":151,"name":"","slot":"Hands","softScore":60,"socket":false,"tertiary":"","effect":"","uniqueHash":"17226050102","offhandID":0,"active":false,"stats":{"intellect":31,"stamina":0,"haste":0,"mastery":29,"versatility":29,"crit":0,"leech":0,"bonus_stats":{}}},{"id":180110,"level":184,"name":"","slot":"Waist","softScore":82,"socket":false,"tertiary":"","effect":"","uniqueHash":"18011017097","offhandID":0,"active":false,"stats":{"intellect":41,"stamina":0,"haste":0,"mastery":50,"versatility":32,"crit":0,"leech":0,"bonus_stats":{}}},{"id":178839,"level":184,"name":"","slot":"Legs","softScore":104,"socket":false,"tertiary":"","effect":"","uniqueHash":"17883943481","offhandID":0,"active":false,"stats":{"intellect":55,"stamina":0,"haste":70,"mastery":41,"versatility":0,"crit":0,"leech":0,"bonus_stats":{}}},{"id":178745,"level":184,"name":"","slot":"Feet","softScore":87,"socket":false,"tertiary":"","effect":"","uniqueHash":"17874562676","offhandID":0,"active":false,"stats":{"intellect":41,"stamina":0,"haste":0,"mastery":0,"versatility":48,"crit":35,"leech":0,"bonus_stats":{}}},{"id":178736,"level":184,"name":"","slot":"Finger","softScore":67,"socket":false,"tertiary":"","effect":"","uniqueHash":"17873661511","offhandID":0,"active":false,"stats":{"intellect":0,"stamina":0,"haste":94,"mastery":0,"versatility":52,"crit":0,"leech":0,"bonus_stats":{}}},{"id":178872,"level":171,"name":"","slot":"Finger","softScore":70,"socket":false,"tertiary":"","effect":"","uniqueHash":"17887222710","offhandID":0,"active":false,"stats":{"intellect":0,"stamina":0,"haste":0,"mastery":42,"versatility":0,"crit":83,"leech":0,"bonus_stats":{}}},{"id":178708,"level":146,"name":"","slot":"Trinket","softScore":65,"socket":false,"tertiary":"","effect":{"type":"trinket","name":"Unbound Changeling"},"uniqueHash":"17870850513","offhandID":0,"active":false,"stats":{"intellect":37,"stamina":0,"haste":0,"mastery":0,"versatility":0,"crit":0,"leech":0,"bonus_stats":{"crit":47.0357909471232}}},{"id":178809,"level":171,"name":"","slot":"Trinket","softScore":90,"socket":false,"tertiary":"","effect":{"type":"trinket","name":"Soulletting Ruby"},"uniqueHash":"1788094039","offhandID":0,"active":false,"stats":{"intellect":46,"stamina":0,"haste":0,"mastery":0,"versatility":0,"crit":0,"leech":0,"bonus_stats":{"hps":4.520880060374999,"crit":71.84341512764914}}}]);
    itemList = testList;
    statList = {
        intellect: 321,
        haste: 931,
        crit: 831,
        mastery: 31,
        versatility: 91,
        hps: 911,
        dps: 893,
    };

    return (
        <div
            style={{
                margin: "auto",
                width: "70%",
                display: "block",
                
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                
                }}
                >
                <TopSetComponent 
                    itemList = {itemList}
                
                />
                <TopSetStatsPanel 
                    statList = {statList}
                />

            </div>

           


        </div>

    )
}

export default TopGearReport;