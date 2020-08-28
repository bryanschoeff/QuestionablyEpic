import React from "react";
import AuraMasteryIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/AuraMastery.jpg";
import AvengingWrathIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/AvengingWrath.jpg";
import DivineHymnIcon from "../../../Images/Classes/Priest/Specialisation/Holy/Icons/DivineHymn.jpg";
import EvangelismIcon from "../../../Images/Classes/Priest/Specialisation/Discipline/Icons/Evangelism.jpg";
import HealingTideTotemIcon from "../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/HealingTideTotem.jpg";
import PowerWordBarrierIcon from "../../../Images/Classes/Priest/Specialisation/Discipline/Icons/PowerWordBarrier.jpg";
import RevivalIcon from "../../../Images/Classes/Monk/Specialisation/Mistweaver/Icons/Revival.jpg";
import SalvationIcon from "../../../Images/Classes/Priest/Specialisation/Holy/Icons/Salvation.jpg";
import SpiritLinkTotemIcon from "../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/SpiritLinkTotem.jpg";
import TranquilityIcon from "../../../Images/Classes/Druid/Specialisation/Restoration/Icons/Tranquility.jpg";
import TreeofLifeIcon from "../../../Images/Classes/Druid/Specialisation/Restoration/Icons/TreeofLife.jpg";
import DivineTollIcon from "../../../Images/Classes/Paladin/CovenantAbilities/DivineToll.jpg";
import AshenHallowIcon from "../../../Images/Classes/Paladin/CovenantAbilities/AshenHallow.jpg";
import VanquishersHammerIcon from "../../../Images/Classes/Paladin/CovenantAbilities/VanquishersHammer.jpg";
import BlessingOfSeasonsIcon from "../../../Images/Classes/Paladin/CovenantAbilities/BlessingOfSeasons.jpg";
import KindredSpiritsIcon from "../../../Images/Classes/Druid/CovenantAbilities/KindredSpirits.jpg";
import RavenousFrenzyIcon from "../../../Images/Classes/Druid/CovenantAbilities/RavenousFrenzy.jpg";
import AdaptiveSwarmIcon from "../../../Images/Classes/Druid/CovenantAbilities/AdaptiveSwarm.jpg";
import ConvokeTheSpiritsIcon from "../../../Images/Classes/Druid/CovenantAbilities/ConvokeTheSpirits.jpg";
import BoonoftheAscendedIcon from "../../../Images/Classes/Priest/CovenantAbilities/BoonoftheAscended.jpg";
import MindgamesIcon from "../../../Images/Classes/Priest/CovenantAbilities/Mindgames.jpg";
import UnholyNovaIcon from "../../../Images/Classes/Priest/CovenantAbilities/UnholyNova.jpg";
import FaeBlessingsIcon from "../../../Images/Classes/Priest/CovenantAbilities/FaeBlessings.jpg";
import VesperTotemIcon from "../../../Images/Classes/Shaman/CovenantAbilities/VesperTotem.jpg";
import ChainHarvestIcon from "../../../Images/Classes/Shaman/CovenantAbilities/ChainHarvest.jpg";
import PrimordialWaveIcon from "../../../Images/Classes/Shaman/CovenantAbilities/PrimordialWave.jpg";
import FaeTransfusionIcon from "../../../Images/Classes/Shaman/CovenantAbilities/FaeTransfusion.jpg";
import WeaponsofOrderIcon from "../../../Images/Classes/Monk/CovenantAbilities/WeaponsofOrder.jpg";
import FallenOrderIcon from "../../../Images/Classes/Monk/CovenantAbilities/FallenOrder.jpg";
import BonedustBrewIcon from "../../../Images/Classes/Monk/CovenantAbilities/BonedustBrew.jpg";
import FaelineStompIcon from "../../../Images/Classes/Monk/CovenantAbilities/FaelineStomp.jpg";

// Should probably work this off GUID

