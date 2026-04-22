import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';

// Notification Bell Component
export const NotificationBell = () => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getNotifications(user.id);
      setNotifications(data.notifications || []);
      setUnreadCount((data.notifications || []).filter(n => !n.read).length);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await apiService.markNotificationAsRead(user.id, notificationId);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiService.markAllNotificationsAsRead(user.id);
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      booking: '📋',
      payment: '💳',
      reminder: '🔔',
      promotion: '🎁',
      review: '⭐',
      system: '⚙️'
    };
    return icons[type] || '📢';
  };

  const getNotificationColor = (type) => {
    const colors = {
      booking: 'bg-blue-100',
      payment: 'bg-green-100',
      reminder: 'bg-amber-100',
      promotion: 'bg-purple-100',
      review: 'bg-rose-100',
      system: 'bg-gray-100'
    };
    return colors[type] || 'bg-gray-100';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-4 border-amber-500 border-t-transparent"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔔</div>
                <p className="text-gray-600">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-amber-50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center text-xl`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 text-center text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Notification Item Component
export const NotificationItem = ({ notification, onMarkAsRead, onDismiss }) => {
  const getNotificationIcon = (type) => {
    const icons = {
      booking: '📋',
      payment: '💳',
      reminder: '🔔',
      promotion: '🎁',
      review: '⭐',
      system: '⚙️'
    };
    return icons[type] || '📢';
  };

  const getNotificationColor = (type) => {
    const colors = {
      booking: 'bg-blue-100',
      payment: 'bg-green-100',
      reminder: 'bg-amber-100',
      promotion: 'bg-purple-100',
      review: 'bg-rose-100',
      system: 'bg-gray-100'
    };
    return colors[type] || 'bg-gray-100';
  };

  return (
    <div className={`p-4 bg-white rounded-xl shadow-sm border border-gray-100 ${!notification.read ? 'border-l-4 border-l-amber-500' : ''}`}>
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center text-2xl flex-shrink-0`}>
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-gray-900">{notification.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => onDismiss && onDismiss(notification.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">
              {new Date(notification.createdAt).toLocaleString()}
            </span>
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Notification Settings Component
export const NotificationSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    bookingUpdates: true,
    paymentAlerts: true,
    promotionalOffers: false,
    reviewReminders: true,
    travelReminders: true
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiService.updateNotificationSettings(user.id, settings);
      alert('Notification settings updated successfully!');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Failed to update notification settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Email Notifications</p>
            <p className="text-sm text-gray-600">Receive notifications via email</p>
          </div>
          <button
            onClick={() => handleToggle('emailNotifications')}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.emailNotifications ? 'bg-amber-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Push Notifications</p>
            <p className="text-sm text-gray-600">Receive push notifications in browser</p>
          </div>
          <button
            onClick={() => handleToggle('pushNotifications')}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.pushNotifications ? 'bg-amber-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <hr className="border-gray-200" />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Booking Updates</p>
            <p className="text-sm text-gray-600">Updates about your bookings</p>
          </div>
          <button
            onClick={() => handleToggle('bookingUpdates')}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.bookingUpdates ? 'bg-amber-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              settings.bookingUpdates ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Payment Alerts</p>
            <p className="text-sm text-gray-600">Payment confirmations and reminders</p>
          </div>
          <button
            onClick={() => handleToggle('paymentAlerts')}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.paymentAlerts ? 'bg-amber-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              settings.paymentAlerts ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Promotional Offers</p>
            <p className="text-sm text-gray-600">Special deals and discounts</p>
          </div>
          <button
            onClick={() => handleToggle('promotionalOffers')}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.promotionalOffers ? 'bg-amber-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              settings.promotionalOffers ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Review Reminders</p>
            <p className="text-sm text-gray-600">Reminders to leave reviews after trips</p>
          </div>
          <button
            onClick={() => handleToggle('reviewReminders')}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.reviewReminders ? 'bg-amber-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              settings.reviewReminders ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Travel Reminders</p>
            <p className="text-sm text-gray-600">Reminders before your travel date</p>
          </div>
          <button
            onClick={() => handleToggle('travelReminders')}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.travelReminders ? 'bg-amber-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              settings.travelReminders ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full mt-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  );
};

export default NotificationBell;
