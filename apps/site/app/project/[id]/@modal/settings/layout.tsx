"use client"

import { Drawer } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Layout(props: {
  children: React.ReactNode
}) {

  const router = useRouter();

  return (
    <Drawer open={true} anchor="right" variant="temporary" sx={{ p: 2 }} onClose={() => router.back()}>
      {props.children}
    </Drawer>
  )
}