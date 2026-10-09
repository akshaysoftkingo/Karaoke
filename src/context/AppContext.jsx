import React, { createContext, useContext, useState } from 'react';
import { initialAlertsList } from '../data/mockAlerts';
import { mockChallengesList } from '../data/mockChallenges';
import { mockNotificationsList } from '../data/mockNotifications';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationBeingEdited, setNotificationBeingEdited] = useState(null);
  const [challengeBeingEdited, setChallengeBeingEdited] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('vox_auth') === 'true';
  });

  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const isEmailCorrect = cleanEmail === 'admin123@gmail.com';
    const isPasswordCorrect = password === 'Admin@123';

    if (isEmailCorrect && isPasswordCorrect) {
      setIsAuthenticated(true);
      localStorage.setItem('vox_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('vox_auth', 'false');
  };

  // Challenges State
  const [challenges, setChallenges] = useState(mockChallengesList);
  const addChallenge = (newChallenge) => {
    setChallenges((prev) => [newChallenge, ...prev]);
    addAlert({
      id: `alt-${Date.now()}`,
      title: `${newChallenge.name} is now live`,
      description: 'New karaoke challenge has been published for singers.',
      timestamp: 'Just now',
      category: 'Challenges',
      icon: 'zap',
      color: 'purple',
      read: false,
    });
  };

  const updateChallenge = (id, updates) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, ...updates } : challenge
      )
    );
    setChallengeBeingEdited(null);
  };

  // Broadcast Notifications State
  const [notifications, setNotifications] = useState(mockNotificationsList);
  const addNotification = (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
    addAlert({
      id: `alt-${Date.now()}`,
      title: 'Scheduled notification sent',
      description: `Broadcast "${newNotification.title}" queued for ${newNotification.audience || 'All Users'}.`,
      timestamp: 'Just now',
      category: 'Broadcast',
      icon: 'send',
      color: 'emerald',
      read: false,
    });
  };

  const updateNotification = (id, updates) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, ...updates } : notification
      )
    );
    setNotificationBeingEdited(null);
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const duplicateNotification = (notification) => {
    addNotification({
      ...notification,
      id: `notification-${Date.now()}`,
      title: `${notification.title} (Copy)`,
      date: 'Just now',
      status: 'Draft',
    });
  };

  // Alerts State
  const [alerts, setAlerts] = useState(initialAlertsList);

  const addAlert = (newAlert) => {
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const markAllAlertsAsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const toggleAlertRead = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: !a.read } : a))
    );
  };

  const deleteAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  const confirmDelete = (message, onConfirm) => {
    setDeleteConfirmation({ message, onConfirm });
  };

  const cancelDelete = () => setDeleteConfirmation(null);

  const completeDelete = () => {
    if (deleteConfirmation?.onConfirm) {
      deleteConfirmation.onConfirm();
    }
    setDeleteConfirmation(null);
  };

  return (
    <AppContext.Provider
      value={{
        globalSearch,
        setGlobalSearch,
        activeModal,
        setActiveModal,
        selectedUser,
        setSelectedUser,
        notificationBeingEdited,
        setNotificationBeingEdited,
        challengeBeingEdited,
        setChallengeBeingEdited,
        notificationsOpen,
        setNotificationsOpen,
        // Auth
        isAuthenticated,
        login,
        logout,
        // Challenges
        challenges,
        setChallenges,
        addChallenge,
        updateChallenge,
        // Notifications
        notifications,
        setNotifications,
        addNotification,
        updateNotification,
        deleteNotification,
        duplicateNotification,
        // Alerts
        alerts,
        setAlerts,
        addAlert,
        markAllAlertsAsRead,
        toggleAlertRead,
        deleteAlert,
        unreadAlertsCount,
        confirmDelete,
        cancelDelete,
        completeDelete,
        deleteConfirmation,
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
