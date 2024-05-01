import { useEditor, EditorContent } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Bold from "@tiptap/extension-bold";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import ListItem from "@tiptap/extension-list-item";
import History from "@tiptap/extension-history";
import Toolbar from "./Toolbar";
import "./styles.less";
import CustomHeading from "./CustomHeading";

interface RichTextAreaProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

// TODO: Mobile context menu can cover the toolbar. Maybe the toolbar should be below the text are on mobile.
// TODO: Tooltips.
const RichTextArea = ({ value, onChange }: RichTextAreaProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph.configure({
        HTMLAttributes: {
          // oncontextmenu: "event.preventDefault()",
          // oncontextmenu: "console.log(event)",
        },
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      Highlight.configure({ multicolor: true }),
      CustomHeading,
      BulletList.configure({ keepAttributes: true, keepMarks: true }),
      OrderedList.configure({ keepAttributes: true, keepMarks: true }),
      ListItem,
      TaskList,
      TaskItem.configure({ nested: true }),
      History,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getText());
    },
    editorProps: {
      attributes: {
        class: "rich-text-area-editor block floating",
      },
    },
  });

  return (
    <div className="rich-text-area">
      <EditorContent editor={editor} />
      <Toolbar editor={editor} />
    </div>
  );
};

export default RichTextArea;
