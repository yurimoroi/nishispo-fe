"use client";
import { Button } from "@/components/ui/button";

const TableAction = () => {
  return (
    <div className="flex justify-end gap-4">
      <Button className="pointer-events-none text-sm" variant="strong">
        研修実施済み
      </Button>
    </div>
  );
};

export default TableAction;
