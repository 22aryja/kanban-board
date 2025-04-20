import { DropdownOption, StateControl } from "@/types/common";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ReactNode } from "react";

type DropdownProps = {
    children: ReactNode;
    stateControl: StateControl;
    options: DropdownOption[];
};

export const Dropdown: React.FC<DropdownProps> = ({
    children,
    stateControl,
    options,
}) => {
    return (
        <DropdownMenu
            open={stateControl.open}
            onOpenChange={stateControl.setOpen}
        >
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {options.map((option: DropdownOption) => (
                        <DropdownMenuItem
                            key={option.label}
                            onClick={option.onClick}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Dropdown;
