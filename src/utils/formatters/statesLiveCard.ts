export function recognizeState(state: string): string {
    if(state === "on") {
        return "روشن";
    } else if (state === "off") {
        return "خاموش";
    } else if (state === "unknown") {
        return "قطع ارتباط";
    } else {
        return ""
    }
}

