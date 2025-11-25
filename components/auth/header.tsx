import { cn } from "@/lib/utils";
import { CiLink } from "react-icons/ci";

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <CiLink className="text-5xl text-fuchsia-600" />
      <h1
        className={cn(
          "text-2xl font-semibold text-center bg-radial from-pink-600 from-40% to-fuchsia-600 text-transparent bg-clip-text"
        )}
      >
        aksara
      </h1>
      <p className="text-muted-foreground text-sm mt-4">{label}</p>
    </div>
  );
};

export default Header;
