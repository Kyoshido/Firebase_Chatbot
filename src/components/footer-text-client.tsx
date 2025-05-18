// src/components/footer-text-client.tsx
'use client';

import { useEffect, useState } from 'react';

interface FooterTextClientProps {
  template: string;
  placeholderYear?: string;
}

export default function FooterTextClient({ template, placeholderYear = "..." }: FooterTextClientProps) {
  const [year, setYear] = useState<string | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  if (year === null) {
    return <>{template.replace('{year}', placeholderYear)}</>;
  }

  return <>{template.replace('{year}', year)}</>;
}
