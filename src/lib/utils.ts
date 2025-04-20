import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const generateId = (arr: { id: number }[]): number => {
    if (arr.length === 0) {
        return 1;
    } else {
        const idOfTheLastElement = arr[arr.length - 1].id;
        return idOfTheLastElement + 1;
    }
};
