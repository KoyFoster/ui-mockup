import React from 'react';
import './index.scss';

/** Simple page navigation component for returning a string representation page that was selected. */
const PageNav = ({
  page,
  pages,
  nowrapnav,
  onChange,
}: {
  page: string;
  pages: string[];
  nowrapnav?: boolean;
  onChange: (page?: string) => void;
}) => {
  return (
    <div className="simple-page-nav">
      <button
        disabled={nowrapnav && page === pages[0]}
        onClick={() => {
          const index = pages.findIndex((p) => p === page) - 1;
          if (index >= 0) onChange(pages[index]);
          else if(!nowrapnav) onChange(pages[pages.length - 1]); 
        }}
      >
        ◄
      </button>
      <div className="menu-bg-color">
        {pages.map((p, i) => (
          <button
            key={p}
            className={`${page === p ? '' : 'menu-color'}`}
            onClick={() => onChange(p)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        disabled={nowrapnav && page === pages[pages.length - 1]}
        onClick={() => {
          const index = pages.findIndex((p) => p === page) + 1;
          if (index < pages.length) onChange(pages[index]);
          else if(!nowrapnav) onChange(pages[0]);
        }}
      >
        ►
      </button>
    </div>
  );
};

export default PageNav;
