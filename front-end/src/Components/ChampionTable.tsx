import { useMutation, useQueryClient } from "@tanstack/react-query";
import DataTable from "./DataTable";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { ChampionColumns } from "@/Columns/ChampionColumns";
import type { ChampionWithSkin, CreateSkin } from "@/types/champion";
import { FormDialog } from "./FormDialog";
import { useForm } from "react-hook-form";
import { CreateSkinForm } from "./Forms/CreateSkinForm";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { ValueMap } from "@/types/general";

interface ChampionTableProps {
  championData: ChampionWithSkin[] | undefined;
  championOptions: ValueMap[] | undefined;
}

export function ChampionTable({
  championData,
  championOptions,
}: ChampionTableProps) {
  const queryClient = useQueryClient();
  const columns = ChampionColumns;
  const successToast = () =>
    toast.success("Successfully created skin", { position: "bottom-right" });
  const addSkinMutation = useMutation({
    mutationFn: (data: CreateSkin) =>
      axios.post(BASE_URL + "/skins/create", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["champions"] });
      setOpen(false);
      successToast();
    },
  });

  const submitForm = useForm<CreateSkin>();

  const [open, setOpen] = useState(false);

  return (
    <>
      <DataTable
        title="Champions"
        tableButtons={
          championOptions && (
            <FormDialog
              open={open}
              setOpen={setOpen}
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

      <ToastContainer />
    </>
  );
}
