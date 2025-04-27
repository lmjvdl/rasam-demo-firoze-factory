import toast from "react-hot-toast";

export const validateDateRange = (startTime: number, endTime: number): boolean => {
  if (startTime === undefined || endTime === undefined) {
    toast.error('لطفاً هر دو تاریخ شروع و پایان را وارد کنید');
    return false;
  }

  if (typeof startTime !== 'number' || typeof endTime !== 'number') {
    toast.error('مقادیر تاریخ باید از نوع عددی باشند');
    return false;
  }

  if (isNaN(startTime) || isNaN(endTime)) {
    toast.error('مقادیر تاریخ نامعتبر هستند');
    return false;
  }

  if (startTime < 0 || endTime < 0) {
    toast.error('تاریخ‌ها نمی‌توانند منفی باشند');
    return false;
  }

  if (startTime > endTime) {
    toast.error('تاریخ شروع نمی‌تواند بعد از تاریخ پایان باشد');
    return false;
  }

  const currentUnixTime = Math.floor(Date.now() / 1000);
  if (startTime > currentUnixTime || endTime > currentUnixTime) {
    toast.error('تاریخ‌ها نمی‌توانند از زمان فعلی بیشتر باشند');
    return false;
  }

  return true;
};
