import { ConfirmDialog } from "@/Components/ConfirmDialog";
import { FormDialog } from "@/Components/FormDialog";
import { CreateSkinShardForm } from "@/Components/Forms/CreateSkinShardForm";
import { Checkbox } from "@/Components/ui/checkbox";
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
function UpdateButton({ skinShard }: UpdateButtonProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const successToast = () => toast.success("Update skin shard successfully");
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

interface DeleteButtonProps {
  id: number;
  name: string;
}
function DeleteButton({ id, name }: DeleteButtonProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const successToast = () => toast.success("Deleted skin shard successfully");
  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(BASE_URL + "/skin-shards/delete/" + id),
    onSuccess: () => {
      setOpen(false);
      successToast();
      queryClient.invalidateQueries({ queryKey: ["skinShards"] });
    },
  });
  return (
    <ConfirmDialog
      open={open}
      setOpen={setOpen}
      buttonText="Delete"
      dataName={name}
      mutateFn={() => deleteMutation.mutate()}
    />
  );
}

interface UpgradeButtonProps {
  id: number;
  name: string;
}
function UpgradeButton({ id, name }: UpgradeButtonProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const successToast = () => toast.success("Upgraded skin shard successfully");
  const upgradeMutation = useMutation({
    mutationFn: () => axios.post(BASE_URL + "/skin-shards/upgrade/" + id),
    onSuccess: () => {
      setOpen(false);
      successToast();
      queryClient.invalidateQueries({ queryKey: ["skinShards"] });
      queryClient.invalidateQueries({ queryKey: ["champions"] });
    },
  });
  return (
    <ConfirmDialog
      open={open}
      setOpen={setOpen}
      buttonText="Upgrade"
      dataName={name}
      mutateFn={() => upgradeMutation.mutate()}
    />
  );
}

export const SkinShardColumns: ColumnDef<SkinShardHasSkin>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="flex items-center justify-center"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="flex items-center justify-center"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  { header: "Skin name", accessorKey: "name" },
  { header: "Champion", accessorKey: "champion" },
  { header: "Rarity", accessorKey: "rarity" },
  { header: "Is legacy", accessorKey: "legacy" },
  { header: "Disenchant price", accessorKey: "disenchantPrice" },
  { header: "Price", accessorKey: "price" },
  { header: "Champion has skin", accessorKey: "hasSkin" },
  { header: "Best skin rarity", accessorKey: "bestSkinRarity" },
  {
    header: "Upgrade",
    cell: ({ row }) => (
      <UpgradeButton id={row.original.id} name={row.original.name} />
    ),
  },
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
