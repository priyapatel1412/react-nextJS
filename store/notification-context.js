import React, {createContext, useState, useEffect} from 'react';

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationContextProvider({children}) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'error' ||
        activeNotification.status === 'success')
    ) {
      // For Notification to disappear from botton automatically after 3 seconds
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        // Clear timer if useEffect reruns before timer finishes
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);
  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}
export default NotificationContext;
