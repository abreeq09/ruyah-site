import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './motion.css'
import './pages/pages.css'
import ruyahLogo from './assets/ruyah-logo.svg'
import rightHanging from './assets/right-hanging.svg'
import realWorldSkillsIcon from './assets/real-world-skills.svg'
import languageMasteryIcon from './assets/language-mastery.svg'
import islamicCharacterIcon from './assets/islamic-character.svg'
import homeschoolFriendlyIcon from './assets/homeschool-friendly.svg'
import courseComponent from './assets/course-component.svg'
import TestimonialCarousel from './components/ui/v-carousel-11'
import PhoneIcon from 'lucide-react/dist/esm/icons/phone.mjs'
import MailIcon from 'lucide-react/dist/esm/icons/mail.mjs'
import MessageCircleIcon from 'lucide-react/dist/esm/icons/message-circle.mjs'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import { QRCodeSVG } from 'qrcode.react'

const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || '918638854236').replace(/\D/g, '')

const UPI_ID = import.meta.env.VITE_UPI_ID || ''
const UPI_NAME = import.meta.env.VITE_UPI_NAME || 'Ruyah Institute of Excellence'
const BANK = {
  holder: import.meta.env.VITE_BANK_HOLDER || '',
  bankName: import.meta.env.VITE_BANK_NAME || '',
  account: import.meta.env.VITE_BANK_ACCOUNT || '',
  ifsc: import.meta.env.VITE_BANK_IFSC || ''
}

const studentReviews = [
  { avatar: 'AK', name: 'Amina K.', role: 'Arabic learner', quote: 'The lessons made Arabic feel approachable and practical. I now feel much more confident reading and speaking in everyday situations.' },
  { avatar: 'MP', name: 'Maryam’s Parent', role: 'Homeschool program', quote: 'The flexibility fits beautifully into our homeschool routine. My daughter enjoys learning while staying connected to Islamic values.' },
  { avatar: 'YA', name: 'Yusuf A.', role: 'Digital skills learner', quote: 'Every session was clear and hands-on. I finished the course with real work I could share and the confidence to keep building.' }
]

