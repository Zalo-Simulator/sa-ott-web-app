
import { FileText, FileSpreadsheet, File } from 'lucide-svelte'

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

export const isImage = (input: string | File): boolean => {
    if (typeof input === 'string') {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff'];
        return imageExtensions.some(ext => input.toLowerCase().endsWith(ext));
    } else {
        console.log('input.type', input.type)
        return input.type.startsWith("image/");
    }
}

export const isVideo = (input: string | File): boolean => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv', '.wmv', '.3gp', '.mpeg'];

    if (typeof input === 'string') {
        const lowerCaseName = input.toLowerCase();
        return videoExtensions.some(ext => lowerCaseName.endsWith(ext));
    } else {
        return input.type.startsWith('video/');
    }
}

export const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();

    if (ext === 'pdf') return { icon: FileText, color: 'red' };
    if (ext === 'doc' || ext === 'docx') return { icon: FileText, color: 'blue' };
    if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') return { icon: FileSpreadsheet, color: 'green' };

    return { icon: File, color: 'gray' };
}

export const getFileNameFromUrl = (url: string): string => {
    try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        return decodeURIComponent(pathname.substring(pathname.lastIndexOf('/') + 1));
    } catch (error) {
        console.error('Invalid URL:', error);
        return '';
    }
}