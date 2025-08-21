'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Position } from '../../../lib/types';

interface Props {
  position: Position;
  isApplied: boolean;
  showButton: boolean;
  API_ORIGIN?: string;
  accessToken?: string;
}

export default function PositionCard({
  position,
  isApplied,
  accessToken = '',
  showButton,
  API_ORIGIN,
}: Props) {
  const [applied, setApplied] = useState(isApplied);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    const res = await fetch(`${API_ORIGIN}/api/career/applications/apply/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ position: position.id }),
    });
    console.log(res);

    if (res.ok) {
      setApplied(true);
    } else {
      alert('Failed to apply.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-end gap-3 rounded-lg border bg-white p-4 shadow-md">
      <div className="flex w-full items-center justify-start gap-3">
        <img
          src={`/source/sponsors/${position.brand.name}.png`}
          alt="Brand logo"
          className="w-24 border-2 object-contain"
        />
        <div>
          <h3 className="text-lg font-semibold">{position.title}</h3>
          <p className="text-sm opacity-75">{position.brand.name}</p>
        </div>
      </div>

      <div className="mt-auto flex w-full items-center justify-between">
        <Link
          href={`/career/${position.id}`}
          className="text-sm text-primary hover:underline"
        >
          View Details
        </Link>

        {showButton && (
          <button
            onClick={handleApply}
            disabled={applied || loading}
            className={`rounded px-4 py-1 text-sm ${
              applied
                ? 'cursor-not-allowed bg-secondary text-white opacity-70'
                : 'bg-primary text-white hover:bg-secondary-200'
            }`}
          >
            {applied ? 'Applied' : loading ? 'Applying...' : 'Apply'}
          </button>
        )}
      </div>
    </div>
  );
}
