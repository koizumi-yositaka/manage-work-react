import { type TConfirmModal } from "@/types/components";
import { atom } from "jotai";

export const confirmModalAtom = atom<TConfirmModal>({
  title: "",
  isOpen: false,
  description: "",
  type: "confirm",
  resolve: () => {},
});