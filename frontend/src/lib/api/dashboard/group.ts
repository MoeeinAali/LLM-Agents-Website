'use server';

import { fetchJsonWithAuth } from '../fetch';
import { unstable_noStore as noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';
import { Group } from '../../types';
import { revalidatePath } from 'next/cache';

export type CreateGroupFormInput = {
  name: string;
};

export type JoinGroupFormInput = {
  secret_key: string;
};

async function createGroup(input: CreateGroupFormInput) {
  const url = `${process.env.API_ORIGIN}/api/group/${process.env.WSS_ORDER}/create/`;
  return await fetchJsonWithAuth<any>(url, input, { method: 'POST' });
}

export async function callCreateGroup(
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const name = formData.get('name')?.toString().trim() || '';

  if (!name) {
    return { error: 'Write group name!' };
  }

  try {
    await createGroup({ name });
    revalidatePath('/dashboard/group');
    return { success: true };
  } catch (err) {
    return { error: err.error };
  }
}

export async function fetchGroup() {
  noStore();
  const url = `${process.env.API_ORIGIN}/api/group/my-group/`;
  try {
    const group = await fetchJsonWithAuth<Group>(url);
    return group;
  } catch (err) {
    return {} as Group;
  }
}

export async function callLeaveGroup(): Promise<{
  error?: string;
  success?: boolean;
}> {
  try {
    await leaveGroup();
    revalidatePath('/dashboard/group');
    return { success: true };
  } catch (err) {
    return { error: err.error };
  }
}

async function leaveGroup() {
  noStore();
  const url = `${process.env.API_ORIGIN}/api/group/leave/`;
  return await fetchJsonWithAuth<any>(url, {}, { method: 'POST' });
}

async function joinGroup(input: JoinGroupFormInput) {
  const url = `${process.env.API_ORIGIN}/api/group/${process.env.WSS_ORDER}/join/`;
  return await fetchJsonWithAuth<any>(url, input, { method: 'POST' });
}

export async function callJoinGroup(
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const secret_key = formData.get('secret_key')?.toString().trim() || '';

  if (!secret_key) {
    return { error: 'Write the secret key.' };
  }

  try {
    await joinGroup({ secret_key });
    revalidatePath('/dashboard/group');
    return { success: true };
  } catch (err: any) {
    console.log(err.message);
    return {
      error: err?.message || err?.response?.statusText || 'Joining Failed.',
    };
  }
}
