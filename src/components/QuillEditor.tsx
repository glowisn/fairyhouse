import dynamic from "next/dynamic";

export const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
  value: string;
  setValue: (value: string) => void;
}
export function QuillEditor({ value, setValue }: QuillEditorProps) {
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
