import { Controller, type UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import type { CreateSkin } from "@/types/champion";
import { Combobox } from "../ui/combobox";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RARITY_OPTIONS } from "@/constants";
import { useContext } from "react";
import { ChampionOptionsContext } from "../Contexts/ChampionOptionsContext";

interface CreateSkinFormProps {
  submitForm: UseFormReturn<CreateSkin, any, CreateSkin>;
}
export function CreateSkinForm({ submitForm }: CreateSkinFormProps) {
  const { register, control } = submitForm;
  const championOptions = useContext(ChampionOptionsContext);

  return (
    <>
      <Input
        placeholder="Skin name"
        {...register("name", { required: true })}
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
      <Controller
        name="championId"
        control={control}
        render={({ field }) => (
          <Combobox
            value={field.value}
            setValue={field.onChange}
            options={championOptions}
            placeholder="Select champion"
          />
        )}
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
