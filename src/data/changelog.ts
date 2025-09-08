export type ChangelogEntry = {
  version: string;
  date: string;
  title?: string;
  changes: {
    type: 'added' | 'changed' | 'fixed' | 'removed' | 'improved';
    description: string;
  }[];
};

export const changelogEntries: ChangelogEntry[] = [
  {
    version: '1.5.0',
    date: '2025-05-15',
    title: 'Core Functionality Improvements',
    changes: [
      {
        type: 'added',
        description: 'Added user dashboard providing more intuitive data overview',
      },
      {
        type: 'improved',
        description: 'Optimized search algorithm for better relevance and accuracy',
      },
      {
        type: 'fixed',
        description: 'Fixed display issues on mobile devices',
      },
    ],
  },
  {
    version: '1.4.2',
    date: '2025-04-30',
    changes: [
      {
        type: 'fixed',
        description: 'Fixed validation errors in user registration flow',
      },
      {
        type: 'improved',
        description: 'Improved page loading speed and performance',
      },
    ],
  },
  {
    version: '1.4.0',
    date: '2025-04-15',
    title: 'New Feature Release',
    changes: [
      {
        type: 'added',
        description: 'Integrated AI assistant to help users with common questions',
      },
      {
        type: 'added',
        description: 'Added data export functionality supporting multiple formats',
      },
      {
        type: 'changed',
        description: 'Redesigned user interface for better user experience',
      },
      {
        type: 'removed',
        description: 'Removed legacy notification system',
      },
    ],
  },
  {
    version: '1.3.5',
    date: '2025-04-01',
    changes: [
      {
        type: 'fixed',
        description: 'Fixed data synchronization issues',
      },
      {
        type: 'improved',
        description: 'Optimized responsive design for mobile devices',
      },
    ],
  },
  {
    version: '1.3.0',
    date: '2025-03-20',
    title: 'Performance Optimization',
    changes: [
      {
        type: 'improved',
        description: 'Improved application startup speed',
      },
      {
        type: 'fixed',
        description: 'Fixed multiple UI crash issues reported by users',
      },
      {
        type: 'added',
        description: 'Added dark mode support',
      },
    ],
  },
];
