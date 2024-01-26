"use client";

import { useCurrentUser } from "@shared/hooks";
import { useEditable } from "./hooks";
import { updateHeroSubTextAction } from "./actions";
import { PencilIcon } from "lucide-react";
import { toast } from "@shared/use-toast";

const allowedRoles = ["ADMIN", "STAFF"];

export default function SubText({ initialText = "" }) {
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
      await updateHeroSubTextAction(newText);

      if (!newText) {
        toast({
          title: "Using the default sub-text!",
        });
      } else
        toast({
          title: "New sub-text saved!",
          description: `"${newText}"`,
        });
    },
  });

  const defaultText = (
    <>
      One of the <span className="text-red-600">BEST PIZZA</span> in Marikina
      since 2010. <br />
      With all over 12 branches nationwide!
    </>
  );

  if (isLoading) return null;

  return (
    <div className="relative mt-10 hidden text-sm italic leading-8 text-black dark:text-white md:text-2xl lg:block">
      {editable ? (
        <p
          ref={editableElementRef}
          contentEditable
          tabIndex={1}
          onBlur={saveNewText}
          onKeyDown={async (e) => {
            if (e.key === "Enter" && e.shiftKey) {
              return;
            }
            if (e.key === "Enter") {
              await saveNewText(e);
              return;
            }
          }}
        >
          {initialText ? initialText : defaultText}
        </p>
      ) : (
        <p
          onMouseEnter={(e) => {
            if (allowedRoles.includes(user?.role)) setShowEditOverlay(true);
          }}
        >
          {initialText ? initialText : defaultText}
        </p>
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
