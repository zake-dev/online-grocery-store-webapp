import * as React from 'react';

import { useSearchParams } from 'react-router-dom';

import DualRangeSlider from '@/components/DualRangeSlider';
import SizedBox from '@/components/SizedBox';

const PRICE_MIN_RANGE = 0;
const PRICE_MAX_RANGE = 50;

export default function PriceRangeFilterBar() {
  const [priceLow, setPriceLow] = React.useState(PRICE_MIN_RANGE);
  const [priceHigh, setPriceHigh] = React.useState(PRICE_MAX_RANGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetCount, setResetCount] = React.useState(1);

  const onChange = (range: { min: number; max: number }) => {
    setPriceLow(range.min);
    setPriceHigh(range.max);
  };

  const onFilter = () => {
    searchParams.set('priceLow', priceLow.toString());
    searchParams.set('priceHigh', priceHigh.toString());
    setSearchParams(searchParams);
  };

  React.useEffect(() => {
    if (!searchParams.has('priceLow') && !searchParams.has('priceHigh'))
      setResetCount((state) => state + 1);
  }, [searchParams]);

  return (
    <div className="flex flex-row gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-caption text-black-600">Price Range</span>
        <DualRangeSlider
          key={resetCount}
          min={PRICE_MIN_RANGE}
          max={PRICE_MAX_RANGE}
          onChange={onChange}
        />
        <SizedBox height={24} />
      </div>
      <button className="btn btn-small btn-primary" onClick={onFilter}>
        Filter
      </button>
    </div>
  );
}
