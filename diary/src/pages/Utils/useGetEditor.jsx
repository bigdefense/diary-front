import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

const useGetEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    editorProps: {
      attributes: {
        class:
              'prose sm:prose lg:prose-lg xl:prose-2xl text-lg m-5 focus:outline-none',
        spellcheck: 'false',
      },
    },
    content: '',
    injectCSS: false,
    parseOptions: {
      preserveWhitespace: true,
    },
    enablePasteRules: [Color, 'horizontalRule'],
  });
  return editor;
};

export default useGetEditor;
