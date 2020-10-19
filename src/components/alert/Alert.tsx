import React from 'react';
import { Alert as RNAlert, AlertButton } from 'react-native';

interface AlertProps {
  visible?: boolean;
  title: string;
  message?: string;
  confirmText: string;
  cancelText?: string;
  onConfirm?(): void;
  onCancel?(): void;
}

const Alert: React.FC<AlertProps> = ({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  if (!visible) {
    return null;
  }

  const buttons: AlertButton[] = [{ text: confirmText, onPress: onConfirm }];

  if (cancelText) {
    buttons.push({ text: cancelText, onPress: onCancel });
  }

  RNAlert.alert(title, message, buttons.reverse(), {
    cancelable: false,
  });
  return null;
};

export default Alert;
