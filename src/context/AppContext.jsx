import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'export-report', 'export-users', 'sync-catalogue', 'provider-settings', 'view-sync-logs', 'create-challenge', 'create-notification'
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        globalSearch,
        setGlobalSearch,
        activeModal,
        setActiveModal,
        selectedUser,
        setSelectedUser,
        notificationsOpen,
        setNotificationsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
