import { MallParams, normalizeMallParams } from "./mallParams";
export const swrKeys = {
  mallProducts: (p: MallParams) => ["mall-products", normalizeMallParams(p)] as const,
}; 