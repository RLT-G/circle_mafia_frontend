import React from 'react';
import { useNotificationContext } from '../../../context/NotificationContext';

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'success':
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      );
    case 'error':
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      );
    case 'info':
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" /></svg>
      );
    default:
      return null;
  }
};

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors duration-200 focus:outline-none"
    aria-label="Close notification"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
  </button>
);

const getNotificationClass = (type: string) => {
  const base = [
    'flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg border font-montserrat text-base',
    'min-w-[220px] max-w-[320px] w-full',
    'transition-all duration-300 ease-in-out animate-fade-in',
    'relative',
  ];
  if (type === 'success') {
    return [
      ...base,
      'bg-[#0A0A0A] border-[#4DD94D] text-[#4DD94D]'
    ].join(' ');
  }
  if (type === 'error') {
    return [
      ...base,
      'bg-[#2A0A0A] border-[#D94D4D] text-[#D94D4D]'
    ].join(' ');
  }
  // info
  return [
    ...base,
    'bg-[#0A1A2A] border-[#4D7DD9] text-[#4D7DD9]'
  ].join(' ');
};

export default function Notification() {
  const { notifications, closeNotification } = useNotificationContext();

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-4 items-end">
      {notifications.map((n) => (
        <div key={n.id} className={getNotificationClass(n.type)}>
          <NotificationIcon type={n.type} />
          <span className="flex-1 font-bold">{n.message}</span>
          <CloseButton onClick={() => closeNotification(n.id)} />
        </div>
      ))}
    </div>
  );
}

// ...анимация fade-in уже есть в index.css...
