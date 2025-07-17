import { DeleteDialog } from "@/Components/DeleteDialog";
import { FormDialog } from "@/Components/FormDialog";
import { CreateSkinShardForm } from "@/Components/Forms/CreateSkinShardForm";
import { BASE_URL, RARITY_OPTIONS } from "@/constants";
import type { CreateSkinShard, SkinShardHasSkin } from "@/types/skinShard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UpdateButtonProps {
  skinShard: SkinShardHasSkin;
}
interface DeleteButtonProps {
  id: number;
  name: string;
}
function UpdateButton({ skinShard }: UpdateButtonProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const successToast = () =>
    toast.success("Update skin shard successfully", {
      position: "bottom-right",
    });
  const updateMutation = useMutation({
    mutationFn: (data: CreateSkinShard) =>
      axios.put(BASE_URL + "/skin-shards/update/" + skinShard.id, data),
    onSuccess: () => {
      setOpen(false);
      successToast();
      queryClient.invalidateQueries({ queryKey: ["skinShards"] });
    },
  });
  const submitForm = useForm<CreateSkinShard>({
    defaultValues: {
      ...skinShard,
      rarity: RARITY_OPTIONS.find((option) => option.label === skinShard.rarity)
        ?.value,
    },
  });
  return (
    <FormDialog
      open={open}
      setOpen={setOpen}
      buttonText="Update"
      description={"Updating " + skinShard.name}
      submitForm={submitForm}
      title="Update skin shard"
      submitFn={(data) => updateMutation.mutate(data)}
      dialogForm={<CreateSkinShardForm submitForm={submitForm} />}
    />
  );
}

function DeleteButton({ id, name }: DeleteButtonProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const successToast = () =>
    toast.success("Delete skin shard successfully", {
      position: "bottom-right",
    });
  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(BASE_URL + "/skin-shards/delete/" + id),
    onSuccess: () => {
      setOpen(false);
      successToast();
      queryClient.invalidateQueries({ queryKey: ["skinShards"] });
    },
  });
  return (
    <DeleteDialog
      open={open}
      setOpen={setOpen}
      buttonText="Delete"
      dataName={name}
      deleteFn={() => deleteMutation.mutate()}
    />
  );
}

export const SkinShardColumns: ColumnDef<SkinShardHasSkin>[] = [
  { header: "Skin name", accessorKey: "name" },
  { header: "Champion", accessorKey: "champion" },
  { header: "Rarity", accessorKey: "rarity" },
  { header: "Is legacy", accessorKey: "legacy" },
  { header: "Disenchant price", accessorKey: "disenchantPrice" },
  { header: "Price", accessorKey: "price" },
  { header: "Champion has skin", accessorKey: "hasSkin" },
  { header: "Best skin rarity", accessorKey: "bestSkinRarity" },
  {
    header: "Update",
    cell: ({ row }) => <UpdateButton skinShard={row.original} />,
  },
  {
    header: "Delete",
    cell: ({ row }) => (
      <DeleteButton id={row.original.id} name={row.original.name} />
    ),
  },
];
