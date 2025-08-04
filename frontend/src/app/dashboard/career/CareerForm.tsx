import React from 'react';
import { Position, Application, Brand } from '../../../lib/types';
import PositionCard from '../../../ui/components/career/PositionCard';
import { shuffle } from '../../../lib/collections';

interface CareerFormProps {
  brands: Brand[];
  applications: Application[];
}

export default function CareerForm({ brands, applications }: CareerFormProps) {
  const appliedPositionIds = new Set(
    applications.map((app) => app.position.id),
  );
  const showButton = !!applications;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {shuffle(brands).flatMap((brand) =>
        brand.positions.map((position) => (
          <PositionCard
            showButton={showButton}
            key={position.id}
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
