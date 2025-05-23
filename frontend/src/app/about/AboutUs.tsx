import React from 'react';
import Footer from '../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../ui/components/Navbar';
import Timer from '../../ui/components/Timer';
import Programs from '../../ui/components/Programs';
import TeamSection from './TeamSection';
import { fetchStaffTeams } from '../../lib/api/about/staff';
import { isAuthenticated } from '../../lib/auth';

export default async function AboutUs() {
  const staffTeams = await fetchStaffTeams();
  const authenticated = await isAuthenticated();

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <div
        style={{ backgroundImage: 'url(/source/Rectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[400px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="flex max-w-[1199px] flex-col items-start justify-center gap-8 px-[72px] py-[60px]">
          <div className="ml-18 flex flex-row items-start justify-between self-stretch lg:max-w-[1055px]">
            <div className="flex-col gap-2">
              <p className="text-[20px] font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#8A8998]">
                Discover Our Story
              </p>
              <p className="text-[76px] font-bold not-italic leading-[76px] tracking-[-1.52px] text-[#1F2B3D]">
                About Us
              </p>
              <p className="flex items-center justify-center gap-[13px] pb-4 pt-10 text-lg leading-relaxed text-neutral-400">
                The LLM Agent Hackathon has been launched to bring together
                researchers, students, and professionals with a shared interest
                in the rapidly evolving world of intelligent systems. With a
                specific focus on Large Language Model (LLM) agents, this event
                marks the beginning of a new series aimed at fostering technical
                growth and innovation in this cutting-edge field.
              </p>
              <p className="flex items-center justify-center gap-[13px] py-4 text-lg leading-relaxed text-neutral-400">
                This inaugural event is inspired by the growing global attention
                toward LLM agents, as highlighted in Ilya Sutskever’s prediction
                that 2025 will be the year of agentic AI. In response, we have
                created a two-day experience combining expert presentations and
                a dynamic hackathon.
              </p>
              <p className="flex items-center justify-center gap-[13px] py-4 text-lg leading-relaxed text-neutral-400">
                On the first day, speakers from MIT, Sharif University of
                Technology, and industry leaders will share their latest
                research and insights into LLM-based systems. The second day is
                devoted to the hackathon, where participants will collaborate on
                creative problem-solving with guidance from a team of expert
                mentors.
              </p>
              <p className="flex items-center justify-center gap-[13px] py-4 text-lg leading-relaxed text-neutral-400">
                Organized by the Artificial Intelligence Chapter at Sharif University
                of Technology, the LLM Agent Hackathon provides a unique
                platform for learning, building, and connecting around one of
                the most promising frontiers in AI.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-12">
        <Programs showButton={false} />
      </div>

      <StaffArea />
      {staffTeams.reverse().map((staffTeam) => (
        <TeamSection
          sort={true}
          key={staffTeam.id}
          teamName={staffTeam.name}
          staff={staffTeam.members.map((members) => members.staff)}
        />
      ))}
      <Timer />
      <Footer />
    </>
  );
}

function StaffArea() {
  return (
    <div id="staff-area" className="mx-auto pb-14 pt-28 text-center">
      <div className="text-lg font-medium uppercase tracking-wide text-neutral-400">
        The heartbeat of the event
      </div>
      <div className="text-[64px] font-bold text-slate-800">Staff Members</div>
    </div>
  );
}
