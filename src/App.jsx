import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

const resumeUrl = "https://drive.google.com/file/d/1wX_rkgIs0W4AezahD9oTX5JIfNtb3AYi/view?usp=sharing";
const githubUrl = "https://github.com/sahilshaikhh202";
const linkedinUrl = "https://www.linkedin.com/in/mohd-sahil-shaikh-3664aa307";

const skills = [["Languages", "TypeScript · JavaScript · Python · Java · SQL"], ["Backend", "NestJS · Node.js · PostgreSQL · TypeORM · Redis · Bull"], ["Frontend", "React · Next.js · Redux Toolkit"], ["Systems", "REST APIs · Async Jobs · Queues · Authentication · RBAC"], ["Infrastructure", "Docker · CI/CD"], ["Integrations", "Razorpay · Meta CAPI · WebEngage · OpenAI · SendGrid · Gupshup · MSG91"]];

function SectionHeading({ index, children, intro }) { return <div className="section-heading"><span>{index}</span><div><h2>{children}</h2>{intro && <p>{intro}</p>}</div></div>; }
function App() {
  const timelineRef = useRef(null);
  const roleRefs = useRef([]);
  const [activeRoles, setActiveRoles] = useState(new Set());

  useEffect(() => {
    const roles = roleRefs.current.filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const roleIndex = Number(entry.target.dataset.roleIndex);
        setActiveRoles(currentRoles => {
          if (currentRoles.has(roleIndex)) return currentRoles;
          const nextRoles = new Set(currentRoles);
          nextRoles.add(roleIndex);
          return nextRoles;
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -12% 0px" });

    roles.forEach(role => observer.observe(role));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let animationFrameId = null;
    const updateProgress = () => {
      animationFrameId = null;
      const timelineBounds = timeline.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.55;
      const progress = Math.min(1, Math.max(0, (viewportAnchor - timelineBounds.top) / timelineBounds.height));
      timeline.style.setProperty("--timeline-progress", progress);
    };
    const scheduleProgressUpdate = () => {
      if (animationFrameId === null) animationFrameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
    window.addEventListener("resize", scheduleProgressUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleProgressUpdate);
      window.removeEventListener("resize", scheduleProgressUpdate);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div className="site-shell"><Header resumeUrl={resumeUrl} /><main>
    <section className="hero" id="top"><div className="hero-grid"><div className="hero-main"><p className="eyebrow">Software engineer / University of Edinburgh</p><h1>Mohd <span className="hero-underline-sahil">Sahil</span> Azad<br /><em>Shaikh</em></h1><p className="hero-role">Software Engineer <i>·</i> MSc Computer Science @ The University of Edinburgh</p><p className="hero-copy">I build production software across backend systems, product interfaces and full-stack products.</p><div className="hero-actions"><a className="button button-dark" href="#experience">View work <span>↓</span></a><a className="button button-line" href={resumeUrl} target="_blank" rel="noreferrer">Resume ↗</a></div><div className="hero-socials"><a href={githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a><a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></div></section>
    <section className="currently section-wrap" id="edinburgh"><SectionHeading index="01" intro="A new academic chapter, grounded in production engineering.">Currently</SectionHeading><div className="currently-card"><span className="currently-kicker">The University of Edinburgh</span><div><h3>MSc Computer Science</h3><p>2026—2027 <i>·</i> Starting September 14, 2026</p></div><p className="currently-copy">Pursuing a one-year MSc while continuing to build software and deepen my understanding of computer science and software engineering.</p></div></section>
    <section className="experience section-wrap" id="experience">
      <SectionHeading index="02" intro="A progression from internship to full-time engineering across a production running-event ecosystem.">Experience</SectionHeading>
      <div className="fitpage-experience">
        <header className="fitpage-header">
          <div><span className="eyebrow">Oct 2025 — Jun 2026 · 9 months</span><h3>Fitpage</h3><p>Mumbai, Maharashtra, India <i>·</i> On-site</p></div>
          <p className="fitpage-summary">Built across IndiaRunning’s consumer, registration and organiser products in a seven-repository production ecosystem.</p>
        </header>
        <div className="role-timeline" ref={timelineRef}>
          <div className="role-timeline-progress" aria-hidden="true" />
          <article className={`role-entry role-entry-current${activeRoles.has(0) ? " role-entry-active" : ""}`} data-role-index="0" ref={element => { roleRefs.current[0] = element; }}>
            <div className="role-marker" aria-hidden="true"><span /></div>
            <div className="role-content"><div className="role-heading"><div><h4>Associate Software Engineer</h4><p>Apr 2026 — Jun 2026 <i>·</i> Full-time</p></div><span className="role-stage">02</span></div>
            <ul>
              <li>Shipped consumer-facing product workflows including Event Invites, Guest List, Registration Questions and multi-channel communication jobs.</li>
              <li>Built WebEngage notification infrastructure with Redis-backed Bull processing so delivery work stays outside critical product requests.</li>
              <li>Implemented server-side Meta conversion tracking in the payment-success flow, coordinating transaction-level deduplication with the browser pixel.</li> 
            </ul>
            </div>
          </article>
          <article className={`role-entry${activeRoles.has(1) ? " role-entry-active" : ""}`} data-role-index="1" ref={element => { roleRefs.current[1] = element; }}>
            <div className="role-marker" aria-hidden="true"><span /></div>
            <div className="role-content"><div className="role-heading"><div><h4>Software Developer Intern</h4><p>Oct 2025 — Mar 2026 <i>·</i> Internship</p></div><span className="role-stage">01</span></div>
            <ul>
              <li>Contributed full-stack organiser features across React dashboards, NestJS APIs and PostgreSQL-backed data flows.</li>
              <li>Designed and built BIB Assignment: collision-free range suggestions in NestJS with a React and Redux organiser workflow.</li>
              <li>Built and integrated backend APIs and database workflows for race and event management, working across NestJS, TypeORM and PostgreSQL.</li>
            </ul>
            </div>
          </article>
        </div>
        <div className="experience-footer"><div className="experience-stack"><span>Overall stack</span><p>NestJS · React · Next.js · PostgreSQL · TypeORM · Redis · Bull</p></div></div>
      </div>
    </section>
    <section className="projects section-wrap" id="projects"><SectionHeading index="03" intro="Things I build because the problem keeps me interested.">Independent projects</SectionHeading><div className="penvault"><div className="penvault-content"><span className="eyebrow">Featured independent product</span><h3>PenVault</h3><p>A platform built around reading, writing, discovering and engaging with stories.</p><div className="tags"><span>Python</span><span>Flask</span><span>PostgreSQL</span><span>Supabase</span></div><a className="text-button" href="https://penvault.co" target="_blank" rel="noreferrer">Visit PenVault <span>↗</span></a></div><a className="project-image-link" href="https://penvault.co" target="_blank" rel="noreferrer"><img src="https://i.ibb.co/G40Sjpxn/image.png" alt="PenVault product interface" /></a></div><div className="project-list"><article><span>01</span><div><h3>MedNova</h3><p>A digital learning platform connecting doctors and students around lectures, notes and moderated content.</p></div><a href="https://med-nova-sable.vercel.app/" target="_blank" rel="noreferrer">View ↗</a></article><article><span>02</span><div><h3>Flicksify</h3><p>A personal media library for tracking movies, shows, anime, manga and novels.</p></div><a href="https://github.com/sahilshaikhh202/Flicksify" target="_blank" rel="noreferrer">GitHub ↗</a></article></div></section>
    <section className="skills-section section-wrap" id="skills"><SectionHeading index="04" intro="Technologies in service of dependable product systems—not a logo collection.">Engineering stack</SectionHeading><div className="skills-list">{skills.map(([label, value]) => <div key={label}><h3>{label}</h3><p>{value}</p></div>)}</div></section>
    <section className="education section-wrap" id="about"><SectionHeading index="05">Education & direction</SectionHeading><div className="education-layout"><div><span className="eyebrow">2026 — 2027</span><h3>University of Edinburgh</h3><p>MSc Computer Science</p></div><div className="timeline"><div><span>2023</span><p>Undergraduate foundation</p></div><div><span>2025</span><p>Software Engineer<br />Fitpage / IndiaRunning</p></div><div className="timeline-current"><span>2026</span><p>MSc Computer Science<br />University of Edinburgh</p></div><div><span>2027</span><p>Next chapter</p></div></div></div></section>
    <section className="about section-wrap"><SectionHeading index="06">How I build</SectionHeading><div className="about-layout"><h3>I like problems that<br /><em>cross layers.</em></h3><div><p>My best work tends to happen where database design, API contracts, frontend state, async processing and external services all need to fit together.</p><div className="layer-chain"><span>Database</span><b>→</b><span>API</span><b>→</b><span>Frontend</span><b>→</b><span>Async</span><b>→</b><span>External services</span></div><p className="about-secondary">I’m interested in building systems that sit between product and engineering—then using deeper computer science study to make those systems more thoughtful and robust.</p></div></div><div className="notes"><span className="eyebrow">Engineering notes</span><div className="notes-content"><p>A personal space where I turn what I’m learning into structured notes, courses and quizzes—covering systems, software engineering and backend development.</p><a href="https://course-web-app-lake.vercel.app/" target="_blank" rel="noreferrer">Explore the learning library ↗</a></div></div></section>
    <Contact /></main><Footer githubUrl={githubUrl} linkedinUrl={linkedinUrl} /></div>;
}
export default App;
