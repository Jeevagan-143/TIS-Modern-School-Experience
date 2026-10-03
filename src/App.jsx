import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Moon,
  Sun,
  BookOpen,
  Trophy,
  Users,
  Heart,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Academics", id: "academics" },
  { label: "Campus", id: "campus" },
  { label: "Life at TIS", id: "life" },
  { label: "Admissions", id: "admissions" },
];

const stats = [
  { number: "22", label: "Acres of Campus" },
  { number: "16+", label: "Sports & Activities" },
  { number: "6:1", label: "Student Teacher Ratio" },
  { number: "24/7", label: "Student Support" },
];

const programs = [
  {
    title: "Academic Excellence",
    text: "A strong CBSE foundation supported by experiential learning, curiosity and critical thinking.",
    icon: BookOpen,
  },
  {
    title: "Sports & Wellness",
    text: "A vibrant sporting culture that develops confidence, discipline, teamwork and resilience.",
    icon: Trophy,
  },
  {
    title: "Character & Community",
    text: "A nurturing environment where students learn to lead, collaborate and care for others.",
    icon: Users,
  },
];

const activities = [
  {
    title: "Residential Life",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Sports & Fitness",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Learning Spaces",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85",
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-[#c89b3c]"
    />
  );
}

function CustomCursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleHover = (event) => {
      setHovering(Boolean(event.target.closest("a, button")));
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed z-[200] h-8 w-8 rounded-full border border-white mix-blend-difference"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: hovering ? 1.8 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
      }}
    />
  );
}

