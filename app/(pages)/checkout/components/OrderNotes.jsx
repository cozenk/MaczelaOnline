"use client";

import { Button } from "@shared/Button";
import { ArrowDownToLineIcon, PenBoxIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function OrderNotes() {
  const [notes, setNote] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (showEditor) {
      editorRef.current.focus();

      if (!isSaved) editorRef.current.focus();

      const notesHandler = (e) => {
        setNote(e.target.textContent);
        if (e.which !== 8) {
          // Allow backspace
          const content = e.target.textContent;

          // Check for Enter key
          if (e.which === 13) {
            e.preventDefault();
            return;
          }

          if (content.length > 100) {
            e.preventDefault();
            // Optionally, you can truncate the content to the maximum length
            // $('#'+content_id).text(content.substring(0, max));
          }
        }
      };

      editorRef.current.addEventListener("keyup", notesHandler);
      editorRef.current.addEventListener("keydown", notesHandler);
    }
  }, [showEditor, isSaved]);

  return (
    <div className="order-notes">
      {showEditor ? (
        <>
          <div className="notes">
            <h3>PWD/Senior Citizen Card No: </h3>
            <input
              id="notes"
              name="notes"
              type="hidden"
              value={notes}
              onChange={() => {}}
            />
            <p
              className="w-full border border-neutral-500 p-5 italic"
              contentEditable={!isSaved}
              ref={editorRef}
            >
              Input your ID Number For 20% Discount!
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="mb-5 flex w-full items-center gap-2"
            onClick={() => {
              setIsSaved((prev) => !prev);
            }}
          >
            {isSaved ? (
              <>
                Edit <PenBoxIcon size={16} />
              </>
            ) : (
              <>
                Save <ArrowDownToLineIcon size={16} />
              </>
            )}
          </Button>
        </>
      ) : (
        <Button
          onClick={() => {
            setShowEditor(true);
          }}
          variant="outline"
          className="mb-5 flex w-full items-center gap-2"
        >
          Add Your ID Number to avail 20% Discount <PenBoxIcon size={16} />{" "}
        </Button>
      )}
    </div>
  );
}
