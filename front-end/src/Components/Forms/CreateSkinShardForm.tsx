import { Controller, type UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import type { CreateSkinShard } from "@/types/skinShard";
import { Combobox } from "../ui/combobox";
import { RARITY_OPTIONS } from "@/constants";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useContext } from "react";
import { ChampionOptionsContext } from "../Contexts/ChampionOptionsContext";

interface CreateSkinShardFormProps {
  submitForm: UseFormReturn<CreateSkinShard, any, CreateSkinShard>;
}
export function CreateSkinShardForm({ submitForm }: CreateSkinShardFormProps) {
  const { register, control } = submitForm;
  const championOptions = useContext(ChampionOptionsContext);
  return (
    <>
      <Input
        {...register("name", { required: true })}
        placeholder="Skin shard name"
      />
      <Controller
        name="rarity"
        control={control}
        render={({ field }) => {
          return (
            <Combobox
              value={field.value}
              setValue={field.onChange}
              options={RARITY_OPTIONS}
              placeholder="Select rarity"
            />
          );
        }}
      />
      <Input
        {...register("disenchantPrice", { required: true })}
        placeholder="Disenchant price"
      />
      <Input {...register("price", { required: true })} placeholder="Price" />

      <Controller
        name="championId"
        control={control}
        render={({ field }) => {
          return (
            <Combobox
              value={field.value}
              setValue={field.onChange}
              options={championOptions}
              placeholder="Select champion"
            />
          );
        }}
      />
      <div className="pl-2 flex items-center space-x-2">
        <Controller
          name="legacy"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              defaultChecked={false}
            />
          )}
        />
        <Label>Legacy</Label>
      </div>
    </>
  );
}
