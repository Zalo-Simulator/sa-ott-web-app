export const getColorByText = (text: string): string => {
    // Create a hash from the text
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to a hex color
    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += value.toString(16).padStart(2, '0');
    }

    return color;
}

export const formatDateTime = (input: string): string => {
    const inputDate = new Date(input);
    const today = new Date();

    const isSameDate =
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear();

    const twoDigits = (num: number) => num.toString().padStart(2, '0');

    const hours = twoDigits(inputDate.getHours());
    const minutes = twoDigits(inputDate.getMinutes());

    if (isSameDate) {
        return `${hours}:${minutes}`;
    } else {
        const day = twoDigits(inputDate.getDate());
        const month = twoDigits(inputDate.getMonth() + 1);
        const year = inputDate.getFullYear().toString().slice(-2);

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
}

export class NameTracker {
    private names: Set<string>;

    constructor() {
        this.names = new Set();
    }

    add(name: string) {
        if (!this.names.has(name)) {
            this.names.add(name);
        }
    }

    remove(name: string) {
        if (this.names.has(name)) {
            this.names.delete(name);
        }
    }

    exists(name: string): boolean {
        return this.names.has(name);
    }

    list(): string {
        return Array.from(this.names).join(', ');;
    }
}