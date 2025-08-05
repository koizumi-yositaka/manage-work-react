import { useAtom } from "jotai";
import { confirmModalAtom } from "@/atoms/confirmModalAtom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDialog() {
  const [dialog, setDialog] = useAtom(confirmModalAtom);

  const handleClose = (result: boolean) => {
    dialog.resolve(result);
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <Dialog open={dialog.isOpen} onOpenChange={() => handleClose(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialog.title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <p>{dialog.description}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>
            {dialog.cancelLabel ?? "NO"}
          </Button>
          <Button onClick={() => handleClose(true)}>
            {dialog.execLabel ?? "YES"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
