import { DeleteDialog } from "@/Components/DeleteDialog";
import { BASE_URL } from "@/constants";
import type { SkinShardHasSkin } from "@/types/skinShard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteButtonProps {
  id: number;
  name: string;
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
    header: "Delete",
    cell: ({ row }) => (
      <DeleteButton id={row.original.id} name={row.original.name} />
    ),
  },
];
