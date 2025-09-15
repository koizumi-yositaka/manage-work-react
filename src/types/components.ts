export type TConfirmModal = {
  title: string;
  type: "confirm" | "info" | "error";
  isOpen: boolean;
  description: string;
  execLabel?: string;
  cancelLabel?: string;
  resolve: (result: boolean) => void;
  isOnlyYes?: boolean;  // はいのみ、メッセージ表示にしようする
};