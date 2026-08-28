import { HealthRecord } from '../../../core/api/mockData';

export type TimelineItem = 
  | { type: 'header'; title: string }
  | { type: 'record'; record: HealthRecord };

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const groupRecordsForTimeline = (records: HealthRecord[], searchQuery: string): TimelineItem[] => {
  let filtered = records;
  
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = records.filter(r => 
      r.type.toLowerCase().includes(query) || 
      r.description.toLowerCase().includes(query)
    );
  }

  // Sort by date descending alphanumerically (ISO 8601 strings sort correctly this way)
  const sorted = [...filtered].sort((a, b) => (a.date > b.date ? -1 : 1));

  const result: TimelineItem[] = [];
  let currentGroup = '';

  for (let i = 0; i < sorted.length; i++) {
    const record = sorted[i];
    
    // ISO string format: YYYY-MM-DDTHH:mm:ss.sssZ
    // Extract year and month string efficiently without new Date()
    const year = record.date.substring(0, 4);
    const monthIndex = parseInt(record.date.substring(5, 7), 10) - 1;
    const groupName = `${MONTH_NAMES[monthIndex]} ${year}`;

    if (groupName !== currentGroup) {
      result.push({ type: 'header', title: groupName });
      currentGroup = groupName;
    }
    
    result.push({ type: 'record', record });
  }

  return result;
};
