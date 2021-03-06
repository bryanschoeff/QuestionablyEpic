import Player from "../../../Player/Player";
import SPEC from "../../SPECS";
import { STAT, STATPERONEPERCENT } from "../../STAT";
import { convertPPMToUptime, getBestWeaponEnchant } from "../EffectUtilities";

/* 
== Generic Soulbind Effects ==
    All specs use the same set of Soulbinds and so the formulas contained
    are for all six. You can refer to a players spec if the formula should
    differ between them, for example an interrupt specific Soulbind might
    represent some gain for Shaman while being useless for the other five.
    
    Durations of buffs can also change between specs, especially if the
    soulbind is procced by using your Covenant ability.

*/
export function getSoulbindFormula(effectID, player, contentType) {
  let bonus_stats = {};

  // === KYRIAN ===

  // -- Pelagos --
  // Combat Meditation
  // Activating your Kyrian class ability increases your mastery by X for Y seconds.
  // You occasionally expel sorrowful memories which can be walked through to extend the effect by 3 seconds.
  if (effectID === 328266) {
    let expectedUptime = (30 + 9 * 2) / 180; // TODO. Demonstration only.
    bonus_stats.Mastery = 350 * expectedUptime; // Placeholder.
  }
  // Focusing Mantra
  else if (effectID === 328261) {
    // Left as 0 for now. While you might occasionally get some value from being able to vial slightly earlier, this is honestly
    // just going to be 0 throughput in most cases.
    bonus_stats.HPS = 0;
  }
  // Phial of Patience
  // Your Phial heals for 35% additional health, but over 10 seconds.
  else if (effectID === 329777) {
    let expected_overhealing = 0.55;
    let healing_bonus = player.activeStats.stamina * 20 * 0.35;
    let uses_per_combat = 1.5;

    bonus_stats.HPS = (healing_bonus * uses_per_combat * (1 - expected_overhealing)) / player.getFightLength(contentType); // Placeholder.
  }
  // Let go of the Past
  else if (effectID === 328257) {
    // This was changed to a small magic damage DR and is given no value currently.
    // Will likely be included when the stats panel expands to offer more specific detail.
    bonus_stats.HPS = 0;
  }

  // -- Kleia --
  // Valiant Strikes
  else if (effectID === 329791) {
    let average_health_pool = player.activeStats.stamina * 20; // The players health is an acceptable average for an average target.
    let ppm = 0.66; // POSTLIVE: Check against logs.

    bonus_stats.HPS = (average_health_pool * 0.2 * ppm) / 60;
  }
  // Cleansing Rites
  else if (effectID === 329784) {
    let health_pool = player.activeStats.stamina * 20;

    bonus_stats.HPS = (health_pool * 0.1) / player.getFightLength(contentType);
  }
  // Pointed Courage
  else if (effectID === 329778) {
    let expected_allies = contentType === "Raid" ? 4.8 : 3.1;

    bonus_stats.Crit = expected_allies * STATPERONEPERCENT.CRIT;
  }
  // Resonant Accolades
  else if (effectID === 329781) {
    // This one needs a check against log. It can obviously never exceed 4% total healing but is likely to be much less.
    let percent_healing_above_70 = 0.75;
    let expected_overhealing = 0.5;
    let effect_power = 0.04;

    bonus_stats.HPS = player.getHPS(contentType) * percent_healing_above_70 * (1 - expected_overhealing) * effect_power;
  }

  // -- Mikanikos --
  // Why does Mikanikos have so few throughput traits =( Poor Mikanikos.
  // Bron's Call to Action
  else if (effectID === 333950) {
    // DOES reset stacks on raid boss pull. Doesn't in Mythic+.
    let casts_per_minute = 25; // Pull from logs.
    let brons_per_minute = casts_per_minute / 90;

    let bron_sp = player.activeStats.intellect * 2;
    let anima_cannon_dps = 0.55 * bron_sp * 3; //* player.getStatMultiplier("", ['Crit', 'Vers'])
    let smash_dps = 0.25 * bron_sp * 1;
    let vit_bolt_hps = 0.575 * bron_sp * 8;

    bonus_stats.HPS = (brons_per_minute * vit_bolt_hps * player.getStatMultiplier(["Crit", "Versatility"])) / 60;
  }
  // Hammer of Genesis
  else if (effectID === 333935) {
  }

  // === Night Fae ===
  // -- Niya --
  // Grove Invigoration
  else if (effectID === 322721) {
    let expectedStacks = (2 * 30) / 60 + (8 * 30) / 120;
    bonus_stats.Mastery = expectedStacks * 25;
  }
  // Run without Tiring
  else if (effectID === 342270) {
  }
  // Niya's Tools: Burrs
  else if (effectID === 320659) {
  }
  // Niya's Tools: Herbs
  // This is basically 100% uptime on one target at a time. Team benefit is included.
  else if (effectID === 320662) {
    bonus_stats.Haste = (4.9 * STATPERONEPERCENT.HASTE);
  }

  // -- Dreamwalker --
  // Podtender
  else if (effectID === 333950) {
    // TODO: We'll see. The approaches to this one is maybe you have a "chance of death" and then include the healing portion but I'm not convinced
    // that you get a great picture from that.
    // It's a good trait, but not for HPS reasons.
  }
  // Social Butterfly
  else if (effectID === 319210) {
    let expectedUptime = 1; // POSTLIVE: Check if this is falling off often in either content type.
    bonus_stats.Versatility = 1.5 * 40 * expectedUptime; 
  }
  // Empowered Chrysalis
  // TODO: Expand to include overhealing on yourself.
  // Double check the shield_consumed is a fair approximation when the expansion goes live.
  else if (effectID === 319213) {
    let trait_bonus = 0.1;
    let shield_consumed = contentType == "Raid" ? 0.78 : 0.32; // The percentage of our overhealing shield that gets consumed. Likely to be very high.
    let overhealing = player.getRawHPS(contentType) - player.getHPS(contentType);

    bonus_stats.HPS = trait_bonus * shield_consumed * overhealing;
  }

  // Field of Blossoms
  else if (effectID === 319191) {
    let expectedUptime = 1 / 6;
    bonus_stats.Haste = 12 * STATPERONEPERCENT.HASTE * expectedUptime;
  }

  // -- Korayn --
  // (Mikanikos V2)
  // Wild Hunt Tactics
  else if (effectID === 325066) {
  }
  // First Strike
  else if (effectID === 325069) {
  }

  // === Venthyr ===
  // -- Nadjia --
  // Thrill Seeker
  else if (effectID === 331586) {
    let average_uptime = 10 / 80;

    bonus_stats.Haste = average_uptime * 20 * STATPERONEPERCENT.HASTE;
  }

  // Exacting Preparation
  else if (effectID === 331580) {
    let flask_int = 70;
    let feast_int = 18; // Should add something to offer an option of non-int food, but they are very close.
    let enchant_int = getBestWeaponEnchant(player, contentType);

    bonus_stats.Intellect = (flask_int + feast_int + enchant_int) * 0.2;
  }
  // Dauntless Duelist
  else if (effectID === 331584) {
    // 3% damage to one target + 1.5% DR. No value currently assigned to DR and it's unlikely you would take this as a healer.
  }

  // -- Theotar the Mad Duke
  // Soothing Shade
  else if (effectID === 336239) {
    let chanceOfMovement = 0.1;
    let uptime = convertPPMToUptime(1, 12) * (1 - chanceOfMovement);

    bonus_stats.Mastery = uptime * 525;
  }
  // Token of Appreciation
  else if (effectID === 336245) {
    const expectedPPM = 9.59; // ~3.9 targets getting an absorb every ~25 seconds.
    const healAmount = player.getInt() * 1.5 * player.getStatPerc("Versatility"); // TODO: Implement the Spell Power -> Attack Power conversion. 
    const expectedWastage = 0.04; // Unused shields. Very low. 

    bonus_stats.HPS = expectedPPM * healAmount * (1 - expectedWastage) / 60;


  }
  // Refined Palate
  else if (effectID === 336243) {
  }
  // Wasteland Propriety
  else if (effectID === 319983) {
    bonus_stats.Versatility = 6 * STATPERONEPERCENT.VERSATILITY * (10 / 60); // Arguably some classes won't be able to proc this on cooldown because of misaligned CDs but we'll see.
  }

  // -- General Draven --
  // Service in Stone
  else if (effectID === 340159) {
  }
  // Enduring Gloom
  else if (effectID === 319978) {
  }
  // Hold Your Ground
  else if (effectID === 332754) {
    const spec = player.getSpec();
    const expected_uptime = player.getSpecialQuery("HoldYourGroundUptime", contentType);
    const percentHealingAffected = spec === SPEC.DISCPRIEST ? 0.25 : 1;
  
    bonus_stats.HPS = expected_uptime * (player.getHPS(contentType) * 0.04 * percentHealingAffected);
  }
  // Superior Tactics
  else if (effectID === 332753) {
  }
  // Built for War
  else if (effectID === 319973) {
    let expected_stacks = 3.65;
    bonus_stats.Intellect = expected_stacks * player.activeStats.intellect * 0.01;
  }

  // === Necrolord ===
  // -- Marileth --
  // Volatile Solvent
  else if (effectID === 323074) {
  }
  // Ooz's Frictionless Coating
  else if (effectID === 323091) {
  }
  // Plague'ys Preemptive Strike
  else if (effectID === 323090) {
  }

  // Ultimate Form
  else if (effectID === 323095) {
  }

  // -- Emeni --
  // Lead by Example
  else if (effectID === 342156) {
    let total_bonus = 0.05 + 0.02 * 4;
    total_bonus += 0.02 * 4; // The buff TO your party. Treated as your own.
    let uptime = 1 / 6;

    bonus_stats.Intellect = player.activeStats.intellect * total_bonus * uptime;
  }

  // Gnashing Chompers
  else if (effectID === 323919) {
    // This will need to be implemented for Mythic+ primarily. It's raid value will really only play up on 1-2 fights.
    // Probably needs to be a fight specific formula.
  }

  // -- Bonesmith Heirmir --
  // Forgeborne Reveries
  else if (effectID === 326514) {
    bonus_stats.Intellect = player.activeStats.intellect * 0.03;
  }
  // Heirmir's Arsenal: Marrowed Gemstone
  else if (effectID === 326572) {
    // TODO, work out if you can collect stacks when it's on cooldown, or if the 10 crits have to take place after the cooldown.
    // The uptime won't change much regardless but it'll be of slight impact.
    let uptime = 10 / 81;

    bonus_stats.Crit = STATPERONEPERCENT.CRIT * 18 * uptime;
  }

  return bonus_stats;
}
