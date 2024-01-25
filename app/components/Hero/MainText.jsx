"use client";

import { PencilIcon } from "lucide-react";
import { useEditable } from "./hooks";
import { useCurrentUser } from "@shared/hooks";
import { updateMainTextAction } from "./actions";
import { toast } from "@shared/use-toast";

const allowedRoles = ["ADMIN", "STAFF"];

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

      if (!newText) {
        toast({
          title: "Using the default main-text!",
        });
      } else
        toast({
          title: "New main-text saved!",
          description: `"${newText}"`,
        });
    },
  });

  const defaultText = (
    <div className="space-x-4">
      <span>Garantisadong fresh na may</span>
      <span className="text-red-500">pagmamahal ♥️</span>
    </div>
  );

  if (isLoading) return null;

  return (
    <div
      className={`relative mb-10 w-full text-center text-4xl font-bold tracking-tight dark:text-white  md:text-left md:text-6xl`}
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
          {initialText ? initialText : defaultText}
        </h1>
      ) : (
        <h1
          onMouseEnter={(e) => {
            if (allowedRoles.includes(user?.role)) setShowEditOverlay(true);
          }}
        >
          {initialText ? initialText : defaultText}
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