function Navbar({ darkMode, setDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/15 bg-[#0b2942]/90 px-4 py-3 text-white shadow-2xl backdrop-blur-xl md:px-6">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d2a44d] font-serif text-xl font-bold text-[#0b2942]">
            T
          </div>

          <div>
            <div className="font-serif text-xl font-bold tracking-wide">
              TULAS
            </div>
            <div className="text-[8px] tracking-[0.3em] text-white/60">
              INTERNATIONAL SCHOOL
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-white/75 transition hover:text-[#d2a44d]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a
            href="#admissions"
            className="hidden rounded-full bg-[#d2a44d] px-5 py-3 text-sm font-bold text-[#0b2942] transition hover:-translate-y-0.5 md:block"
          >
            Apply Now
            <ArrowUpRight className="ml-1 inline" size={15} />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-7xl rounded-2xl bg-[#0b2942] p-4 text-white lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#admissions"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-xl bg-[#d2a44d] px-4 py-3 text-center font-bold text-[#0b2942]"
          >
            Apply Now
          </a>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b2942] text-white">
      <img
        src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=2200&q=90"
        alt="TIS campus"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#071c2d]/95 via-[#071c2d]/65 to-[#071c2d]/10" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-5 pb-20 pt-40 md:px-8 md:pb-24">
        <div className="max-w-4xl">
          <Reveal>
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs tracking-widest backdrop-blur">
              THE MODERN GURUKUL · DEHRADUN
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-serif text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-8xl">
              Where curiosity
              <span className="text-[#d2a44d]"> becomes </span>
              character.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              A future-ready school where academic excellence, sport,
              creativity and community come together to help every student
              discover their potential.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#admissions"
                className="group flex items-center justify-center rounded-full bg-[#d2a44d] px-7 py-4 font-bold text-[#0b2942] transition hover:-translate-y-1"
              >
                Explore Admissions
                <ArrowRight
                  size={18}
                  className="ml-2 transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="#about"
                className="flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-4 font-bold backdrop-blur transition hover:bg-white/15"
              >
                Discover TIS
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs tracking-widest text-white/50 md:flex">
        SCROLL TO EXPLORE
        <div className="h-px w-12 bg-white/30" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="bg-[#f8f5ed] py-24 text-[#102a43] md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27a27]">
              A different kind of school
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
              Learning that feels like an{" "}
              <span className="italic text-[#a27a27]">adventure.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-8 text-[#617184]">
              Tulas International School brings together strong academics,
              residential life, sports, creativity and community in a
              supportive environment designed to help young people become
              confident and capable.
            </p>

            <a
              href="#academics"
              className="mt-6 inline-flex items-center font-bold"
            >
              Explore our approach
              <ArrowRight size={17} className="ml-2" />
            </a>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 border-y border-[#102a43]/10 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div className="border-r border-[#102a43]/10 px-5 py-9 last:border-0 md:px-8">
                <div className="font-serif text-4xl md:text-5xl">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm text-[#617184]">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Academics() {
  return (
    <section
      id="academics"
      className="bg-white py-24 text-[#102a43] md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27a27]">
            The TIS advantage
          </p>

          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-serif text-4xl md:text-6xl">
              Built for the{" "}
              <span className="italic text-[#a27a27]">whole</span> student.
            </h2>

            <p className="max-w-md text-[#617184]">
              The classroom is only one part of the journey. Students are
              encouraged to think, play, lead, create and grow.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <Reveal key={program.title} delay={index * 0.1}>
                <article className="group h-full rounded-3xl border border-[#102a43]/10 bg-[#f8f5ed] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102a43] text-[#d2a44d]">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-8 font-serif text-2xl">
                    {program.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#617184]">
                    {program.text}
                  </p>

                  <div className="mt-8 h-1 w-10 bg-[#d2a44d] transition-all group-hover:w-20" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Campus() {
  return (
    <section
      id="campus"
      className="bg-[#0b2942] py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d2a44d]">
            Life beyond the classroom
          </p>

          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-serif text-4xl md:text-6xl">
              A campus made to{" "}
              <span className="italic text-[#d2a44d]">inspire.</span>
            </h2>

            <p className="max-w-md text-white/60">
              Space to learn, play, connect and discover across a vibrant
              campus in the foothills of Dehradun.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {activities.map((activity, index) => (
            <Reveal key={activity.title} delay={index * 0.1}>
              <article className="group relative h-[450px] overflow-hidden rounded-3xl">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071c2d] via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="font-serif text-3xl">
                    {activity.title}
                  </h3>

                  <div className="mt-3 flex items-center text-sm text-[#d2a44d]">
                    Discover more
                    <ArrowUpRight size={16} className="ml-2" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Life() {
  return (
    <section
      id="life"
      className="bg-[#f8f5ed] py-24 text-[#102a43] md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=85"
              alt="Students playing sports"
              className="h-[500px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 p-5 backdrop-blur">
              <Trophy size={22} className="text-[#a27a27]" />
              <div className="mt-2 font-bold">16+ sports</div>
              <div className="text-xs text-[#617184]">
                Play. Discipline. Belong.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27a27]">
            Life at TIS
          </p>

          <h2 className="mt-4 font-serif text-4xl md:text-6xl">
            Find your{" "}
            <span className="italic text-[#a27a27]">thing.</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#617184]">
            From sports and clubs to music, art and leadership, students have
            room to explore interests that can become lifelong passions.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Sports & Fitness",
              "Arts, Music & Drama",
              "Clubs & Societies",
              "Leadership & Community",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-[#102a43]/10 pb-4"
              >
                <span className="text-xs text-[#a27a27]">
                  0{index + 1}
                </span>

                <span className="font-bold">{item}</span>

                <ChevronRight
                  size={17}
                  className="ml-auto text-[#a27a27]"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Admissions() {
  return (
    <section
      id="admissions"
      className="relative overflow-hidden bg-[#d2a44d] py-24 text-[#0b2942] md:py-32"
    >
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[60px] border-[#0b2942]/5" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-70">
            Admissions
          </p>

          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-none md:text-7xl">
            Give your child a place to{" "}
            <span className="italic">grow.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 opacity-75">
            Begin your child's journey at Tulas International School.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-[#0b2942] p-7 text-white shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d2a44d] text-[#0b2942]">
                <Phone size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Admission Helpline
                </p>
                <p className="mt-1 text-xl font-bold">
                  +91 98379 83791
                </p>
              </div>
            </div>

            <a
              href="https://admission.tis.edu.in/"
              target="_blank"
              rel="noreferrer"
              className="mt-7 flex items-center justify-center rounded-full bg-[#d2a44d] px-5 py-4 font-bold text-[#0b2942] transition hover:-translate-y-1"
            >
              Start Application
              <ArrowUpRight size={17} className="ml-2" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#071c2d] py-14 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d2a44d] font-serif text-xl font-bold text-[#0b2942]">
                T
              </div>

              <div>
                <div className="font-serif text-xl font-bold">TULAS</div>
                <div className="text-[8px] tracking-[0.3em] text-white/50">
                  INTERNATIONAL SCHOOL
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-md leading-7 text-white/50">
              Enlightening through education, ensuring a promising future.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#d2a44d]">
              Explore
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/55">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="block transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#d2a44d]">
              Contact
            </p>

            <div className="mt-5 space-y-4 text-sm leading-6 text-white/55">
              <p className="flex gap-3">
                <MapPin size={17} className="mt-1 shrink-0" />
                Dhoolkot, P.O. Selaqui, Chakrata Road, Dehradun
              </p>

              <p className="flex gap-3">
                <Phone size={17} className="mt-1 shrink-0" />
                +91 98379 83791
              </p>

              <p className="flex gap-3">
                <Mail size={17} className="mt-1 shrink-0" />
                info@tis.edu.in
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/30">
          © 2026 Tulas International School. Homepage redesign.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <ScrollProgress />
      <CustomCursor />

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>
        <Hero />
        <About />
        <Academics />
        <Campus />
        <Life />
        <Admissions />
      </main>

      <Footer />
    </div>
  );
}
