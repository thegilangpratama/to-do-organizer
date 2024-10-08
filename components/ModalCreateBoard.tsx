import React, { useEffect, useRef } from "react";
import Modal from "react-modal";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

import Button from "./Button";
import useCreateBoardMutation from "../hooks/boards/use-create-board-mutation";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title should have at least 5 characters")
    .max(50, "Title should have maximum 50 characters")
    .required("Title is required"),
});

type Props = {
  isOpen: boolean;
  onRequestClose?: () => void;
};

const ModalCreateBoard: React.FC<Props> = ({ isOpen, onRequestClose }) => {
  const refInput = useRef<HTMLInputElement>(null);
  const createBoardMutation = useCreateBoardMutation();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        refInput.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          background: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          left: "50%",
          transform: "translateX(-50%)",
          width: "23rem",
          height: "12rem",
          padding: 0,
          background: "transparent",
          border: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <Formik
        initialValues={{
          title: "",
        }}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={async (values) => {
          onRequestClose?.();

          try {
            await createBoardMutation.mutateAsync({
              body: values,
            });
          } catch (error) {
            toast.error("Failed to create a board.");
          }
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="p-4 h-32 w-80 bg-white rounded-xl mb-4">
                <input
                  ref={refInput}
                  className="text-md text-black font-semibold w-full rounded-xl px-2 border-2 border-dashed border-gray-300 h-10"
                  name="title"
                  type="text"
                  placeholder="Enter board name"
                  value={values.title}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <Button
              className="rounded-xl"
                backgroundColor={["bg-green-600", "bg-green-700"]}
                disabled={!!errors.title || isSubmitting}
              >
                Create Board
              </Button>
            </form>
          </div>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalCreateBoard;
