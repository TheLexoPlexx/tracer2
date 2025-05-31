"use client"

import { Dialog, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => { router.back() }}>
      <DialogTitle>Neue Node</DialogTitle>

    </Dialog>
  );
}