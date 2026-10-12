import React from 'react';
import { ActionMenu } from './ActionMenu';

export const RowActions = ({ onView, onToggle, toggleOn = false, toggleTitle, onDelete }) => {
  const menuItems = [];
  if (onView) menuItems.push({ id: 'view', label: 'View Details' });
  if (onToggle)
    menuItems.push({
      id: 'toggle',
      label: toggleTitle || (toggleOn ? 'Inactive' : 'Active'),
    });
  if (onDelete) menuItems.push({ id: 'delete', label: 'Delete', danger: true });

  return (
    <div className="flex items-center justify-end gap-1.5">
      {menuItems.length > 0 && (
        <ActionMenu
          items={menuItems}
          onSelect={(id) => {
            if (id === 'view') onView?.();
            else if (id === 'toggle') onToggle?.();
            else if (id === 'delete') onDelete?.();
          }}
        />
      )}
    </div>
  );
};
