import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { MdAdd, MdClose } from "react-icons/md";
import { motion } from "framer-motion";

import useCreateListMutation from "../hooks/lists/use-create-list-mutation";
import Button from "./Button";
import classnames from "classnames";

type Props = {
  boardId: number;
};

const CreateListForm: React.FC<Props> = ({ boardId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const refContainer = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const createListMutation = useCreateListMutation();

  const containerVariants = {
    closed: {
      height: 100,
      background: "rgb(255, 255, 255)", // bg-slate-500
      transition: {
        staggerChildren: 0.05,
        when: "afterChildren",
      },
      border: "2px dashed lightgray", // Adjust the border width and color as needed
    },
    opened: {
      height: 200,
      background: "rgb(248 248 248)", // bg-slate-300
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
  };

  const openedVariants = {
    closed: {
      opacity: 0,
      display: "none",
    },
    opened: {
      opacity: 1,
      display: "block",
    },
  };

  const closedVariants = {
    closed: {
      opacity: 1,
      display: "flex",
    },
    opened: {
      opacity: 0,
      display: "none",
    },
  };

  const createList = async () => {
    if (!title) return;

    try {
      setTitle("");
      refInput.current?.focus();

      await createListMutation.mutateAsync({
        body: {
          title,
          board_id: boardId,
        },
      });
    } catch (error) {
      toast.error("Failed to create a list.");
    }
  };

  // Handle input autofocus.
  useEffect(() => {
    if (isOpen) {
      setTitle("");

      setTimeout(() => {
        refInput.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Close form if outside is clicked.
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refContainer.current) {
        if (!refContainer.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      ref={refContainer}
      className={classnames("shrink-0 w-72 rounded-xl overflow-hidden", {
        "cursor-pointer": !isOpen,
      })}
      variants={containerVariants}
      initial="closed"
      animate={isOpen ? "opened" : "closed"}
      transition={{
        ease: "easeIn",
        duration: 0.2,
      }}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          setIsOpen(true);
        }
      }}
    >
      {/* Opened */}
      <motion.div
        className="p-2"
        variants={openedVariants}
        initial="close"
        animate={isOpen ? "opened" : "closed"}
        transition={{
          ease: "easeIn",
          duration: 0.2,
        }}
      >
        <input
          ref={refInput}
          className="w-full py-3 rounded-xl text-xs border-slate-400 outline-slate-500 mb-2"
          type="text"
          name="title"
          placeholder="Enter list title..."
          value={title}
          maxLength={30}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            switch (event.key) {
              case "Enter":
                createList();
                break;

              case "Escape":
                setIsOpen(false);
                break;

              default:
                break;
            }
          }}
        />
        <div className="flex items-center">
          <Button
            className="outline-black mr-2"
            type="button"
            onClick={createList}
          >
            Add list
          </Button>
          <button
            className="text-slate-500 hover:text-slate-600"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <MdClose size={24} />
          </button>
        </div>
      </motion.div>

      {/* Closed */}
      <motion.div
        className="items-center justify-center px-4 h-full transition-all text-center text-slate-300 duration-200 hover:bg-[#F8F8F8]"
        variants={closedVariants}
        initial="close"
        animate={isOpen ? "opened" : "closed"}
        transition={{
          ease: "easeIn",
          duration: 0.2,
        }}
        onClick={() => setIsOpen(true)}
      >
        {/* <MdAdd color="black" size={24} /> */}
        <p className="ml-2 text-xs text-slate-500">Create new list</p>
      </motion.div>
    </motion.div>
  );
};

export default CreateListForm;