const courses = [
  {
    id: 'arabic-language',
    eyebrow: 'Language Foundation',
    title: 'Arabic Language',
    short: 'Build vocabulary, understand sentence structure and communicate with confidence.',
    price: 'From £25/month',
    duration: '12 weeks',
    level: 'Beginner friendly',
    age: 'Ages 6+',
    icon: 'ع',
    outcomes: ['Read and pronounce Arabic confidently', 'Use practical everyday vocabulary', 'Understand essential grammar patterns', 'Build a foundation for Quranic Arabic'],
    modules: ['Letters, sounds and pronunciation', 'Everyday words and expressions', 'Sentence building', 'Reading and guided conversation']
  },
    {
    id: 'spoken-english-beginner',
    eyebrow: 'Beginner Level',
    title: 'Spoken English',
    levelLabel: 'Beginner',
    short: 'Start from the basics with clear pronunciation, everyday vocabulary and confident conversation.',
    price: '₹1,000 / 2 months · ₹2,000 Total',
    duration: '4 months',
    level: 'Beginner',
    age: 'Ages 8+',
    icon: 'Aa',
    outcomes: ['Speak more clearly and confidently', 'Improve vocabulary and pronunciation', 'Practise real-life conversations'],
    modules: ['Confidence and introductions', 'Everyday conversations', 'Pronunciation clinic'],
    levels: [
      { name: 'Beginner', duration: '4 months', plans: [
        { label: '2-month payment', months: 2, amount: 1000 },
        { label: '4-month payment (full fee)', months: 4, amount: 2000 }
      ] }
    ]
  },
  {
    id: 'spoken-english-advanced',
    eyebrow: 'Advanced Level',
    title: 'Spoken English',
    levelLabel: 'Advanced',
    short: 'Take your English further with fluent conversation, presentations and interview skills.',
    price: '₹1,000/month · ₹4,000 Total',
    duration: '4 months',
    level: 'Advanced',
    age: 'Ages 8+',
    icon: 'Aa',
    outcomes: ['Speak fluently and naturally', 'Strengthen listening and presentation skills', 'Prepare for interviews and professional settings'],
    modules: ['Fluent conversation', 'Presentations', 'Interviews and professional English'],
    levels: [
      { name: 'Advanced', duration: '4 months', requires: 'Beginner', plans: [
        { label: '2-month payment', months: 2, amount: 2000 },
        { label: 'Total fee (4 months)', months: 4, amount: 4000 }
      ] }
    ]
  },
  {
  id: 'quran-tajweed',
  eyebrow: 'Qur’an Foundation',
  title: 'Qur’an Reading & Tajweed',
  short: 'Learn to read the Holy Qur’an correctly with Tajweed, clear pronunciation and proper Makhraj.',
  price: '₹600 / month',
  duration: 'As per course curriculum',
  level: 'Beginner',
  age: 'All ages',
  icon: 'ق',
  outcomes: ['Read the Holy Qur’an correctly (Nazirah)', 'Understand the basics of Qur’anic Arabic', 'Learn the essential rules of Tajweed', 'Pronounce words accurately with correct Makhraj', 'Memorise selected Surahs'],
  modules: ['Nazirah Qur’an', 'Basic Qur’anic Arabic', 'Tajweed rules', 'Pronunciation and Makhraj', 'Memorisation of selected Surahs'],
  levels: [
    { name: 'Beginner', duration: 'Monthly', plans: [
      { label: 'Monthly fee', months: 1, amount: 600 }
    ] }
  ]
  },



  {
    id: 'python-ai-tools',
    eyebrow: 'Future-ready Digital Skills',
    title: 'Python + AI Tools',
    short: 'Learn coding fundamentals, problem solving and responsible ways to use modern AI tools.',
    price: 'From £25/month',
    duration: '12 weeks',
    level: 'No coding required',
    age: 'Ages 10+',
    icon: '</>',
    outcomes: ['Understand Python fundamentals', 'Build small practical projects', 'Use AI tools ethically and productively', 'Develop computational problem-solving skills'],
    modules: ['Python basics', 'Logic and problem solving', 'Creative mini-projects', 'AI tools, safety and productivity']
  }
]

const navItems = [
  ['Home', '/'], ['About', '/about'], ['Programs', '/programs'], ['FAQs', '/faq'], ['Contact', '/contact']
]

const faqs = [
  ['Who can join Ruyah courses?', 'Our current courses are designed for learners aged 6 and above. The suitable starting level depends on the chosen course, and our team can help you select the right option.'],
  ['Can I request a demo class?', 'Yes. Select your preferred course on the enrollment form and choose the demo-class option. Our team will share available timings through WhatsApp.'],
  ['How much do the courses cost?', 'Spoken English starts from ₹1,000 for 2 months, and Quran Reading & Tajweed is ₹600 per month. Fees for our other courses are confirmed by the Ruyah team before enrollment.'],
  ['Are classes live or self-paced?', 'Self-paced learning and live online session options are available. You can choose your preference in the participant form or ask our team for guidance.'],
  ['Will participants receive a certificate?', 'A certificate is included after the participant completes the required lessons, activities and course expectations.'],
  ['How does enrollment work?', 'Choose a course, complete the participant form, and continue to WhatsApp. Your information is prepared as a message so the Ruyah team can confirm the next steps.']
]

function whatsappUrl(message) {
  const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : 'https://wa.me/'
  return `${base}?text=${encodeURIComponent(message)}`
}

function courseName(course) {
  return course.levelLabel ? `${course.title} – ${course.levelLabel}` : course.title
}

