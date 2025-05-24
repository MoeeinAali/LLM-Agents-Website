'use server';

import GroupDashboard from './GroupDashboard';
import { fetchGroup } from '../../../lib/api/dashboard/group';

export default async function Group() {
  const group = await fetchGroup();

  return <GroupDashboard group={group} />;
}
