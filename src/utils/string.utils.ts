export class StringUtils {
    
    public static isNullOrEmpty(val: string): boolean {
        if (val === undefined || val === null || val === '') {
            return true;
        }
        else {
            return false;
        }
    }
}