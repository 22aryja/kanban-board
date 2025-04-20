export type StateControl = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export type Option = {
    label: string;
    value: string | number;
};

export type DropdownOption = {
    label: string;
    onClick: () => void;
};
