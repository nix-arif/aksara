import React from "react";

interface HeaderProps {
  label: string;
}

const SectionHeader = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col">
      <p className="text-brand-600 font-semibold mt-4">{label}</p>
    </div>
  );
};

export default SectionHeader;