function go(path) {
  if (path.startsWith('/#')) {
    if (location.pathname !== '/') history.pushState({}, '', path)
    else location.hash = path.slice(2)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setTimeout(() => document.getElementById(path.slice(2))?.scrollIntoView({ behavior: 'smooth' }), 40)
    return
  }
  history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Logo() {
  return <button className="logo" onClick={() => go('/')} aria-label="Ruyah home">
    <img src={ruyahLogo} alt="Ruyah Institute" />
  </button>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <Logo />
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? '×' : '☰'}</button>
    <nav className={open ? 'open' : ''}>
      {navItems.map(([label, path]) => <button key={label} onClick={() => { setOpen(false); go(path) }}>{label}</button>)}
      <button className="nav-enrol" onClick={() => { setOpen(false); go('/enroll') }}>Enroll now</button>
    </nav>
  </header>
}

function Ornament({ children = '✦' }) {
  return <span className="ornament"><span>{children}</span></span>
}

function ChevronIcon() {
  return <span className="faq-chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
}

function Home() {
  const homeschoolRef = useRef(null)

  useEffect(() => {
    const banner = homeschoolRef.current
    if (!banner || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame
    const updateParallax = () => {
      frame = undefined
      const rect = banner.getBoundingClientRect()
      const distance = window.innerHeight / 2 - (rect.top + rect.height / 2)
      const offset = Math.max(-150, Math.min(150, distance * 0.3))
      banner.style.setProperty('--parallax-offset', `${offset}px`)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateParallax) }
    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <>
    <section className="hero pattern-dark">
      <div className="hero-content">
        <span className="hero-label">Faith-centered Learning at Any Age</span>
        <h1>RUYAH</h1>
        <p className="hero-copy">A modern online institute built on Islamic tarbiyah, meaningful education, and flexible home-based learning.</p>
        <div className="actions">
          <button className="button light" onClick={() => go('/programs')}>Browse courses</button>
          <button className="button light" onClick={() => go('/enroll')}>Enroll now</button>
        </div>
      </div>
    </section>

    <section className="section about" id="about">
      <img className="left-hanging" src={rightHanging} alt="" aria-hidden="true" />
      <img className="right-hanging" src={rightHanging} alt="" aria-hidden="true" />
      <span className="pill">About Us</span>
      <h2>Real Skills.<br />Real Languages.<br />Rooted in Islamic Values.</h2>
      <p className="lead">Ruyah is an online institute offering practical skill-building, language mastery and character education, all grounded in Islamic principles for learners of every age.</p>
    </section>

    <section className="section pillars">
      <span className="pill">Our Approach</span>
      <h2>Learning Built on Four Pillars</h2>
      <p className="lead">Everything at Ruyah develops the whole person — mind, skill, character and faith.</p>
      <div className="pillar-grid">
        {[
          ['⌁', 'Real-world skills', 'Practical, career-ready skills taught through hands-on tasks in coding, design, writing and more.'],
          ['•••', 'Language mastery', 'Arabic, Quran recitation and modern world languages taught with authentic, structured methods.'],
          ['✤', 'Islamic character', 'Every subject is taught with adab, ethics and tarbiyah woven naturally into the curriculum.'],
          ['⌂', 'Homeschool friendly', 'Flexible, structured resources designed for every age and lifestyle.']
        ].map(([icon, title, copy]) => <article className="pillar" key={title}>
          <img className="pillar-icon" src={title === 'Real-world skills' ? realWorldSkillsIcon : title === 'Language mastery' ? languageMasteryIcon : title === 'Islamic character' ? islamicCharacterIcon : homeschoolFriendlyIcon} alt="" /><h3>{title}</h3><p>{copy}</p>
        </article>)}
      </div>
    </section>

    <section className="section courses pattern-dark" id="courses">
      <span className="pill light">Our Courses</span>
      <h2>What you can learn at Ruyah</h2>
      <p className="lead light-copy">Self-paced learning with live session options, suitable for ages 6 and above.</p>
      <div className="benefits">✦ Self-paced <b>✦</b> Certificate included <b>✦</b> All ages welcome</div>
      <div className="course-grid">
        {courses.map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    </section>

    <section className="section homeschool-banner-wrap">
      <div className="homeschool-banner" ref={homeschoolRef}>
        <div className="homeschool-copy">
          <span className="banner-kicker">Flexible Homeschooling</span>
          <h2>Build a learning plan around the subjects you choose</h2>
          <p>Mix core academics, languages, Islamic studies and future-ready skills into one flexible home-learning journey.</p>
          <div className="subject-list" aria-label="Available homeschool subjects">
            {['English', 'Arabic', 'Mathematics', 'Science', 'Islamic Studies', 'Coding'].map(subject => <span key={subject}>{subject}</span>)}
          </div>
          <div className="actions banner-actions">
            <button className="button light" onClick={() => go('/enroll')}>Build Your Plan</button>
            <a className="button outline-light" href={whatsappUrl('Assalamu alaikum, I would like to create a flexible homeschooling plan with subjects of my choice.')} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
          </div>
        </div>
        <div className="homeschool-emblem" aria-hidden="true"><span>⌂</span><small>Learn at Home</small></div>
      </div>
    </section>

    <section className="section journey">
      <span className="pill">Begin Your Journey</span>
      <h2>Learning with purpose starts here</h2>
      <p className="lead">Choose a course, share the learner's details, and our team will guide you through the right starting point.</p>
      <div className="steps">
        {['Explore a course', 'Enroll in the course', 'Attend a free demo class', 'Receive guidance on WhatsApp'].map((x, i) => <div key={x}><b>0{i + 1}</b><span>{x}</span></div>)}
      </div>
      <button className="button dark" onClick={() => go('/enroll')}>Start enrollment</button>
    </section>

    <section className="section reviews-section" id="reviews">
      <span className="pill">Student Reviews</span>
      <h2>What our learners say</h2>
      <p className="lead">Reflections from students and families who have learned with Ruyah.</p>
      <TestimonialCarousel testimonials={studentReviews} />
    </section>

    <section className="section faq-section" id="faq">
      <div className="faq-heading"><span className="pill">FAQs</span><h2>Questions, answered clearly</h2><p className="lead">Everything you need to know before beginning a course at Ruyah.</p></div>
      <div className="faq-list">
        {faqs.map(([question, answer]) => <details key={question}>
          <summary><span>{question}</span><ChevronIcon /></summary>
          <p>{answer}</p>
        </details>)}
      </div>
    </section>
  </>
}

function CourseCard({ course }) {
  return <article className="course-card">
    <img className="course-frame" src={courseComponent} alt="" aria-hidden="true" />
    <div className="course-card-content">
      <p className="card-kicker">{course.eyebrow}</p>
      <h3>{course.title}</h3>
      <p>{course.short}</p>
      <div className="chips"><span>{course.duration}</span><span>{course.age}</span></div>
      <strong>{course.price}</strong>
      <div className="card-actions">
        <a className="detail-link" href={`/course/${course.id}`} onClick={(event) => { event.preventDefault(); go(`/course/${course.id}`) }}>View Details →</a>
        <button className="filled" onClick={() => go(`/enroll?course=${course.id}`)}>Enroll</button>
      </div>
    </div>
  </article>
}


function CoursesPage() {
  return <main className="courses-page">
    <section className="courses-page-hero pattern-dark">
      <span className="pill light">Ruyah Programs</span>
      <h1>Courses for meaningful growth</h1>
      <p>Practical skills, confident communication and character-led learning—designed for flexible study at home.</p>
    </section>
    <section className="section course-catalogue">
      <div className="catalogue-intro">
        <div><span className="pill">Explore Courses</span><h2>Choose your learning path</h2></div>
        <p>Every course includes structured lessons, flexible learning options and guidance from the Ruyah team. Select a course to see its full curriculum and enrollment details.</p>
      </div>
      <div className="course-grid">{courses.map(course => <CourseCard key={course.id} course={course} />)}</div>
    </section>
    <section className="section catalogue-help">
      <Ornament>?</Ornament><h2>Not sure which course fits?</h2>
      <p className="lead">Request a demo class or speak with our team on WhatsApp for personal guidance.</p>
      <div className="actions"><button className="button dark" onClick={() => go('/enroll')}>Request a demo</button><a className="button catalogue-whatsapp" href={whatsappUrl('Assalamu alaikum, I need help choosing the right Ruyah course.')} target="_blank" rel="noreferrer">Ask on WhatsApp</a></div>
    </section>
  </main>
}

function PaymentOptions({ course }) {
  const [levelIndex, setLevelIndex] = useState(0)
  const [plan, setPlan] = useState(null)
  const [copied, setCopied] = useState('')
  if (!course.levels) return null
  const level = course.levels[levelIndex]
  const amountText = plan ? `₹${plan.amount.toLocaleString('en-IN')}` : ''
  const note = plan ? `${course.title} ${level.name} - ${plan.label}` : ''
  const upiLink = plan ? `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${plan.amount}&cu=INR&tn=${encodeURIComponent(note)}` : ''
  const copyText = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 2000)
    } catch { setCopied('') }
  }

  return <section className="section payment-section">
    <span className="pill">Fees &amp; Payment</span>
    <h2>Choose your payment option</h2>
    {course.levels.length > 1 && <div className="level-tabs">
      {course.levels.map((l, i) => <button key={l.name} type="button" className={i === levelIndex ? 'active' : ''} onClick={() => { setLevelIndex(i); setPlan(null) }}>{l.name} · {l.duration}</button>)}
    </div>}
    {level.requires && <p className="payment-note">Students must complete the {level.requires} level before enrolling in {level.name}.</p>}
    <div className="plan-buttons">
      {level.plans.map(p => <button key={p.label} type="button" className={plan === p ? 'active' : ''} onClick={() => setPlan(p)}>{p.label} — ₹{p.amount.toLocaleString('en-IN')}</button>)}
    </div>
    {plan && (UPI_ID
      ? <div className="qr-box">
          <QRCodeSVG value={upiLink} size={220} />
          <p>Scan with any UPI app to pay <b>{amountText}</b></p>
          <div className="pay-details">
            <p>UPI ID: <b>{UPI_ID}</b> <button type="button" className="copy-btn" onClick={() => copyText('upi', UPI_ID)}>{copied === 'upi' ? 'Copied!' : 'Copy'}</button></p>
            {BANK.account && <div className="bank-details">
              <h4>Or pay by bank transfer</h4>
              <p>Account name: <b>{BANK.holder}</b></p>
              <p>Bank: <b>{BANK.bankName}</b></p>
              <p>Account number: <b>{BANK.account}</b> <button type="button" className="copy-btn" onClick={() => copyText('acc', BANK.account)}>{copied === 'acc' ? 'Copied!' : 'Copy'}</button></p>
              <p>IFSC: <b>{BANK.ifsc}</b> <button type="button" className="copy-btn" onClick={() => copyText('ifsc', BANK.ifsc)}>{copied === 'ifsc' ? 'Copied!' : 'Copy'}</button></p>
              <p>Amount to pay: <b>{amountText}</b></p>
            </div>}
          </div>
          <p className="payment-note">After paying, send your transaction ID to the institute on WhatsApp so your payment can be confirmed.</p>
          <a className="button dark" href={whatsappUrl(`Assalamu alaikum, I have paid ${amountText} for ${note}. Transaction ID: `)} target="_blank" rel="noreferrer">Send payment confirmation</a>
        </div>
      : <p className="payment-note">Online payment is not set up yet. Please contact the institute on WhatsApp.</p>)}
  </section>
}


