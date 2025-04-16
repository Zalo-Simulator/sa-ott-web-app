import API from '$lib/api/Interceptor'
import { MEDIA_API } from '$lib/api/API-Endpoint'

export const checkUrlAccessible = async (url: string): Promise<boolean> => {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok;
    } catch (err) {
        console.error('Error checking URL:', err);
        return false;
    }
}

export const isImage = (input: string | File): boolean => {
    if (typeof input === 'string') {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff'];
        return imageExtensions.some(ext => input.toLowerCase().endsWith(ext));
    } else {
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

export const getFileNameFromUrl = (url: string): string => {
    try {
        return decodeURIComponent(url.substring(url.lastIndexOf('/') + 1));
    } catch (error) {
        console.error('Invalid URL:', error);
        return '';
    }
}

export const downloadFile = async (s3key: string, isS3key = true) => {
    const link = document.createElement('a')
    link.target = '_blank'
    let url = s3key
    if (isS3key) {
        url = (
            await API.get(
                MEDIA_API.download.replace('{s3_key}', encodeURIComponent(s3key)),
                undefined,
                '',
                null,
                true
            )
        ).data.url
    }

    link.href = url
    link.click()
}

