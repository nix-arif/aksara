"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PencilIcon, TrashBinIcon } from "@/icons";
import Link from "next/link";
import { RegisterCompanySchema } from "@/app/dashboard/create-company/page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface BasicTableProps<T> {
  tableCaption: string;
  tableHead: string[];
  tableData: T[];
}

const BasicTable = <T extends Record<string, any>>({
  tableCaption,
  tableHead,
  tableData,
}: BasicTableProps<T>) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [companyData, setCompanyData] = useState<any>({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterCompanySchema>>({
    resolver: zodResolver(RegisterCompanySchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      postcode: "",
      city: "",
      province: "",
      country: "",
      oldSsmNo: "",
      newSsmNo: "",
      tinNo: "",
    },
  });

  return (
    <>
      <Table>
        <TableCaption>{tableCaption}</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHead.map((row, index) => (
              <TableHead
                key={index}
                className={`${index === 0 ? "w-[20%]" : "w-[40%]"} ${
                  index === tableHead.length - 1 ? "text-right" : ""
                }`}
              >
                {row}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell className="w-[20%]">{rowIndex + 1}</TableCell>
              <TableCell className="w-[40%]">{row.name}</TableCell>
              <TableCell className="w-[40%]">
                <div className="flex gap-2 justify-end">
                  <Link href="" className="cursor-pointer">
                    <TrashBinIcon />
                  </Link>
                  <Link href="" className="cursor-pointer">
                    <PencilIcon
                      onClick={async () => {
                        setOpenDialog(true);
                        console.log(tableData);
                        if (tableData.length > 0) setCompanyData(row);
                      }}
                    />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* MODAL */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit {`${companyData?.name?.toUpperCase() ?? ""}`} company
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BasicTable;
