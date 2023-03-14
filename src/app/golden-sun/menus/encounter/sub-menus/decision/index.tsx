import React, { useState } from 'react';
import ActionButton from 'src/app/golden-sun/action-button';

// Use menu context for menu state management
// Use sprite context
const Decision = () => {
  const [toolTip, setToolTip] = useState('');

  return (
    <>
      <ActionButton
        key="fight"
        id="fight"
        src={'{sprite}'}
        alt="fight"
        tooltip='Fight'
        onToolTip={setToolTip}
        onClick={() => {
            /* Enter Menu */
        }}
      />
      
      <ActionButton
        key="run"
        id="run"
        src={'{sprite}'}
        alt="run"
        tooltip='Run'
        onToolTip={setToolTip}
        onClick={() => {
            /* Enter Menu */
        }}
      />
      
      <ActionButton
        key="status"
        id="status"
        src={'{sprite}'}
        alt="status"
        tooltip='Status'
        onToolTip={setToolTip}
        onClick={() => {
            /* Enter Menu */
        }}
      />
      <div className="menu-frame" id={toolTip} />
    </>
  );
};

export default Decision;
