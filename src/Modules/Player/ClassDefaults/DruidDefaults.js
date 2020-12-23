

export const druidDefaultSpellData = (contentType) => {
    let spellList = {};
    if (contentType === "Raid") {
        spellList = {
            774: {casts: 100, healing: 455000, hps: 1433, overhealing: 0}, // Rejuv
            48438: {casts: 19, healing: 449400, hps: 1339, overhealing: 0}, // Wild Growth
            8936: {casts: 29, healing: 194225, hps: 571, overhealing: 0}, // Regrowth
            33763: {casts: 17, healing: 89150, hps: 262, overhealing: 0}, // Lifebloom

        };

    }
    else if (contentType === "Dungeon") {
        spellList = {
            774: {casts: 25, healing: 113750, hps: 324, overhealing: 0},
            48438: {casts: 17, healing: 395000, hps: 1402, overhealing: 0},
            8936: {casts: 11, healing: 105200, hps: 545, overhealing: 0},
            33763: {casts: 17, healing: 89150, hps: 262, overhealing: 0},

        };
    }
    else {
        console.error("Unknown Content Type");
    }

    return spellList;
}

export const druidDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
        specialQueries = 
        {   
            "ConvokeChannelHPS": 360,   
        };
    }
    else if (contentType === "Dungeon") {
        specialQueries = 
        {   
            "ConvokeChannelHPS": 360,   
        };
    }
    else {
        console.error("Unknown Content Type");
    }

    return specialQueries;

}