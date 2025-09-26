'use client';

import { ReactNode } from 'react';
import { toast as sonnerToast } from 'sonner';
import { CheckCircle, WarningIcon } from '@phosphor-icons/react/dist/ssr';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ToastProps {
  id: string | number;
  title: ReactNode;
  description: ReactNode;
}

export function toastAlert(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom(
    (id) => <AlertToast id={id} title={toast.title} description={toast.description} />,
    { duration: 10_000 }
  );
}

export function toastSuccess(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom(
    (id) => <SuccessToast id={id} title={toast.title} description={toast.description} />,
    { duration: 5000 }
  );
}

function AlertToast(props: ToastProps) {
  const { title, description, id } = props;

  return (
    <Alert onClick={() => sonnerToast.dismiss(id)} className="bg-accent">
      <WarningIcon weight="bold" />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}

function SuccessToast(props: ToastProps) {
  const { title, description, id } = props;

  return (
    <Alert
      onClick={() => sonnerToast.dismiss(id)}
      className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
    >
      <CheckCircle weight="bold" className="text-green-600 dark:text-green-400" />
      <AlertTitle className="text-green-800 dark:text-green-200">{title}</AlertTitle>
      {description && (
        <AlertDescription className="text-green-700 dark:text-green-300">
          {description}
        </AlertDescription>
      )}
    </Alert>
  );
}
