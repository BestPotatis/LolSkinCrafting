import { useMutation, useQuery } from "@tanstack/react-query";
import DataTable from "./DataTable";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { ChampionColumns } from "@/Columns/ChampionColumns";
import type {
  ChampionWithSkin,
  CreateChampion,
  CreateSkin,
} from "@/types/champion";
import { FormDialog } from "./FormDialog";
import { useForm } from "react-hook-form";
import { CreateSkinForm } from "./Forms/CreateSkinForm";
import { useMemo } from "react";

export function ChampionTable() {
  const columns = ChampionColumns;
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

  const addSkinMutation = useMutation({
    mutationFn: (data: CreateChampion) =>
      axios.post(BASE_URL + "/skins/create", data),
  });

  const submitForm = useForm<CreateSkin>();

  return (
    championData && (
      <DataTable
        title="Champions"
        tableButtons={
          championOptions && (
            <FormDialog
              buttonText="Add Skin"
              dialogForm={
                <CreateSkinForm
                  championOptions={championOptions}
                  submitForm={submitForm}
                />
              }
              title="Add new skin"
              description="Add a new skin for a champion with name and rarity"
              submitForm={submitForm}
              submitText="Add skin"
              submitFn={(data) => addSkinMutation.mutate(data)}
            />
          )
        }
        data={championData}
        columns={columns}
      />
    )
  );
}
