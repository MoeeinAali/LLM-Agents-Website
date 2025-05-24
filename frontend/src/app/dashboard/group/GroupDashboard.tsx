'use client';

import { useState } from 'react';
import { Group } from '../../../lib/types';
import { callCreateGroup, callLeaveGroup, callJoinGroup } from '../../../lib/api/dashboard/group';

export default function GroupDashboard({ group }: { group: Group }) {
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(group.secretKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  if (group.name) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-2 rounded-lg border border-slate-200 p-6 shadow-sm">
        <div className={'flex items-center justify-start gap-x-2'}>
          <h2 className="mb-2 inline text-3xl font-bold text-slate-800">
            Group Name:
          </h2>
          <p className="inline text-2xl font-medium text-slate-600">
            {group.name}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-base font-mono text-slate-700">
            Secret Key: {group.secretKey}
          </span>
          <button
            onClick={handleCopy}
            className="rounded-md bg-primary px-3 py-1 text-sm font-semibold text-white hover:bg-primary/80"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>


        <div>
          <h3 className="mb-2 mt-2 text-lg font-semibold text-slate-700">
            Members:
          </h3>
          <ul className={'border pl-6'}>
            {group.members.map((member) => (
              <li key={member.email} className="text-md py-1 text-slate-700">
                {member.fullName} – {member.email}
              </li>
            ))}
          </ul>
        </div>
        <form
          action={callLeaveGroup}
          className="mt-4 flex w-full justify-start"
        >
          <button
            type="submit"
            className="rounded-md bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800"
          >
            Leave Group
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {/* پیام‌های وضعیت */}
      {!error && successful && (
        <p className="w-full rounded-md bg-green-50 p-3 font-medium text-green-600">
          Successful!
        </p>
      )}
      {error && (
        <p className="w-full rounded-md bg-rose-200 p-3 font-medium text-rose-900">
          {error}
        </p>
      )}

      {/* فرم ساخت گروه */}
      <form
        action={async (data) => {
          setError('');
          setSuccessful(false);
          const response = await callCreateGroup(data);
          if (response.error) {
            setError(response.error);
          } else {
            setSuccessful(true);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="mx-auto mt-10 flex max-w-xl flex-col items-start gap-5 self-stretch"
      >
        <label className="text-4xl font-bold text-[#1F2B3D]">
          Create Group
        </label>

        <div className="flex w-full items-start gap-6 self-stretch max-md:flex-col">
          <div className="flex w-full flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase text-[#8A8998]">
              Group Name
              <span className="ml-1 text-xl font-bold text-secondary">*</span>
            </label>
            <input
              className="self-stretch rounded-lg border border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold text-[#1F2B3D]"
              type="text"
              name="name"
              minLength={3}
              required
              placeholder="مثلاً: تیم طراحی محصول"
            />
          </div>
        </div>

        <div className="flex w-full">
          <button className="mt-4 w-full rounded-lg bg-secondary px-8 py-4 text-xl font-bold text-white">
            Create Group
          </button>
        </div>
      </form>

      {/* فرم پیوستن به گروه */}
      <form
        action={async (data) => {
          setError('');
          setSuccessful(false);
          const response = await callJoinGroup(data);
          if (response.error) {
            setSuccessful(false);
            setError(response.error);
          } else {
            setSuccessful(true);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="mx-auto mt-16 flex max-w-xl flex-col items-start gap-5 self-stretch"
      >
        <label className="text-4xl font-bold text-[#1F2B3D]">Join Group</label>

        <div className="flex w-full items-start gap-6 self-stretch max-md:flex-col">
          <div className="flex w-full flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase text-[#8A8998]">
              Secret Key
              <span className="ml-1 text-xl font-bold text-secondary">*</span>
            </label>
            <input
              className="self-stretch rounded-lg border border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold text-[#1F2B3D]"
              type="text"
              name="secret_key"
              minLength={6}
              required
              placeholder="مثلاً: 7df2-xxxx"
            />
          </div>
        </div>

        <div className="flex w-full">
          <button className="mt-4 w-full rounded-lg bg-primary px-8 py-4 text-xl font-bold text-white">
            Join Group
          </button>
        </div>
      </form>
    </>
  );
}
