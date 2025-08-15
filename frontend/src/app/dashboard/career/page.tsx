'use server';

import { fetchEmailAndProfile } from '../../../lib/api/dashboard/profile';
import ProfileCompletionWarning from '../register/ProfileCompletionWarning';
import React from 'react';
import CareerForm from './CareerForm';
import {
  getMyApplications,
  getPositions,
} from '../../../lib/api/dashboard/career';

export default async function CareerPanel() {
  const [
    {
      profile: { firstName, lastName, phoneNumber },
    },
    positions,
    applications,
  ] = await Promise.all([
    fetchEmailAndProfile(),
    getPositions(),
    getMyApplications(),
  ]);
  const isProfileComplete = Boolean(firstName && lastName && phoneNumber);
  return (
    <div className="space-y-7 p-6">
      {!isProfileComplete && <ProfileCompletionWarning />}
      <CareerForm
        API_ORIGIN={process.env.API_ORIGIN}
        isAuthenticated={true}
        brands={positions}
        applications={applications}
      />
    </div>
  );
}