export default function abilityicons(props) {
  let spell = "";
  let source = "";
  let alt = "";

  // Holy Paladin
  // Paladin Base Abilities
  if (props === "Aura Mastery") {
    spell = "spell=31821";
    source = AuraMasteryIcon;
    alt = "Aura Mastery";
  }
  if (props === "Avenging Wrath") {
    spell = "spell=31884";
    source = AvengingWrathIcon;
    alt = "Avenging Wrath";
  }
  // Paladin Covenant Cooldowns
  if (props === "Divine Toll") {
    spell = "spell=304971";
    source = DivineTollIcon;
    alt = "Divine Toll";
  }
  if (props === "Ashen Hallow") {
    spell = "spell=316958";
    source = AshenHallowIcon;
    alt = "Ashen Hallow";
  }
  if (props === "Vanquisher's Hammer") {
    spell = "spell=31821";
    source = VanquishersHammerIcon;
    alt = "Vanquisher's Hammer";
  }
  if (props === "Blessing of the Seasons") {
    spell = "spell=328278";
    source = BlessingOfSeasonsIcon;
    alt = "Blessing of the Seasons";
  }
  // Restoration Druid
  if (props === "Tranquility") {
    spell = "spell=740";
    source = TranquilityIcon;
    alt = "Tranquility";
  }
  if (props === "Incarnation: Tree of Life") {
    spell = "spell=33891";
    source = TreeofLifeIcon;
    alt = "Incarnation: Tree of Life";
  }
  // Druid Covenant Cooldowns
  if (props === "Kindred Spirits") {
    spell = "spell=326434";
    source = KindredSpiritsIcon;
    alt = "Kindred Spirits";
  }
  if (props === "Ravenous Frenzy") {
    spell = "spell=323546";
    source = RavenousFrenzyIcon;
    alt = "Ravenous Frenzy";
  }
  if (props === "Adaptive Swarm") {
    spell = "spell=325727";
    source = AdaptiveSwarmIcon;
    alt = "Adaptive Swarm";
  }
  if (props === "Convoke the Spirits") {
    spell = "spell=323764";
    source = ConvokeTheSpiritsIcon;
    alt = "Convoke the Spirits";
  }
  // Holy Priest
  if (props === "Holy Word: Salvation") {
    spell = "spell=265202";
    source = SalvationIcon;
    alt = "Holy Word: Salvation";
  }
  if (props === "Divine Hymn") {
    spell = "spell=64843";
    source = DivineHymnIcon;
    alt = "Divine Hymn";
  }
  // Discipline Priest
  if (props === "Power Word: Barrier") {
    spell = "spell=62618";
    source = PowerWordBarrierIcon;
    alt = "Power Word: Barrier";
  }
  if (props === "Evangelism") {
    spell = "spell=246287";
    source = EvangelismIcon;
    alt = "Evangelism";
  }
  // Priest Covenant Abilities
  if (props === "Boon of the Ascended") {
    spell = "spell=325013";
    source = BoonoftheAscendedIcon;
    alt = "Boon of the Ascended";
  }
  if (props === "Mindgames") {
    spell = "spell=323673";
    source = MindgamesIcon;
    alt = "Mindgames";
  }
  if (props === "Unholy Nova") {
    spell = "spell=324724";
    source = UnholyNovaIcon;
    alt = "Unholy Nova";
  }
  if (props === "Fae Blessings") {
    spell = "spell=327661";
    source = FaeBlessingsIcon;
    alt = "Fae Blessings";
  }
  // Restoration Shaman
  if (props === "Healing Tide Totem") {
    spell = "spell=108280";
    source = HealingTideTotemIcon;
    alt = "Healing Tide Totem";
  }
  if (props === "Spirit Link Totem") {
    spell = "spell=98008";
    source = SpiritLinkTotemIcon;
    alt = "Spirit Link Totem";
  }
  // Shaman Covenant Abilities
  if (props === "Vesper Totem") {
    spell = "spell=324386";
    source = VesperTotemIcon;
    alt = "Vesper Totem";
  }
  if (props === "Chain Harvest") {
    spell = "spell=320674";
    source = ChainHarvestIcon;
    alt = "Chain Harvest";
  }
  if (props === "Primordial Wave") {
    spell = "spell=326059";
    source = PrimordialWaveIcon;
    alt = "Primordial Wave";
  }
  if (props === "Fae Transfusion") {
    spell = "spell=328923";
    source = FaeTransfusionIcon;
    alt = "Fae Transfusion";
  }
  // Mistweaver Monk
  if (props === "Revival") {
    spell = "spell=98008";
    source = RevivalIcon;
    alt = "Revival";
  }
  // Monk Covenant Abilities
  if (props === "Weapons of Order") {
    spell = "spell=310454";
    source = WeaponsofOrderIcon;
    alt = "Weapons of Order";
  }
  if (props === "Fallen Order") {
    spell = "spell=326860";
    source = FallenOrderIcon;
    alt = "Fallen Order";
  }
  if (props === "Bonedust Brew") {
    spell = "spell=325216";
    source = BonedustBrewIcon;
    alt = "Bonedust Brew";
  }
  if (props === "Faeline Stomp") {
    spell = "spell=327104";
    source = FaelineStompIcon;
    alt = "Faeline Stomp";
  }

  return (
    <div>
      <a data-wowhead={spell}>
        <img
          style={{
            height: 20,
            width: 20,
            padding: "0px 5px 0px 5px",
            verticalAlign: "middle",
          }}
          src={source}
          alt={alt}
        />
      </a>
      {props}
    </div>
  );
}

