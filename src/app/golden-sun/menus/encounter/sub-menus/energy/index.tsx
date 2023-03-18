import { useEffect, useRef, useState } from 'react';
import Ragnarok from '../../../../assets/sprites/icons/psynergy/Ragnarok.gif';
import VenusStar from '../../../../assets/sprites/icons/misc/Venus_Star.gif';
import Range1 from '../../../../assets/sprites/icons/psynergy/range-1.gif';
import './index.scss';
import ActionMenuItem from 'src/app/golden-sun/action-menu-item';
import PageNav from 'src/app/golden-sun/page-nav';

const Energy = () => {
  const ref = useRef(null as null | HTMLDivElement);
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState('p1');

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
        <PageNav
          page={page}
          pages={['p1', 'p2', 'p3', 'p4']}
          onChange={(p) => {
            if (p) setPage(p);
          }}
        />
        <ul className={`action-menu ${page}`}>
          <ActionMenuItem
            id={'ragnorak'}
            label={'Ragnorak1'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'spire'}
            label={'Spire'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'earthquake'}
            label={'Earthquake'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'quake'}
            label={'Quake'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'heal'}
            label={'Heal'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'healing-light'}
            label={'Healing Light2'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'gaia'}
            label={'Gaia'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'ragnorak'}
            label={'Something or another'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'ragnorak'}
            label={'Ragnorak'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'spire'}
            label={'Spire'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'earthquake'}
            label={'Earthquake3'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'quake'}
            label={'Quake'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'heal'}
            label={'Heal'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'healing-light'}
            label={'Healing Light'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'gaia'}
            label={'Gaia'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'ragnorak'}
            label={'Something or another4'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'ragnorak'}
            label={'Ragnorak'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'spire'}
            label={'Spire'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'earthquake'}
            label={'Earthquake'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'quake'}
            label={'Quake'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'heal'}
            label={'Heal'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'healing-light'}
            label={'Healing Light'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'gaia'}
            label={'Gaia'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
          <ActionMenuItem
            id={'ragnorak'}
            label={'Something or another'}
            icon={Ragnarok}
            element={VenusStar}
            range={Range1}
          />
        </ul>
      </div>
    </div>
  );
};

export default Energy;
