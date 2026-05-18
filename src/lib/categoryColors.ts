// Per-category accent colors for the tri-color brand system.
export type CategoryAccent = {
  hex: string;
  text: string;
  bg: string;
  border: string;
};

const TERRACOTTA: CategoryAccent = {
  hex: "#99420d",
  text: "text-[#99420d]",
  bg: "bg-[#99420d]",
  border: "border-[#99420d]",
};
const FOREST: CategoryAccent = {
  hex: "#2D4A2D",
  text: "text-[#2D4A2D]",
  bg: "bg-[#2D4A2D]",
  border: "border-[#2D4A2D]",
};
const BORDEAUX: CategoryAccent = {
  hex: "#8B1A1A",
  text: "text-[#8B1A1A]",
  bg: "bg-[#8B1A1A]",
  border: "border-[#8B1A1A]",
};

const MAP: Record<string, CategoryAccent> = {
  sculpture: TERRACOTTA,
  scu: TERRACOTTA,
  tressage: FOREST,
  tre: FOREST,
  tissage: BORDEAUX,
  tis: BORDEAUX,
  poterie: TERRACOTTA,
  pot: TERRACOTTA,
  forge: BORDEAUX,
  for: BORDEAUX,
  peinture: FOREST,
  pnt: FOREST,
};

export const categoryAccent = (category?: string): CategoryAccent =>
  MAP[(category ?? "").toLowerCase()] ?? TERRACOTTA;
