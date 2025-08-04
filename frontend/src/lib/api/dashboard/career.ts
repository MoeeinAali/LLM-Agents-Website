import { getAccessToken } from '../session';

export async function getPositions() {
  const res = await fetch(`${process.env.API_ORIGIN}/api/career/positions`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch positions');
  return res.json();
}

export async function getMyApplications() {
  const accessToken = await getAccessToken();
  const res = await fetch(
    `${process.env.API_ORIGIN}/api/career/applications/my`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new Error('Failed to fetch applications');
  const body = res.json();
  return body;
}
