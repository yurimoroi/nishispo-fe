"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const ButtonReturn = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="border-blue-100 text-blue-100 mt-5 rounded border-2 bg-white hover:bg-blue"
    >
      戻る
    </Button>
  );
};
