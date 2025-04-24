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

export const generateNegativeId = (arr: { id: number }[]): number => {
    let minId = 0;

    for (const item of arr) {
        if (item.id < minId) {
            minId = item.id;
        }
    }

    return minId - 1;
};

export const getLastIdFrom = (obj: Record<number, unknown>): number => {
    const arr: string[] = Object.keys(obj);
    const amount: number = Object.keys(obj).length;

    return parseInt(arr[amount - 1]);
};
