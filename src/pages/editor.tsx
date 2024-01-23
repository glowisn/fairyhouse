import EditorJS from "@editorjs/editorjs";

export default function Editor() {
  const editor = new EditorJS({
    holder: "editorjs",
  });
  return (
    <>
      <h1>Editor</h1>
      <div id="editorjs"></div>
    </>
  );
}
