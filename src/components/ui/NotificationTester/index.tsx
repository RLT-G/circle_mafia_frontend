import React, { useEffect } from 'react';
import { useNotification } from '../../../context/useNotification';

const messages = [
  'Операция прошла успешно!',
  'Произошла ошибка. Попробуйте снова.',
  'Информация: действие выполнено.',
  'Уведомление: всё работает!',
  'Внимание: проверьте данные.'
];

const types = ['success', 'error', 'info'] as const;

const getRandom = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

const NotificationTester: React.FC = () => {
  const showNotification = useNotification();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'g') {
        const type = getRandom(types);
        const message = getRandom(messages);
        showNotification(message, type);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showNotification]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-gray-200 rounded-xl shadow-lg p-4 flex items-center gap-2 font-montserrat text-sm text-gray-100 max-w-xs w-fit border border-gray-400">
      <svg className="w-5 h-5 text-[#4DD94D]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" /></svg>
      <span>Нажмите</span>
      <span className="px-2 py-1 rounded bg-black text-[#4DD94D] font-bold font-mono border border-[#4DD94D]">G</span>
      <span>для показа уведомления</span>
    </div>
  );
};

export default NotificationTester;
