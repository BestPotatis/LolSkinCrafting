import { ChampionTable } from "@/Components/ChampionTable";
import { SkinShardTable } from "@/Components/SkinShardTable";

const Overview = () => {
  return (
    <div className="flex justify-between p-4">
      <ChampionTable />
      <SkinShardTable />
    </div>
  );
};
export default Overview;
