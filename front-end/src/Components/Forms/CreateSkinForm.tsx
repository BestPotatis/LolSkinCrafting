import { Controller, type UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import type { CreateSkin } from "@/types/champion";
import { Combobox } from "../ui/combobox";
import type { ValueMap } from "@/types/general";

interface CreateSkinFormProps {
  championOptions: ValueMap[];
  submitForm: UseFormReturn<CreateSkin, any, CreateSkin>;
}
export function CreateSkinForm({
  championOptions,
  submitForm,
}: CreateSkinFormProps) {
  const { register, control } = submitForm;

  const rarityOptions: ValueMap[] = [
    { value: "0", label: "Ultimate" },
    { value: "1", label: "Mythic" },
    { value: "2", label: "Legendary" },
    { value: "3", label: "Epic" },
    { value: "4", label: "None" },
  ];

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
              options={rarityOptions}
              placeholder="Select rarity"
            />
          );
        }}
      />
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
    </>
  );
}
