export type TConfirmModal = {
  title: string;
  isOpen: boolean;
  description: string;
  execLabel?: string;
  cancelLabel?: string;
  resolve: (result: boolean) => void;
};