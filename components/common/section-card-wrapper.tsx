import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import SectionHeader from "./section-header";

interface SectionCardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
}

const SectionCardWrapper = ({
  children,
  headerLabel,
}: SectionCardWrapperProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <SectionHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default SectionCardWrapper;
