import { DayOfWeek } from '@/types';
import { Professional } from '@/types/auth';
import { formatInTimeZone } from 'date-fns-tz'; // For timezone handling

/**
 * Checks if a professional is currently within their working hours.
 */
export const isCurrentlyOpen = (professional: Professional): boolean => {
  const { working_hours } = professional;
  const timezone = (professional as any).timezone || 'Africa/Nairobi';
  
  // 1. Get current time in the Professional's timezone
  const now = new Date();
  const dayName = formatInTimeZone(now, timezone, 'eeee').toLowerCase() as DayOfWeek;
  const currentTime = formatInTimeZone(now, timezone, 'HH:mm');

  // 2. Get the schedule for today
  const todaySchedule = working_hours[dayName];

  // 3. If no schedule (null), they are closed
  if (!todaySchedule) return false;

  // 4. Check if current time is between open and close
  const { open, close } = todaySchedule;
  return currentTime >= open && currentTime <= close;
};