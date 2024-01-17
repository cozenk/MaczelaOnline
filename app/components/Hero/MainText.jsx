"use client";

import { PencilIcon } from "lucide-react";
import { useEditable } from "./hooks";
import { useCurrentUser } from "@shared/hooks";
import { updateMainTextAction } from "./actions";
import { toast } from "@shared/use-toast";

export default function MainText({ initialText = "" }) {
  const { isLoading, user } = useCurrentUser();

  const {
    editable,
    setEditable,
    showEditOverlay,
    setShowEditOverlay,
    saveNewText,
    editableElementRef,
  } = useEditable({
    onSaveText: async (newText) => {
      await updateMainTextAction(newText);

      toast({
        title: "New main-text saved!",
        description: `"${newText}"`,
      });
    },
  });

  if (isLoading) return null;

  return (
    <div
      className={`relative mb-10 w-full text-center text-5xl font-bold tracking-tight dark:text-white  md:text-left md:text-7xl`}
    >
      {editable ? (
        <h1
          ref={editableElementRef}
          contentEditable={editable}
          tabIndex={1}
          onBlur={saveNewText}
          onKeyDown={async (e) => {
            if (e.key === "Enter" && e.shiftKey) {
              return;
            }
            if (e.key === "Enter") {
              await saveNewText(e);
            }
          }}
        >
          {initialText ? (
            initialText
          ) : (
            <>
              Garantisadong fresh na may{" "}
              <span className="text-red-500">pagmamahal ♥️</span>
            </>
          )}
        </h1>
      ) : (
        <h1
          onMouseEnter={(e) => {
            if (user?.role === "ADMIN") setShowEditOverlay(true);
          }}
        >
          {initialText ? (
            initialText
          ) : (
            <>
              Garantisadong fresh na may{" "}
              <span className="text-red-500">pagmamahal ♥️</span>
            </>
          )}
        </h1>
      )}

      {showEditOverlay ? (
        <div
          onClick={(e) => {
            setEditable(true);
            setShowEditOverlay(false);
          }}
          onMouseLeave={(e) => {
            setShowEditOverlay(false);
          }}
          className="absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center bg-black/60"
        >
          <div className="-ml-5 flex items-center gap-2 text-lg tracking-normal">
            <PencilIcon size={24} />
            <span>Edit</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
