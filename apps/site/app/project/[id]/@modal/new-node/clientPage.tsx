"use client"

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";

export function ClientPageNewNode() {

  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => { router.back() }}>
      <DialogTitle>Neue Node</DialogTitle>
      <DialogContent>

      </DialogContent>
    </Dialog>
  );
}