function CoursePage({ course }) {
  if (!course) return <NotFound />
  return <main>
    <section className="course-hero pattern-dark">
      <span className="pill light">{course.eyebrow}</span>
      <Ornament>{course.icon}</Ornament>
      <h1>{course.title}</h1>
      <p>{course.short}</p>
      <div className="course-facts"><span>{course.duration}</span><span>{course.level}</span><span>{course.age}</span></div>
      <div className="actions">
        <button className="button light" onClick={() => go(`/enroll?course=${course.id}`)}>Enroll in this course</button>
        <a className="button outline-light" href={whatsappUrl(`Assalamu alaikum, I would like more information about the ${course.title} course.`)} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
      </div>
    </section>
    <section className="detail-grid section">
      <article><span className="pill">What You Will Learn</span><h2>Clear, practical outcomes</h2><ul>{course.outcomes.map(x => <li key={x}>✦ {x}</li>)}</ul></article>
      <article className="module-card"><span className="pill light">Course Plan</span><ol>{course.modules.map((x, i) => <li key={x}><b>{String(i + 1).padStart(2, '0')}</b><span>{x}</span></li>)}</ol></article>
    </section>
    <PaymentOptions course={course} />
    <section className="section detail-cta"><h2>Ready to begin?</h2><p>Complete the participant form and continue the conversation with our team on WhatsApp.</p><button className="button dark" onClick={() => go(`/enroll?course=${course.id}`)}>Enroll now</button></section>
  </main>
}

