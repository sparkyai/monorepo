import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Document } from "@tiptap/extension-document";
import { Heading } from "@tiptap/extension-heading";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { Text } from "@tiptap/extension-text";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { generateHTML } from "@tiptap/html";

type RichTextProps = {
  children: object;
  className?: string;
};

export default function RichText(props: RichTextProps) {
  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{
        __html: generateHTML(props.children, [
          Document,
          Paragraph,
          Heading.configure({}),
          Link.configure({
            HTMLAttributes: {
              class: "text-blue-400",
            },
          }),
          Text,
          Color.configure({}),
          TextStyle,
          Highlight.configure({}),
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Bold.configure({
            HTMLAttributes: {
              class: "font-bold",
            },
          }),
          Italic.configure({
            HTMLAttributes: {
              class: "italic",
            },
          }),
          Table.configure({}),
          TableRow.configure({}),
          TableCell.configure({}),
          TableHeader.configure({}),
          ListItem,
          BulletList.configure({
            HTMLAttributes: {
              class: "list-disc pl-8",
            },
          }),
          OrderedList.configure({
            HTMLAttributes: {
              class: "list-decimal pl-8",
            },
          }),
        ]),
      }}
    />
  );
}
