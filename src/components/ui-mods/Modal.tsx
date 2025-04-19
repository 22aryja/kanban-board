import { StateControl } from "@/types/common";
import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "../ui/dialog";

type ModalProps = {
    children: ReactNode;
    stateControl: StateControl;
};

const Modal: React.FC<ModalProps> = ({ children, stateControl }) => {
    return (
        <Dialog open={stateControl.open} onOpenChange={stateControl.setOpen}>
            <DialogTitle hidden></DialogTitle>
            <DialogDescription hidden></DialogDescription>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default Modal;
