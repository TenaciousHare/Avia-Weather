export function describeCloudCover(code: string): string {
  const cloudsMap: Record<string, string> = {
    SKC: "bezchmurnie",
    CLR: "bezchmurnie",
    NSC: "brak istotnych chmur",
    NCD: "nie wykryto chmur",
    FEW: "niewielkie zachmurzenie",
    SCT: "zachmurzenie rozproszone",
    BKN: "zachmurzenie duże",
    OVC: "zachmurzenie całkowite",
    VV: "niebo zasłonięte",
  };
  return cloudsMap[code.toUpperCase()] ?? code;
}
