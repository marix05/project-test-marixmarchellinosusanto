import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

// components
import Nav from "./Nav";
import Logo from "./Logo";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer" style={{ color: "#fff" }} />
      </SheetTrigger>
      <SheetContent>
        <div className="h-full flex flex-col justify-between">
          <Nav
            containerStyles="text-primary-foreground flex flex-col items-center gap-y-6 mt-20"
            linkStyles="text-2x hover:scale-[1.1] transition-all duration-300"
          />
          <div className="flex justify-center py-4">
            <Logo />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
