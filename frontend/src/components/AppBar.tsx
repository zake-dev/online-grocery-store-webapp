import { ReactComponent as Logo } from '@assets/Logo.svg';
import { NavLink } from 'react-router-dom';

import PriceRangeFilterBar from './PriceRangeFilterBar';
import SearchBar from './SearchBar';

export default function AppBar() {
  return (
    <div className="app-bar bg-white px-16 py-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-row items-center">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <div className="flex-1 flex flex-row justify-end items-center gap-[16px]">
        <SearchBar />
        <PriceRangeFilterBar />
      </div>
    </div>
  );
}
