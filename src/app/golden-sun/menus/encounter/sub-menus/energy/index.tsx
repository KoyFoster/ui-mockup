import { useEffect, useRef, useState } from 'react';
import './index.scss';

const Energy = () => {
  const ref = useRef(null as null | HTMLDivElement);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (ref.current && mounted) {
      ref.current.className += ' grow';
    } else {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <div className="battle-menu energy-menu">
      <div ref={ref} className="menu-frame menu-options-menu" />
    </div>
  );
};

export default Energy;
