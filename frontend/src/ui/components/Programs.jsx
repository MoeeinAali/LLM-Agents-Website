import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function Programs({ showButton = true }) {
  return (
    <div className="relative mx-auto overflow-hidden px-6">
      <div className="Ellipse absolute right-[-200px] top-[636px] h-72 w-72 rounded-full bg-zinc-400 bg-opacity-30 blur-3xl" />
      <div className="Ellipse absolute left-[-200px] top-[205px] h-64 w-64 rounded-full bg-pink-300 bg-opacity-30 blur-3xl" />

      <div className="mx-auto max-w-[993px]">
        <ProgramsArea />
        <ItemsTag />
        {showButton && <Button text="More About LLM-Agents" />}
      </div>
    </div>
  );
}

// Set default props
Programs.defaultProps = {
  showButton: true,
};

// Prop types
Programs.propTypes = {
  showButton: PropTypes.bool,
};

const items = [
  {
    id: 1,
    title: 'Insight Sessions',
    overline: 'Uncovering the Future with Experts',
    img: '/landing/seminars.jpg',
    desc: 'The first day of the event is dedicated to thought leadership and knowledge sharing. Dive into the evolving landscape of AI with a series of inspiring talks and interactive sessions led by top minds from both academia and industry. Learn how Large Language Model (LLM) agents are shaping the future—from real-world use cases to cutting-edge research—and prepare yourself for the challenges of Day 2 & 3.',
  },
  {
    id: 2,
    title: 'Hackathon',
    overline: 'Build. Compete. Innovate',
    img: '/landing/roundtables.jpg',
    desc: 'The second day shifts from theory to action. Participants will team up and compete in a hands-on hackathon centered around challenges ideal for LLM agent-based solutions. A strong mentorship team—comprising experienced researchers, engineers, and AI practitioners—will be available throughout the event to guide teams, help refine problem ideas, and support implementation.',
  },
  {
    id: 3,
    title: 'Final-Presentations & Awards',
    overline: 'Demo. Showcase. Celebrate',
    img: '/landing/roundtables.jpg',
    desc:
      "The third day is all about showcasing what you've built. Each team will present their solution in a demo session before our panel of expert judges—composed of faculty, industry professionals, and AI researchers. This is your opportunity to communicate not only what your solution does, but why it matters.\n" +
      "Judges will evaluate projects based on creativity, impact, technical execution, and alignment with LLM agent capabilities. After the demos, we’ll conclude with an awards ceremony celebrating the top-performing teams and their outstanding contributions.This final stage is more than just competition—it's a celebration of ideas, effort, and innovation.",
  },
];

function ProgramsArea() {
  return (
    <div className="mx-auto mb-20 text-center">
      <div className="text-lg font-medium uppercase tracking-wide text-neutral-400">
        Explore the realm of Computer Science
      </div>
      <div className="text-[64px] font-bold text-slate-800">Programs</div>
    </div>
  );
}

function Button({ text }) {
  return (
    <div className="mb-32 mt-20 flex justify-center">
      <Link
        href="/about"
        className="inline-flex h-16 items-center justify-center gap-2.5 gap-x-2.5 rounded-md bg-secondary px-8 text-white hover:bg-secondary-400"
      >
        <span className="text-lg font-bold">{text}</span>
        <Image
          src={'/source/arrow_right_white.svg'}
          alt=""
          width={20}
          height={20}
        />
      </Link>
    </div>
  );
}

function ItemText({ title, overline, description }) {
  return (
    <div className="grow">
      <div className="text-base font-medium uppercase tracking-wide text-neutral-400">
        {overline}
      </div>
      <div className="text-5xl font-bold leading-normal text-slate-800">
        {title}
      </div>
      <div
        style={{ textAlign: 'justify' }}
        className="mt-2.5 text-lg leading-relaxed text-neutral-500"
      >
        {description}
      </div>
    </div>
  );
}

function ItemImg({ img }) {
  return (
    <img
      className="aspect-[4 / 3] relative w-full max-w-sm shrink-0 rounded-lg object-cover object-center"
      alt=""
      src={img}
    />
  );
}

function ItemTag({ item }) {
  return (
    <div
      className={`flex flex-col items-center justify-start gap-x-20 gap-y-8 ${
        item.id % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/*<ItemImg img={item.img} />*/}
      <ItemText
        title={item.title}
        overline={item.overline}
        description={item.desc}
      />
    </div>
  );
}

function ItemsTag() {
  return (
    <div className="mx-auto flex flex-col items-end justify-start gap-[72px] text-base">
      {items.map((item) => (
        <ItemTag item={item} key={item.id} />
      ))}
    </div>
  );
}
