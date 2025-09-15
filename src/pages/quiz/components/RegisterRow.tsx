import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

type RegisterRowProps = {
  quizName: string;
  onChangeQuizName: (value: string) => void;
  onRegister: () => void;
  disabled?: boolean;
  onAddPage?: () => void;
  onUploadFile?: (file: File) => void | Promise<void>;
};

export function RegisterRow({ quizName, onChangeQuizName, onRegister, disabled, onAddPage, onUploadFile }: RegisterRowProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        {onAddPage && (
          <Button onClick={onAddPage}>
            ページを追加
          </Button>
        )}
      </div>
      <div className="flex justify-end items-center gap-2">
        <Input
          value={quizName}
          onChange={(e) => onChangeQuizName(e.target.value)}
          placeholder="クイズ名"
          className="w-64"
        />
        <Button onClick={onRegister} disabled={disabled} className="bg-green-600 hover:bg-green-700">
          登録
        </Button>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">ファイルアップロード</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>ファイルを選択</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3">
              <div
                className="rounded-md border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer bg-[repeating-linear-gradient(-45deg,theme(colors.gray.50),theme(colors.gray.50)_10px,theme(colors.gray.100)_10px,theme(colors.gray.100)_20px)]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files?.[0] ?? null;
                  setSelectedFile(f);
                }}
              >
                <label htmlFor="file-input" className="flex flex-col items-center gap-2">
                  <svg className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" />
                    <path d="M12 12v9" />
                    <path d="M8 12l4-4 4 4" />
                    <path d="M20 8a4 4 0 00-8 0" />
                  </svg>
                  <div className="text-sm text-gray-700">ここにファイルをドラッグ＆ドロップ</div>
                  <div className="text-xs text-gray-500">またはクリックして選択</div>
                </label>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setSelectedFile(f);
                  }}
                />
              </div>
              {selectedFile && (
                <div className="text-sm text-gray-600">選択中: {selectedFile.name}</div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>キャンセル</Button>
              <Button
                onClick={async () => {
                  if (selectedFile && onUploadFile) {
                    await onUploadFile(selectedFile);
                  }
                  setIsUploadOpen(false);
                  setSelectedFile(null);
                }}
                disabled={!selectedFile}
              >アップロード</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}


