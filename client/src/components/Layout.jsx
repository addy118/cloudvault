import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/authProvider";
import Logo from "./Logo";

export default function Layout() {
  const navigate = useNavigate();
  const { user, isAuth, logout } = useAuth();

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-[#222831] font-sans text-[#EEEEEE]">
      <div className="sticky top-0 z-50 w-full border-b border-[#393E46] bg-[#222831]/90 shadow-lg backdrop-blur-md">
        <header className="mx-auto flex h-16 items-center justify-between px-4 md:px-12 lg:h-20">
          <Logo />

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Button
                  variant="ghost"
                  className="gap-2 text-[#EEEEEE] transition-colors hover:bg-[#393E46] hover:text-[#FFD369]"
                >
                  <User className="h-5 w-5" />
                  Account
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="bottom"
                align="end"
                sideOffset={8}
                className="z-50 min-w-[180px] rounded-xl border border-[#393E46] bg-[#222831] p-2 text-[#EEEEEE] shadow-xl backdrop-blur-md transition-all duration-200"
              >
                {isAuth ? (
                  <>
                    <DropdownMenuLabel className="px-2 py-1 text-sm text-[#FFD369]">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-1 bg-[#393E46]" />

                    <DropdownMenuItem
                      className="group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-[#393E46] hover:text-[#FFD369] focus:outline-none"
                      asChild
                    >
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={logout}
                      className="group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-[#393E46] hover:text-[#FFD369] focus:outline-none"
                    >
                      Log Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      className="group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-[#393E46] hover:text-[#FFD369] focus:outline-none"
                      asChild
                    >
                      <Link to="/login">Login</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-[#393E46] hover:text-[#FFD369] focus:outline-none"
                      asChild
                    >
                      <Link to="/signup">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>

      <div className="flex-1 py-16">
        <Outlet />
      </div>

      <footer className="relative overflow-hidden border-t border-[#393E46] bg-[#222831]/90 px-6 py-6 backdrop-blur-sm md:py-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center text-sm text-[#EEEEEE]/70">
            <p>© {currentYear} Cloudvault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
