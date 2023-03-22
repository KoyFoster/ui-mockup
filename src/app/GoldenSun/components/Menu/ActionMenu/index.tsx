import { useEffect, useRef, useState } from 'react';
import PageNav from 'src/app/GoldenSun/components/PageNav';
import './index.scss';

const ActionMenu = ({
  children,
}: {
  children?:
    | React.ReactElement<HTMLLIElement>[]
    | React.ReactElement<HTMLLIElement>;
}) => {
  const ref = useRef(null as null | HTMLDivElement);
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState('p1');

  useEffect(() => {
    if (ref.current && mounted) {
      if (!ref.current.className.includes(' grow'))
        ref.current.className += ' grow';
    } else {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <div ref={ref} className="menu-frame menu-options">
      <PageNav
        page={page}
        pages={['p1', 'p2', 'p3', 'p4']}
        onChange={(p) => {
          if (p) setPage(p);
        }}
      />
      <ul className={`action-menu ${page}`}>{children}</ul>
    </div>
  );
};

export default ActionMenu;
