import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectInputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  values: string[];
};

const SelectInput = ({
  label,
  placeholder,
  className,
  values,
}: SelectInputProps) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-gray-900">{label}</label>
    )}

    <div className="mt-2">
      <Select>
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
          {values.map((item) => {
            return (
              <SelectItem
                className="cursor-pointer rounded-sm px-3 py-2 text-sm focus:bg-mint-100 data-[state=checked]:bg-mint-200"
                value={item}
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default SelectInput;
