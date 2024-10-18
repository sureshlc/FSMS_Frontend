import SyriaFlag from "../assets/icons/components/flags/Syria.js";
import EgyptFlag from "../assets/icons/components/flags/Egypt.js";
import IraqFlag from "../assets/icons/components/flags/Iraq.js";
import JordanFlag from "../assets/icons/components/flags/Jordan.js";
import LebanonFlag from "../assets/icons/components/flags/Lebanon.js";
import PalestineFlag from "../assets/icons/components/flags/Palestine.js";
import MASHFlag from "../assets/icons/components/flags/Mash.js";

export const countryIsoMapping = {
  "Syrian Arab Republic": "SYR",
  Jordan: "JOR",
  Lebanon: "LBN",
  Iraq: "IRQ",
  Egypt: "EGY",
  Palestine: "PSE",
};

export const isoFlagMapping = {
  SYR: <SyriaFlag />,
  EGY: <EgyptFlag />,
  IRQ: <IraqFlag />,
  JOR: <JordanFlag />,
  LBN: <LebanonFlag />,
  PSE: <PalestineFlag />,
  MASH: <MASHFlag />,
};

export const iso2Mapping = {
  "Syrian Arab Republic": "SY",
  Jordan: "JO",
  Lebanon: "LB",
  Iraq: "IR",
  Egypt: "EG",
  Palestine: "PS",
};
