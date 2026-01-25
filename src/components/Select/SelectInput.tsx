import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Item ={
  label: string,
  value: number
}

type SelectInputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  itens: Item[];
  value?: string;
  onChange?: (value: string) => void;
};

const SelectInput = ({
  label,
  placeholder,
  className,
  itens,
  value,
  onChange,
}: SelectInputProps) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-gray-900">{label}</label>
    )}

    <div className="mt-2">
      <Select key={value ?? "empty"} value={value} onValueChange={onChange}>
        <SelectTrigger
          className="
            w-full
            flex
            justify-between
            rounded-md
            bg-white-100
            text-gray-900
            px-3
            py-5
            text-sm
            outline-1
            outline-gray-300
            focus:outline-2
            focus:-outline-offset-2
            focus:outline-mint-500
            cursor-pointer
          "
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          position="popper"
          side="bottom"
          align="start"
          className="
            w-full
            max-h-60
            overflow-y-auto
            rounded-md
            border
            border-gray-200
            bg-white-100
            p-1
            shadow-md
          "
        >
          {itens.map((item) => {
            return (
              <SelectItem
                className="cursor-pointer rounded-sm px-3 py-2 text-sm focus:bg-mint-100 data-[state=checked]:bg-mint-200"
                value={String(item.value)}
              >
                {item.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default SelectInput;
