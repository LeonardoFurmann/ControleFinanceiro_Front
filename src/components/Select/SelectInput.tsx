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
      <label className="block text-sm font-medium text-foreground">{label}</label>
    )}

    <div className="mt-2">
      <Select key={value ?? "empty"} value={value} onValueChange={onChange}>
        <SelectTrigger
          className="
            w-full
            flex
            justify-between
            rounded-md
            bg-background
            border
            border-input
            text-foreground
            px-3
            py-5
            text-sm
            transition-colors
            hover:bg-accent/40
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
            border-border
            bg-popover
            p-1
            shadow-md
          "
        >
          {itens.map((item) => {
            return (
              <SelectItem
                className="cursor-pointer rounded-sm px-3 py-2 text-sm text-foreground focus:bg-accent focus:text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
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
