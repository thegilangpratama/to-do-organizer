import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";

import Avatar from "./Avatar";
import useSignOutMutation from "../hooks/auth/use-sign-out-mutation";
import useUserQuery from "../hooks/user/use-user-query";

type Props = {};

const NavBar: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const refAvatar = useRef<HTMLDivElement>(null);
  const refMenu = useRef<HTMLDivElement>(null);
  const userQuery = useUserQuery();
  const queryClient = useQueryClient();
  const signOutMutation = useSignOutMutation();

  const signOut = async () => {
    try {
      await signOutMutation.mutateAsync();
    } finally {
      await router.replace("/auth/signin");

      queryClient.resetQueries();

      Cookies.remove("access_token", {
        path: "/",
      });
    }
  };

  // Close menu if outside is clicked.
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refAvatar.current && refMenu.current) {
        if (
          !refAvatar.current.contains(event.target) &&
          !refMenu.current.contains(event.target)
        ) {
          setIsAccountMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex flex-row justify-between items-center px-4">
      <Image
        src="/images/trello.svg"
        alt="charcentric logo"
        width={144}
        height={28}
      />
      <Link href="/dashboard">
        <div className="flex -ml-5 justify-center hover:bg-slate-200 px-2 py-2 rounded-xl hover:border hover:border-gray-400">
          <a className="mr-4">
            <div className="w-8 h-8 rounded flex items-center justify-center">
            <Image
              src="/images/trello-mark-blue.svg"
              alt="Dashboard logo"
              width={24}
              height={24}
            />
            </div>
          </a>
          <p className="text-slate-500 flex items-center -ml-3">
            Boards
          </p>
        </div>
      </Link>
      {userQuery.status === "success" && (
        <div className="relative">
          <div ref={refAvatar}>
            <Avatar
              fullname={userQuery.data.fullname}
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            />
          </div>
          {isAccountMenuOpen && (
            <div
              ref={refMenu}
              className="w-72 bg-white rounded border shadow-lg absolute top-10 right-0"
            >
              <div className="p-4 border-b">
                <p className="text-center text-xs text-slate-500">Account</p>
              </div>
              <div className="p-4 border-b">
                <p className="text-xs text-slate-600 font-semibold mb-1">
                  {userQuery.data.fullname}
                </p>
                <p className="text-xs text-slate-400">{userQuery.data.email}</p>
              </div>
              <div className="p-4">
                <button
                  className="w-full text-left text-xs text-red-500"
                  type="button"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
