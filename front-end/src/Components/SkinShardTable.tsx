import { SkinShardColumns } from "@/Columns/SkinShardColumns";
import DataTable from "./DataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type CreateSkinShard, type SkinShardHasSkin } from "@/types/skinShard";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { FormDialog } from "./FormDialog";
import { CreateSkinShardForm } from "./Forms/CreateSkinShardForm";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ConfirmDialog } from "./ConfirmDialog";
import { type Table } from "@tanstack/react-table";

export function SkinShardTable() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["skinShards"],
    queryFn: (): Promise<SkinShardHasSkin[]> =>
      axios.get(BASE_URL + "/skin-shards").then((res) => res.data),
  });

  const submitForm = useForm<CreateSkinShard>();
  const [addSkinOpen, setAddSkinOpen] = useState(false);
  const [deleteMultipleOpen, setDeleteMultipleOpen] = useState(false);
  const ref = useRef<{ table: Table<SkinShardHasSkin> }>(null);

  const addSuccessToast = () =>
    toast.success("Successfully created skin shard");
  const deleteSuccessToast = () =>
    toast.success("Successfully deleted skin shards");

  const createSkinShardMutation = useMutation({
    mutationFn: (data: CreateSkinShard) =>
      axios.post(BASE_URL + "/skin-shards/create", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skinShards"] });
      setAddSkinOpen(false);
      addSuccessToast();
    },
  });

  const deleteMultipleMutation = useMutation({
    mutationFn: (data: { ids: number[] }) =>
      axios.post(BASE_URL + "/skin-shards/delete-multiple", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skinShards"] });
      setDeleteMultipleOpen(false);
      deleteSuccessToast();
      ref.current?.table.setRowSelection({});
    },
  });

  return (
    <>
      <DataTable
        ref={ref}
        title="Skin shards"
        columns={SkinShardColumns}
        data={data}
        tableButtons={
          <>
            <ConfirmDialog
              buttonText="Delete selected"
              dataName={
                ref.current?.table
                  .getSelectedRowModel()
                  .rows.map((r) => r.original.name)
                  .join(", ") ?? ""
              }
              open={deleteMultipleOpen}
              setOpen={setDeleteMultipleOpen}
              mutateFn={() =>
                deleteMultipleMutation.mutate({
                  ids:
                    ref.current?.table
                      .getSelectedRowModel()
                      .rows.map((r) => Number(r.original.id)) ?? [],
                })
              }
            />

            <FormDialog
              buttonText="Add skin shard"
              title="Add skin shard"
              description="Add a skin shard for a champion"
              dialogForm={<CreateSkinShardForm submitForm={submitForm} />}
              open={addSkinOpen}
              setOpen={setAddSkinOpen}
              submitFn={(data) => createSkinShardMutation.mutate(data)}
              submitForm={submitForm}
            />
          </>
        }
      />
    </>
  );
}
