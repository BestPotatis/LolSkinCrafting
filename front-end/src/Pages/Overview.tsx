import { ChampionTable } from "@/Components/ChampionTable";
import { SkinShardTable } from "@/Components/SkinShardTable";
import { BASE_URL } from "@/constants";
import type { ChampionWithSkin } from "@/types/champion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

const Overview = () => {
  const { data: championData } = useQuery({
    queryKey: ["champions"],
    queryFn: (): Promise<ChampionWithSkin[]> =>
      axios.get(BASE_URL + "/champions").then((res) => res.data),
  });

  const championOptions = useMemo(
    () =>
      championData?.map((champion) => ({
        value: String(champion.id),
        label: champion.name,
      })),
    [championData]
  );

  return (
    <div className="flex justify-between p-4">
      <ChampionTable
        championData={championData}
        championOptions={championOptions}
      />
      <SkinShardTable championOptions={championOptions} />
    </div>
  );
};
export default Overview;
