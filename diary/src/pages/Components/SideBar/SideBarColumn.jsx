import React from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import StickerButtonContainer from '../StickerButton/StickerButtonContainer';

function SideBarColumn({ stickerCol }) {
  return (
    <tr>
      {stickerCol.map((sticker) => (
        <td className="p-2" key={v4()}>
          <StickerButtonContainer imgURL={sticker.imgURL} id={sticker.id} />
        </td>
      ))}
    </tr>
  );
}

SideBarColumn.propTypes = {
  stickerCol: PropTypes.array.isRequired,
};

export default SideBarColumn;
