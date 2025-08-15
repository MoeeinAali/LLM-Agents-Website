import React from 'react';
import { Application, Brand } from '../../../lib/types';
import PositionCard from '../../../ui/components/career/PositionCard';
import { shuffle } from '../../../lib/collections';
import { getAccessToken } from '../../../lib/api/session';

interface CareerFormProps {
  brands: Brand[];
  applications: Application[];
  isAuthenticated: boolean;
  API_ORIGIN?: string;
}

export default async function CareerForm({
  brands,
  applications,
  isAuthenticated,
  API_ORIGIN = 'https://api.llm-agents.ir',
}: CareerFormProps) {
  const accessToken = await getAccessToken();
  const appliedPositionIds = new Set(
    applications.map((app) => app.position.id),
  );
  const showButton = isAuthenticated;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {shuffle(brands).flatMap((brand) =>
        brand.positions.map((position) => (
          <PositionCard
            accessToken={accessToken}
            showButton={showButton}
            key={position.id}
            API_ORIGIN={API_ORIGIN}
            position={{
              ...position,
              brand: {
                name: brand.name,
                logo: brand.logo,
              },
            }}
            isApplied={appliedPositionIds.has(position.id)}
          />
        )),
      )}
    </div>
  );
}
