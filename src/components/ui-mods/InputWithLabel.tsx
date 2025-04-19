import { useId } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type InputWithLabelProps = Omit<React.ComponentProps<"input">, "id"> & {
    label?: string;
};

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
    label,
    ...props
}) => {
    const id: string = useId();

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            {label && <Label htmlFor={id}>{label}</Label>}
            <Input id={id} {...props} />
        </div>
    );
};

export default InputWithLabel;
