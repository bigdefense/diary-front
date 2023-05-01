import React from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import PropTypes from 'prop-types';
import EditorMenuBar from './EditorMenuBar';

const TiptapPresenter = ({ editor }) => (
  <div className="min-w-screen min-h-fit bg-gray-200 flex items-center justify-center p-5">
    <div className="w-full max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 text-black">
      <div className="border border-gray-200 overflow-hidden rounded-md">
        <div className="prose w-full flex border-b border-gray-200 text-xl text-gray-600">
          <EditorMenuBar editor={editor} />
        </div>
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[50px] before:mx-5 before:bg-gray-300 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[76px] before:mx-5 before:bg-gray-300 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[104px] before:mx-5 before:bg-red-200 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[130px] before:mx-5 before:bg-gray-300 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[159px] before:mx-5 before:bg-gray-300 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[186px] before:mx-5 before:bg-red-200 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[212px] before:mx-5 before:bg-gray-300 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[242px] before:mx-5 before:bg-gray-300 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[268px] before:mx-5 before:bg-red-200 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[298px] before:mx-5 before:bg-gray-300 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[328px] before:mx-5 before:bg-gray-300 before:top-0 before:absolute" />
        <div className="relative before:content-[''] before:w-full before:h-[1px] before:mt-[358px] before:mx-5 before:bg-red-200 before:top-0 before:absolute" />
        <div className="relative w-full h-96 overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  </div>
);

TiptapPresenter.propTypes = {
  editor: PropTypes.instanceOf(Editor),
};
TiptapPresenter.defaultProps = {
  editor: {},
};
export default TiptapPresenter;
