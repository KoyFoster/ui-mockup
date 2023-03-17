import { useEffect, useRef, useState } from 'react';
import Ragnarok from '../../../../assets/sprites/icons/psynergy/Ragnarok.gif';
import VenusStart from '../../../../assets/sprites/icons/misc/Venus_Star.gif';
import Range1 from '../../../../assets/sprites/icons/psynergy/range-1.gif';
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
      <div ref={ref} className="menu-frame menu-options-menu">
        <div className='page-nav'></div>
        <ul>
          <li><button><img src={Ragnarok} alt='Ragnorak'/>Ragnorak</button><div>EP</div> <div>7<img src={VenusStart} alt='Earth Energy' /></div><img src={Range1} alt='aoe-scale' /></li>
          <li><button><img src={Ragnarok} alt='Ragnorak'/>Earthquake</button><div>EP</div> <div>123<img src={VenusStart} alt='Earth Energy' /></div><img src={Range1} alt='aoe-scale' /></li>
          <li><button><img src={Ragnarok} alt='Ragnorak'/>Spire</button><div>EP</div> <div>17<img src={VenusStart} alt='Earth Energy' /></div><img src={Range1} alt='aoe-scale' /></li>
        </ul>
      </div>
    </div>
  );
};

export default Energy;
