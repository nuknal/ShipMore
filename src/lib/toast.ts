'use client';

export type ToastProps = {
  title?: string;
  key?: string;
  message?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
};

// 公共的 showToast 函数
export function toast(props: ToastProps, t?: any) {
  let message = props.message;
  if (!message && props.key) {
    if (t) {
      message = t(props.key);
    } else {
      message = props.key;
    }
  }
  console.log('toast message', message);

  // 显示 toast
  // switch (props.variant) {
  //   case 'success':
  //     addToast({
  //       title: props.title,
  //       description: message,
  //       color: 'success',
  //     });
  //     break;
  //   case 'error':
  //     addToast({
  //       title: props.title,
  //       description: message,
  //       color: 'danger',
  //     });
  //     break;
  //   case 'info':
  //     addToast({
  //       title: props.title,
  //       description: message,
  //       color: 'default',
  //     });
  //     break;
  //   case 'warning':
  //     addToast({
  //       title: props.title,
  //       description: message,
  //       color: 'warning',
  //     });
  //     break;
  //   default:
  //     addToast({
  //       title: props.title,
  //       description: message,
  //       color: 'default',
  //     });
  // }
}
