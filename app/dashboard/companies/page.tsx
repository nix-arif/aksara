"use client";

import SectionCardWrapper from "@/components/common/section-card-wrapper";
import BasicTable from "@/components/tables/basic-table";
import { useSession } from "@/context/SessionContext";
import React, { useEffect, useState } from "react";

const CompaniesPage = () => {
  const session = useSession();

  const [data, setData] = useState(null);

  const tableHead = ["No", "Name", "Action"];

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!session?.user?.isSuperAdmin) return; // ✅ check user
      try {
        const res = await fetch("/api/companies/lists");
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, [session]);

  return (
    <SectionCardWrapper headerLabel="Companies">
      {data && (
        <BasicTable
          tableCaption="All companies"
          tableHead={tableHead}
          tableData={data}
        />
      )}
    </SectionCardWrapper>
  );
};

export default CompaniesPage;
