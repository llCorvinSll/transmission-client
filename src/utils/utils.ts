

export function bytesToSize(bytes?: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes == 0 || !bytes) {
        return '0 Byte'
    }
    var i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`);
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};