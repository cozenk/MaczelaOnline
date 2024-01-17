import { useEffect, useRef, useState } from "react";

export function useEditable({ onSaveText = async () => {} }) {
  const editableElementRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);

  useEffect(() => {
    if (editable && editableElementRef.current) {
      editableElementRef.current.focus();
    }
  }, [editable]);

  const saveNewText = async (e) => {
    setEditable(false);
    await onSaveText(e.target.textContent);
  };

  return {
    editable,
    setEditable,
    showEditOverlay,
    setShowEditOverlay,
    saveNewText,
    editableElementRef,
  };
}
