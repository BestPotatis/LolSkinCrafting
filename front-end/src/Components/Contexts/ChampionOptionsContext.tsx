import { type ValueMap } from "@/types/general";
import { createContext } from "react";

export const ChampionOptionsContext = createContext<ValueMap[]>([]);
