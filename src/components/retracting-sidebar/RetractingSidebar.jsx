import React, { useState } from "react";
import { FiBarChart, FiChevronsRight, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { BiDollarCircle, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import Cookies from "js-cookie";

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">Lance Parker</span>
              <span className="block text-xs text-slate-500">Repo Hub</span>
            </motion.div>
          )}
        </div>
        {/* {open && <FiChevronDown className="mr-2" />} */}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const Option = ({ Icon, title, to, selected, setSelected, open, notifs }) => {
  return (
    <Link to={to}>
      <motion.button
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          selected === title
            ? "bg-indigo-100 text-indigo-800"
            : "text-slate-500 hover:bg-slate-100"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}

        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const navOptions = [
  { icon: Globe, title: "Browse Repos", to: "/home" },
  { icon: CgProfile, title: "Profile", to: "/home/profile" },
  {
    icon: GitHubLogoIcon,
    title: "Publish Repo",
    to: "/home/publish-repository",
  },
  {
    icon: BiDollarCircle,
    title: "Published Repos",
    to: "/home/published-repositories",
  },
  {
    icon: FiShoppingCart,
    title: "Purchased Repos",
    to: "/home/purchased-repositories",
  },
  { icon: FiBarChart, title: "Analytics", to: "/home/analytics" },
];

const RetractingSidebar = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(
      navOptions.find(
        (navOption) => navOption.to === window.location.href.slice(21)
      )?.title
    );
  }, []);

  useEffect(() => {
    if (selected === "Logout") {
      // Remove Cookie and data from localstorage and
      Cookies.remove("repo_hub_access_token");
      localStorage.removeItem("userDetails");
      localStorage.removeItem("publishedRepos");
      localStorage.removeItem("purchasedRepos");
      window.location.replace("/");
    }
  }, [selected]);

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        {navOptions.map((navOption) => (
          <Option
            key={navOption.title}
            Icon={navOption.icon}
            title={navOption.title}
            to={navOption.to}
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        ))}
      </div>

      <Option
        Icon={BiLogOut}
        title={"Logout"}
        to={""}
        selected={selected}
        setSelected={setSelected}
        open={open}
      />
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

export default RetractingSidebar;
