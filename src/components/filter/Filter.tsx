import { forwardRef, useImperativeHandle, useState } from 'react';
import FilterPanel, { type ActiveFilters } from './FilterPanel';
import Drawer from '../drawer/Drawer';

export type FilterHandle = {
  open: () => void;
  close: () => void;
};

interface FilterProps {
  activeFilters: ActiveFilters;
  onUpdateFilters: (updates: Partial<ActiveFilters>) => void;
  onClearFilters: () => void;
}

const Filter = forwardRef<FilterHandle, FilterProps>(
  ({ activeFilters, onUpdateFilters, onClearFilters }, ref) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const open = () => setDrawerOpen(true);
    const close = () => setDrawerOpen(false);

    useImperativeHandle(ref, () => ({ open, close }));

    return (
      <>
        {/* Desktop View */}
        <aside>
          <FilterPanel
            namePrefix="desktop"
            activeFilters={activeFilters}
            onUpdateFilters={onUpdateFilters}
            onClearFilters={onClearFilters}
            withLabel={true}
          />
        </aside>

        {/* Mobile/Tablet Drawer View */}
        <Drawer
          isOpen={drawerOpen}
          title="Filters"
          onClose={close}
          side="left"
          width="min(85vw, 360px)"
        >
          <FilterPanel
            namePrefix="drawer"
            activeFilters={activeFilters}
            onUpdateFilters={onUpdateFilters}
            onClearFilters={onClearFilters}
            withLabel={false}
          />
        </Drawer>
      </>
    );
  }
);

Filter.displayName = 'Filter';
export default Filter;