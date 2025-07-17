import { SkinShardColumns } from "@/Columns/SkinShardColumns";
import DataTable from "./DataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type CreateSkinShard, type SkinShardHasSkin } from "@/types/skinShard";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { FormDialog } from "./FormDialog";
import { CreateSkinShardForm } from "./Forms/CreateSkinShardForm";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { ValueMap } from "@/types/general";
import { toast } from "react-toastify";

interface SkinShardTableProps {
  championOptions: ValueMap[] | undefined;
}
export function SkinShardTable({ championOptions }: SkinShardTableProps) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["skinShards"],
    queryFn: (): Promise<SkinShardHasSkin[]> =>
      axios.get(BASE_URL + "/skin-shards").then((res) => res.data),
  });

  const submitForm = useForm<CreateSkinShard>();
  const [open, setOpen] = useState(false);

  const successToast = () =>
    toast.success("Successfully created skin shard", {
      position: "bottom-right",
    });

  const createSkinShardMutation = useMutation({
    mutationFn: (data: CreateSkinShard) =>
      axios.post(BASE_URL + "/skin-shards/create", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skinShards"] });
      setOpen(false);
      successToast();
    },
  });

  return (
    <>
      <DataTable
        title="Skin shards"
        columns={SkinShardColumns}
        data={data}
        tableButtons={
          championOptions && (
            <FormDialog
              buttonText="Add skin shard"
              title="Add skin shard"
              description="Add a skin shard for a champion"
              dialogForm={
                <CreateSkinShardForm
                  championOptions={championOptions}
                  submitForm={submitForm}
                />
              }
              open={open}
              setOpen={setOpen}
              submitFn={(data) => createSkinShardMutation.mutate(data)}
              submitForm={submitForm}
            />
          )
        }
      />
    </>
  );
}
