'use server';

import { getPositions } from '../../lib/api/dashboard/career';
import CareerForm from '@/app/dashboard/career/CareerForm';

export default async function CareerPage() {
  const positions = await getPositions();
  return (
    <div className="space-y-7 p-6">
      <CareerForm applications={undefined} brands={positions} />
    </div>
  );
}
