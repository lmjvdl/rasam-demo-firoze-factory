export const extractId = (value: number | { id: number }): number => {
    return typeof value === "object" && value !== null ? value.id : value;
};