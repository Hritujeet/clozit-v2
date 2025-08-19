"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" size="sm" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin"/> : "Sign Out"}
    </Button>
  );
}
