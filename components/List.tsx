import React, { useState, useRef, useEffect } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import classnames from "classnames";

import styles from "../styles/components/List.module.css";
import Button from "./Button";
import Card from "./Card";
import useDeleteListMutation from "../hooks/lists/use-delete-list-mutation";
import useUpdateListBoardMutation from "../hooks/lists/use-update-list-mutation";
import useCardsQuery from "../hooks/cards/use-cards-query";
import useCreateCardMutation from "../hooks/cards/use-create-card-mutation";
import useBoardQuery from "../hooks/boards/use-board-query";

type Props = {
  id: number;
  boardId: number;
  index: number;
  title: string;
};

const List: React.FC<Props> = ({ id, boardId, index, title }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isCreateCardFormOpen, setIsCreateCardFormOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const refListTitleInput = useRef<HTMLInputElement>(null);
  const refCardTitleInput = useRef<HTMLTextAreaElement>(null);
  const refCreateCardForm = useRef<HTMLDivElement>(null);
  const refChildren = useRef<HTMLDivElement>(null);
  const boardQuery = useBoardQuery(boardId);
  const cardsQuery = useCardsQuery(id);
  const deleteListMutation = useDeleteListMutation();
  const updateListMutation = useUpdateListBoardMutation();
  const createCardMutation = useCreateCardMutation();

  const maxHeight = (() => {
    const viewportHeight = window?.innerHeight || 0;
    const footerHeight = isCreateCardFormOpen ? 40 : 0;

    return viewportHeight * 0.6 + footerHeight;
  })();

  const deleteList = async () => {
    try {
      await deleteListMutation.mutateAsync({
        id,
        boardId,
      });
    } catch (error) {
      toast.error("Failed to delete a list.");
    }
  };

  const updateListTitle = async (title: string) => {
    if (!title) return;

    setIsEditingTitle(false);

    try {
      await updateListMutation.mutateAsync({
        id,
        boardId,
        body: {
          title,
        },
      });
    } catch (error) {
      toast.error("Failed to update a list.");
    }
  };

  const createCard = async () => {
    try {
      await createCardMutation.mutateAsync({
        body: {
          title: cardTitle,
          list_id: id,
        },
      });
    } catch (error) {
      toast.error("Failed to delete a card.");
    }
  };

  const handleCardTitleHeight = () => {
    if (!refCardTitleInput.current) return;

    refCardTitleInput.current.style.height = "64px";

    refCardTitleInput.current.style.height =
      refCardTitleInput.current.scrollHeight + "px";
  };

  const scrollToBottom = () => {
    if (refChildren.current) {
      refChildren.current.scrollTo(0, refChildren.current.scrollHeight);
    }
  };

  // Set focus on list title input if title editing form opened.
  useEffect(() => {
    if (isEditingTitle) {
      refListTitleInput.current?.select();
    }
  }, [isEditingTitle]);

  // Set focus on card title input if create card form opened.
  useEffect(() => {
    if (isCreateCardFormOpen) {
      scrollToBottom();
      refCardTitleInput.current?.focus();
    }
  }, [isCreateCardFormOpen]);

  // const getRandomColor = (): string => {
  //   const colors: string[] = ['#EBFDF5', '#F4F4F4', '#F8E8E8', '#F4F4FF', '#FEF7EF'];
  //   const randomIndex: number = Math.floor(Math.random() * colors.length);
  //   return colors[randomIndex];
  // };

  // const [backgroundColor, setBackgroundColor] = useState<string>('');

  // useEffect(() => {
  //   setBackgroundColor(getRandomColor());
  // }, []);

  // Close form if outside is clicked.
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refCreateCardForm.current) {
        if (!refCreateCardForm.current.contains(event.target)) {
          setIsCreateCardFormOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Draggable draggableId={`list-${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={classnames(
            "shrink-0 w-72 rounded-xl mr-10 flex flex-col",
            {
              "shadow-xl": snapshot.isDragging,
            }
          )}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // style={{ backgroundColor }}
        >
          {/* Header */}
          <div className="w-full flex items-center px-2 h-12 bg-[#f4f4f4] rounded-xl mb-3">
            {!isEditingTitle ? (
              <button
                className="flex-1 text-left px-2 py-1 text-sm text-black font-semilight"
                type="button"
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </button>
            ) : (
              <div className="flex-1">
                <input
                  ref={refListTitleInput}
                  className="w-full px-2 py-1 text-sm text-black font-semibold rounded-xl"
                  type="text"
                  defaultValue={title}
                  onKeyDown={(event) => {
                    if (["Enter", "Escape"].includes(event.key)) {
                      refListTitleInput.current?.blur();
                    }
                  }}
                  onBlur={(event) => {
                    updateListTitle(event.target.value);
                  }}
                />
              </div>
            )}
            <button
              className="ml-2 w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-600 hover:bg-slate-400"
              type="button"
              onClick={deleteList}
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Children */}
          <div
            ref={refChildren}
            style={{ maxHeight }}
            className={classnames("", styles.content)}
          >
            {/* Card list */}
            <Droppable droppableId={`list-${id}`} type="CARD">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {cardsQuery.status === "success" && (
                    <>
                      {cardsQuery.data.map((card, index) => {
                        const totalChecks = card.checks?.length || 0;

                        const totalCompletedChecks =
                          card.checks?.filter((check: any) => check.is_checked)
                            .length || 0;

                        const href = `/boards/${boardQuery.data?.id}-${boardQuery.data?.slug}?card=${card.id}-${card.slug}`;

                        return (
                          <Card
                            key={card.id}
                            id={card.id}
                            href={href}
                            index={index}
                            title={card.title}
                            description={card.description}
                            dueDate={card.due_dates?.[0]?.timestamp}
                            totalChecks={totalChecks}
                            totalCompletedChecks={totalCompletedChecks}
                            hasDescription={!!card.description}
                            hasChecklist={card.has_checklist}
                            isDueDateDone={!!card.due_dates?.[0]?.is_done}
                            isDisabled={card.id > 10000}
                          />
                        );
                      })}
                    </>
                  )}
                  {!cardsQuery.data?.length && <div className="h-[1px]" />}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Create card form */}
            {isCreateCardFormOpen && (
              <div ref={refCreateCardForm} className="pb-2">
                <div className="bg-white border-dashed border-2 border-slate-300 rounded-xl mb-2">
                  <textarea
                    ref={refCardTitleInput}
                    className="w-full p-2 border-0 resize-none rounded-xl text-xs h-16 focus:ring-0 pl-5 pt-5"
                    value={cardTitle}
                    placeholder="Enter a title for this card..."
                    onChange={(event) => setCardTitle(event.target.value)}
                    onKeyDown={(event) => {
                      switch (event.key) {
                        case "Enter":
                          event.preventDefault();
                          createCard();
                          setCardTitle("");
                          scrollToBottom();
                          refCardTitleInput.current?.focus();
                          break;

                        case "Escape":
                          setIsCreateCardFormOpen(false);
                          setCardTitle("");
                          break;

                        default:
                          break;
                      }
                    }}
                    onInput={handleCardTitleHeight}
                  />
                </div>
                <div className="flex items-center">
                  <Button
                    className="outline-black mr-2"
                    type="button"
                    onClick={() => {
                      createCard();
                      setCardTitle("");
                      scrollToBottom();
                      refCardTitleInput.current?.focus();
                    }}
                  >
                    Add card
                  </Button>
                  <button
                    className="text-slate-500 hover:text-slate-600"
                    type="button"
                    onClick={() => {
                      setIsCreateCardFormOpen(false);
                      setCardTitle("");
                    }}
                  >
                    <MdClose size={24} />
                  </button>
                </div>
              </div>
            )}
            {/* Footer */}
          {!isCreateCardFormOpen && (
            <div className="h-10 flex items-start">
              <button
                className="w-full px-2 py-1 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 h-32 text-slate-500 hover:text-slate-600 hover:bg-[#f8f8f8]"
                type="button"
                onClick={() => setIsCreateCardFormOpen(true)}
              >
                <MdAdd size={15} />
                <p className="text-xs">Add a card</p>
              </button>
            </div>
          )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
