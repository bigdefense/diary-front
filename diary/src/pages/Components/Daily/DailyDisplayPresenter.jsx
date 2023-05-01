import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { TITLE } from '../../../Constants/dailyConstant';
import TiptapContainer from '../Tiptap/TiptapContainer';

function DailyDisplayPresenter({ Daily, content, handleInput }) {
  const roundLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className="mx-10 my-5 p-2 border-4 border-gray-100 shadow-sm">
      <div className="flex m-5">
        {roundLine.map(() => (
          <div
            key={v4()}
            className="w-20 h-20 border-t-2 border-gray-500 rounded-full"
          />
        ))}
      </div>
      <div className="flex text-center text-xl font-bold border">
        <div className="basis-1/2">{Daily ? Daily.locdate : null}</div>
        <div className="basis-1/2 text-white bg-slate-400">
          {Daily ? Daily.day : null}
        </div>
      </div>
      <div className="m-5 my-20">
        <div className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">
          {TITLE}
        </div>
        <textarea
          rows={1}
          spellCheck="false"
          value={content}
          onChange={handleInput}
          className="block min-h-[52px] max-h-[52px] p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-700"
        />
      </div>
      <div className="border-2 border-gray-200 overflow-hidden">
        <TiptapContainer />
      </div>
    </div>
  );
}
DailyDisplayPresenter.propTypes = {
  Daily: PropTypes.shape({
    day: PropTypes.string,
    editorContent: PropTypes.string,
    locdate: PropTypes.string,
    titleText: PropTypes.string,
  }),
  content: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
};
DailyDisplayPresenter.defaultProps = {
  Daily: PropTypes.shape({
    day: '',
    editorContent: '',
    locdate: '',
    titleText: '',
  }),
};
export default DailyDisplayPresenter;