function EnrollmentPage() {
  const initialId = new URLSearchParams(location.search).get('course') || courses[0].id
  const [sent, setSent] = useState(false)
  const [data, setData] = useState({ participant: '', age: '', guardian: '', email: '', phone: '', course: initialId,plan:'', mode: 'Self-paced', demo: 'Yes, I would like a demo class', note: '' })
  const selected = courses.find(x => x.id === data.course) || courses[0]
    const level = selected.levels ? selected.levels[0] : null
  const planOptions = level ? level.plans : []
  const chosenPlan = planOptions.find(p => p.label === data.plan) || planOptions[0] || null
  const totalPlan = planOptions.length > 1 ? planOptions[planOptions.length - 1] : null

  function update(e) { setData({ ...data, [e.target.name]: e.target.value }) }
    function submit(e) {
    e.preventDefault()
    setSent(true)
    const money = n => `₹${n.toLocaleString('en-IN')}`
    const feeLine = chosenPlan ? `Fee option: ${chosenPlan.label} - ${money(chosenPlan.amount)}` : `Course fee: ${selected.price}`
    const totalLine = totalPlan ? `\nTotal course fee: ${money(totalPlan.amount)}` : ''
    const durationLine = level ? `\nCourse duration: ${level.duration}` : ''
    const message = `Assalamu alaikum, I would like to enrol in ${courseName(selected)}.\n\n${feeLine}${totalLine}${durationLine}\nParticipant: ${data.participant}\nAge: ${data.age}\nGuardian: ${data.guardian || 'Not applicable'}\nEmail: ${data.email}\nPhone: ${data.phone}\nLearning mode: ${data.mode}\nDemo class: ${data.demo}\nNotes: ${data.note || 'None'}`
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  return <main className="enroll-page">
    <section className="enroll-intro pattern-dark">
      <button className="back-home" type="button" onClick={() => go('/')} aria-label="Back to homepage">← Back to homepage</button>
      <span className="pill light">Participant Form</span><h1>Begin your Ruyah journey</h1>
      <p>Tell us about the learner, request a demo class, and review the course fee. After submission, WhatsApp will open with a ready-to-send enrollment message.</p>
      <div className="selected-course"><Ornament>{selected.icon}</Ornament><div><small>Selected Course</small><strong>{courseName(selected)}</strong><span>{selected.duration} · {selected.age}</span><b>{selected.price}</b></div></div>
    </section>
    <section className="form-wrap">
      <form onSubmit={submit}>
        <div className="form-heading"><span>Enrollment Details</span><p>Fields marked * are required.</p></div>
        <label>Course *<select name="course" value={data.course} onChange={update}>{courses.map(c => <option value={c.id} key={c.id}>{courseName(c)}</option>)}</select></label>
        <div className="two-col"><label>Participant Name *<input required name="participant" value={data.participant} onChange={update} placeholder="Full name" /></label><label>Participant Age *<input required min="5" max="99" type="number" name="age" value={data.age} onChange={update} placeholder="Age" /></label></div>
        <label>Parent or Guardian Name<input name="guardian" value={data.guardian} onChange={update} placeholder="For participants under 18" /></label>
        <div className="two-col"><label>Email Address *<input required type="email" name="email" value={data.email} onChange={update} placeholder="name@example.com" /></label><label>WhatsApp Number *<input required name="phone" value={data.phone} onChange={update} placeholder="Country code + number" /></label></div>
        <label>Preferred Learning Mode<select name="mode" value={data.mode} onChange={update}><option>Self-paced</option><option>Live online sessions</option><option>Not sure — please guide me</option></select></label>
        <label>Demo Class Preference<select name="demo" value={data.demo} onChange={update}><option>Yes, I would like a demo class</option><option>Please share available demo timings</option><option>No demo class required</option></select></label>
                {planOptions.length > 0 && <label>Fee Option<select name="plan" value={chosenPlan.label} onChange={update}>{planOptions.map(p => <option key={p.label} value={p.label}>{p.label} — ₹{p.amount.toLocaleString('en-IN')}</option>)}</select></label>}
        <div className="fee-notice"><span>Course Fee</span><strong>{chosenPlan ? `₹${chosenPlan.amount.toLocaleString('en-IN')}` : selected.price}</strong>
          {level && <div className="fee-breakdown">
            {totalPlan && <p>Total course fee: <b>₹{totalPlan.amount.toLocaleString('en-IN')}</b></p>}
            <p>Course duration: <b>{level.duration}</b></p>
            {level.requires && <p>The {level.requires} level must be completed before joining {level.name}.</p>}
          </div>}
          <p>The Ruyah team will confirm the final schedule, payment plan and demo-class availability on WhatsApp.</p></div>
        
        
        <label>Anything We Should Know?<textarea name="note" value={data.note} onChange={update} placeholder="Goals, current level, preferred schedule or questions" /></label>
        <button className="button dark submit" type="submit">Continue enrollment on WhatsApp</button>
        {sent && <p className="success">Your enrollment message is ready in WhatsApp.</p>}
        <p className="privacy">Your information is only placed into the WhatsApp message. This demo does not store participant details.</p>
      </form>
    </section>
  </main>
}

function NotFound() {
  return <main className="not-found"><Ornament>?</Ornament><h1>Page not found</h1><button className="button dark" onClick={() => go('/')}>Return home</button></main>
}

function SocialIcon({ type }) {
  const paths = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v6h4v-6h3.2l.8-4h-4V9c0-.7.3-1 1-1Z" fill="currentColor" stroke="none" />,
    youtube: <><path d="M21 8.2a2.8 2.8 0 0 0-2-2C17.2 5.7 12 5.7 12 5.7s-5.2 0-7 .5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.5 12 29 29 0 0 0 3 15.8a2.8 2.8 0 0 0 2 2c1.8.5 7 .5 7 .5s5.2 0 7-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-3.8 29 29 0 0 0-.5-3.8Z" /><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-7M12 13a3 3 0 0 1 6 0v4" /></>
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

function Footer() {
  return <footer id="contact">
    <div><Logo /><p>Faith-centered, practical learning for every stage of life.</p></div>
    <div><h4>Explore</h4><button onClick={() => go('/about')}>About Ruyah</button><button onClick={() => go('/programs')}>Programs</button><button onClick={() => go('/faq')}>FAQs</button><button onClick={() => go('/contact')}>Contact</button><button onClick={() => go('/enroll')}>Enrollment</button></div>
    <div className="footer-contact"><h4>Let’s talk</h4>
      <a className="contact-link" href={whatsappUrl('Assalamu alaikum, I would like to know more about Ruyah Institute.')} target="_blank" rel="noreferrer"><MessageCircleIcon aria-hidden="true" />Chat on WhatsApp</a>
      <a className="contact-link" href="tel:+918638854236"><PhoneIcon aria-hidden="true" />+91 863 885 4236</a>
      <a className="contact-link" href="mailto:hello@ruyahinstitute.com"><MailIcon aria-hidden="true" />hello@ruyahinstitute.com</a>
      <div className="social-links" aria-label="Ruyah social media">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Ruyah on Instagram"><SocialIcon type="instagram" /></a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Ruyah on Facebook"><SocialIcon type="facebook" /></a>
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="Ruyah on YouTube"><SocialIcon type="youtube" /></a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Ruyah on LinkedIn"><SocialIcon type="linkedin" /></a>
      </div>
    </div>
    <p className="copyright">© {new Date().getFullYear()} Ruyah Institute. Learning with purpose.</p>
  </footer>
}

function WhatsAppFloat() {
  return <a className="whatsapp" href={whatsappUrl('Assalamu alaikum, I would like to know more about Ruyah Institute.')} target="_blank" rel="noreferrer" aria-label="Chat with Ruyah on WhatsApp">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3A12.9 12.9 0 0 0 5.12 22.78L3.4 29l6.37-1.67A12.96 12.96 0 1 0 16.04 3Zm0 23.72a10.7 10.7 0 0 1-5.46-1.5l-.39-.23-3.78.99 1.01-3.68-.25-.38a10.72 10.72 0 1 1 8.87 4.8Zm5.88-8.03c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.71.16-.21.32-.82 1.05-1 1.27-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.64 9.64 0 0 1-1.78-2.21c-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.25-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" /></svg>
  </a>
}

function useScrollReveal(route) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const selectors = [
      '.section > .pill', '.section > h2', '.section > .lead',
      '.pillar', '.course-card', '.homeschool-copy > *',
      '.journey .steps > div', '.faq-heading', '.faq-list details',
      '.courses-page-hero > *', '.catalogue-intro > *',
      '.course-hero > *', '.detail-grid > *', '.detail-cta > *',
      '.enroll-intro > *', '.form-wrap form > *', '.standalone-hero > *',
      '.page-intro > *', '.contact-page-grid > *', 'footer > *'
    ]
    const nodes = [...document.querySelectorAll(selectors.join(','))]
    nodes.forEach((node, index) => {
      node.classList.add('scroll-reveal')
      node.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`)
    })
    document.documentElement.classList.add('motion-ready')

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -45px' })

    const frame = requestAnimationFrame(() => nodes.forEach(node => observer.observe(node)))
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [route])
}

function App() {
  const [, refresh] = useState(0)
  useEffect(() => { const change = () => refresh(x => x + 1); addEventListener('popstate', change); return () => removeEventListener('popstate', change) }, [])
  const path = location.pathname
  const content = useMemo(() => {
    if (path === '/') return <Home />
    if (path === '/about') return <AboutPage onNavigate={go} />
    if (path === '/programs' || path === '/courses') return <ProgramsPage courses={courses} onNavigate={go} makeWhatsAppUrl={whatsappUrl} />
    if (path === '/faq') return <FaqPage faqs={faqs} onNavigate={go} />
    if (path === '/contact') return <ContactPage makeWhatsAppUrl={whatsappUrl} />
    if (path === '/enroll') return <EnrollmentPage />
    if (path.startsWith('/course/')) return <CoursePage course={courses.find(c => c.id === path.split('/').pop())} />
    return <NotFound />
  }, [path, location.search])
  useScrollReveal(path)
  return <><Header />{content}<Footer /><WhatsAppFloat /></>
}

createRoot(document.getElementById('root')).render(<App />)
