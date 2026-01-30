export const toSentenceCase = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e: any) {
    console.error("Invalid JSON string:", e);
    return false;
  }
  return true;
}
