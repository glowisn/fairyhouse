import { ReactQuill } from "../pages/NewPost";

interface QuillEditorProps {
  value: string;
  setValue: (value: string) => void;
}
export function QuillEditor({ value, setValue }: QuillEditorProps) {
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
