import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'

const ADDRESS = 'Sankaralinganar Rd, behind Camford International School, Manikarampalayam, Ganapathy, Coimbatore, Tamil Nadu 641006'
const PHONE = '095977 71851'
const PHONE_LINK = '+919597771851'
const MAP_SEARCH =
  'https://www.google.com/maps/search/?api=1&query=Luxe%20Pets%20Club%20Pet%20Boarding%20Grooming%20Swimming%20Dog%20Park%2C%20Sankaralinganar%20Rd%2C%20Ganapathy%2C%20Coimbatore%20641006';

const MAP_EMBED =
  'https://maps.google.com/maps?q=Luxe%20Pets%20Club%20Pet%20Boarding%20Grooming%20Swimming%20Dog%20Park%2C%20Sankaralinganar%20Rd%2C%20Ganapathy%2C%20Coimbatore%20641006&output=embed';

const images = {
  hero: '/images/hero-dog.jpg',
  boarding: '/images/boarding-room.jpg',
  grooming: '/images/grooming (1).jpg',
  swimming: '/images/swimming.jpg',
  park: '/images/dog-park.jpg',
  play: '/images/dogs-playing.jpg',
}

type IconName = 'paw' | 'bed' | 'scissors' | 'waves' | 'tree' | 'heart' | 'sparkle' | 'arrow' | 'phone' | 'pin' | 'clock' | 'calendar' | 'menu' | 'close' | 'chevron' | 'check' | 'instagram' | 'quote' | 'star' | 'leaf'

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const shapes: Record<IconName, ReactNode> = {
    paw: <><ellipse cx="12" cy="16.4" rx="4.1" ry="3.2"/><ellipse cx="5.6" cy="10.8" rx="1.8" ry="2.5"/><ellipse cx="10.3" cy="7.6" rx="1.8" ry="2.5"/><ellipse cx="15.8" cy="7.8" rx="1.8" ry="2.5"/><ellipse cx="19.6" cy="11.2" rx="1.8" ry="2.5"/></>,
    bed: <><path d="M3 19v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 15h18M6 10V7a2 2 0 0 1 2-2h3v5m2 0V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3M3 19v2m18-2v2"/></>,
    scissors: <><circle cx="6" cy="6" r="2.6"/><circle cx="6" cy="18" r="2.6"/><path d="m8.2 7.6 11 9.2M8.2 16.4l11-9.2M14 12l6 6"/></>,
    waves: <><path d="M2 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 14c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/></>,
    tree: <><path d="M12 21v-8m0 0 4-4m-4 4-4-4"/><path d="M12 3 8.5 6.5l2.1 2.1L7 12.2l2.4 2.4h5.2l2.4-2.4-3.6-3.6 2.1-2.1L12 3Z"/></>,
    heart: <><path d="M20.8 8.7c0 5.2-8.8 10.3-8.8 10.3S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></>,
    sparkle: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z"/></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
    phone: <><path d="M7 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2l-5-2-2 3a14 14 0 0 1-6-6l3-2-2-5Z"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    chevron: <><path d="m7 10 5 5 5-5"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    quote: <><path d="M10 11H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6l-3 6m13-7h-5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6l-3 6"/></>,
    star: <><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></>,
    leaf: <><path d="M20 4c-8 0-14 2-14 9a7 7 0 0 0 7 7c7 0 9-8 7-16Z"/><path d="M4 21c3-5 7-8 12-11"/></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...common}>{shapes[name]}</svg>
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  return <div className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

const routes = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our Space', href: '/our-space' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Brand() {
  return <a className="brand" href="/" aria-label="Luxe Pets Club home"><img src="/images/luxe-logo.png" alt="" /><span className="brand-name">LUXE PETS <i>CLUB</i></span></a>
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [current])
  return <header className="site-header">
    <div className="nav-shell">
      <Brand />
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {routes.map((route) => <a key={route.href} href={route.href} className={current === route.href ? 'active' : ''} aria-current={current === route.href ? 'page' : undefined} onClick={() => setOpen(false)}>{route.label}</a>)}
      </nav>
      <a className="button button-primary nav-book" href="/contact#enquiry">Book a Stay <Icon name="arrow" size={16} /></a>
      <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} size={21} /></button>
    </div>
    {open && <div id="mobile-menu" className="mobile-menu">{routes.map((route) => <a key={route.href} href={route.href} onClick={() => setOpen(false)}>{route.label}<Icon name="arrow" size={16} /></a>)}<a className="button button-primary" href="/contact#enquiry" onClick={() => setOpen(false)}>Book a Stay <Icon name="arrow" size={16} /></a></div>}
  </header>
}

function Eyebrow({ children, icon = 'leaf' }: { children: ReactNode; icon?: IconName }) {
  return <div className="eyebrow"><Icon name={icon} size={15} /><span>{children}</span></div>
}

function PageIntro({ label, title, subtitle, align = 'center' }: { label: string; title: ReactNode; subtitle?: string; align?: 'left' | 'center' }) {
  return <div className={`page-intro align-${align}`}><Eyebrow>{label}</Eyebrow><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
}

const services = [
  { number: '01', title: 'Pet Boarding', description: 'Safe, comfortable and caring stays for your pets.', image: images.boarding, icon: 'bed' as const, href: '/services#boarding', imageAlt: 'A dog relaxing in a bright, comfortable boarding space' },
  { number: '02', title: 'Professional Grooming', description: 'Gentle grooming to keep your pets clean, fresh and happy.', image: images.grooming, icon: 'scissors' as const, href: '/services#grooming', imageAlt: 'A calm dog receiving gentle grooming care' },
  { number: '03', title: 'Swimming', description: 'A fun and refreshing experience designed for active pets.', image: images.swimming, icon: 'waves' as const, href: '/services#swimming', imageAlt: 'A happy dog swimming in a clean pet pool' },
  { number: '04', title: 'Dog Park', description: 'A spacious environment for exercise, play and social time.', image: images.park, icon: 'tree' as const, href: '/services#dog-park', imageAlt: 'Dogs playing in a spacious green dog park' },
]

function ServiceCards() {
  return <div className="service-grid">{services.map((service, index) => <Reveal key={service.number} className="service-reveal" delay={index * 90}><a href={service.href} className="service-card">
    <div className="service-image-wrap"><img src={service.image} alt={service.imageAlt} loading="lazy" /><span className="service-number">{service.number}</span></div>
    <div className="service-card-body"><span className="icon-disc"><Icon name={service.icon} size={19} /></span><div><h3>{service.title}</h3><p>{service.description}</p><span className="text-link">Explore <Icon name="arrow" size={16} /></span></div></div>
  </a></Reveal>)}</div>
}

function SectionHeading({ eyebrow, title, copy, link }: { eyebrow: string; title: ReactNode; copy?: string; link?: { label: string; href: string } }) {
  return <div className="section-heading"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{link && <a className="text-link section-link" href={link.href}>{link.label}<Icon name="arrow" size={16} /></a>}</div>
}

function HomePage() {
  return <>
    <main>
      <section className="home-hero page-wrap">
        <div className="hero-copy"><Eyebrow icon="paw">A little more love, every day</Eyebrow><h1>Where Every Pet<br /><em>Feels at Home.</em></h1><p>Premium boarding, grooming, swimming and playtime designed around the comfort, safety and happiness of your pets.</p><div className="hero-actions"><a className="button button-primary" href="/contact#enquiry">Book a Stay <Icon name="arrow" size={16} /></a><a className="button button-quiet" href="/services">Explore Services <Icon name="arrow" size={16} /></a></div><div className="hero-note"><span className="note-avatars"><i>✦</i><i>♡</i><i>⌂</i></span><span>Thoughtful care, made for them</span></div></div>
        <div className="hero-visual"><img className="hero-photo" src={images.hero} alt="A happy dog relaxing in a bright, spacious pet-care environment" fetchPriority="high" /><div className="hero-photo-shade" /><div className="hero-location"><span className="location-dot" /> Illustrative pet-care photography</div><div className="hero-badge badge-top"><span className="badge-icon"><Icon name="heart" size={18} /></span><span><strong>Safe &amp; Caring</strong><small>Made to feel like home</small></span></div><div className="hero-badge badge-bottom"><span className="badge-icon"><Icon name="sparkle" size={18} /></span><span><strong>Fully Air-Conditioned</strong><small>A clean, comfortable stay</small></span></div><div className="hero-tag"><Icon name="paw" size={15} /> Pet-Friendly Space</div></div>
      </section>

      <section className="section-block services-section page-wrap"><SectionHeading eyebrow="Good days, all in one place" title={<>Everything They Need,<br /><em>All in One Place.</em></>} copy="Room to rest, time to play, and thoughtful care in between." link={{ label: 'View all services', href: '/services' }} /><ServiceCards /></section>

      <section className="why-section"><div className="why-inner page-wrap"><Reveal className="why-image"><img src={images.boarding} alt="Clean and comfortable indoor space for pets" loading="lazy" /><div className="image-caption"><Icon name="leaf" size={16} /><span>Room to relax. Space to be themselves.</span></div><div className="image-index">01 <i>—</i> A calm, cared-for stay</div></Reveal><Reveal className="why-copy"><Eyebrow icon="heart">The Luxe difference</Eyebrow><h2>Care That Goes<br />Beyond <em>the Stay.</em></h2><p>Comfort is in the little things: a clean space, a kind hello, and room for every pet to settle in at their own pace.</p><div className="benefit-list"><div><span className="benefit-icon"><Icon name="heart" /></span><span><strong>Experienced Care</strong><small>Attentive support for every stay.</small></span></div><div><span className="benefit-icon"><Icon name="sparkle" /></span><span><strong>Clean &amp; Comfortable</strong><small>A thoughtfully maintained space.</small></span></div><div><span className="benefit-icon"><Icon name="tree" /></span><span><strong>Spacious Environment</strong><small>Spacious surroundings for pets to play.</small></span></div><div><span className="benefit-icon"><Icon name="paw" /></span><span><strong>Pet-Friendly Atmosphere</strong><small>A welcoming place to feel at home.</small></span></div></div><a className="text-link" href="/about">Get to know us <Icon name="arrow" size={16} /></a></Reveal></div></section>

      <ReviewsSection />
      <FinalCta />
    </main>
  </>
}

const reviews = [
  { name: 'Aarthi Libert', text: 'Really happy with the care and attention they give to the dogs. The staff are kind, caring, and genuinely love what they do. Our dog was happy and well taken care of throughout the stay. Highly recommended for anyone looking for a safe and trustworthy boarding place!' },
  { name: 'Gobinath Chinnu', text: 'We recently visited Luxe Pets Club with our pets and were really impressed with the place. The ambience is excellent — very spacious, clean, well maintained and fully air-conditioned.' },
  { name: 'Ashwin AG', text: 'Reasonable price.' },
]

function ReviewsSection() {
  return <section className="reviews-section section-block page-wrap"><SectionHeading eyebrow="Kind words from pet parents" title={<>Loved by Pets.<br /><em>Trusted by Pet Parents.</em></>} /><div className="review-overview"><div className="rating-score"><strong>5.0</strong><span className="rating-stars" aria-label="5 out of 5 stars">★★★★★</span><small>4 Google Reviews</small></div></div><div className="review-grid">{reviews.map((review, index) => <Reveal key={review.name} delay={index * 80}><article className="review-card"><Icon name="quote" size={22} /><p>“{review.text}”</p><div className="review-author"><span className="author-mark">{review.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><strong>{review.name}</strong></div></article></Reveal>)}</div></section>
}

function FinalCta() {
  return <section className="final-cta page-wrap"><img src={images.play} alt="Dogs enjoying playtime in a bright, spacious pet-friendly lounge" loading="lazy" /><div className="final-cta-shade" /><div className="final-cta-content"><Eyebrow icon="paw">A happier kind of stay</Eyebrow><h2>Your Pet Deserves<br /><em>the Best.</em></h2><p>Give them a place to stay, play, relax and feel at home.</p><a className="button button-light" href="/contact#enquiry">Book a Stay <Icon name="arrow" size={16} /></a></div></section>
}

const serviceSections = [
  { id: 'boarding', number: '01', label: 'Pet Boarding', title: "A Comfortable Stay While You're Away.", description: "Give your pet a safe, comfortable and caring place to stay while you're away.", points: ['Comfortable accommodation', 'Clean environment', 'Caring staff', 'Spacious surroundings', 'Air-conditioned space'], image: images.boarding, alt: 'A comfortable boarding room for pets', icon: 'bed' as const, action: 'Book Boarding', reverse: false },
  { id: 'grooming', number: '02', label: 'Professional Grooming', title: 'Fresh, Clean & Feeling Their Best.', description: 'Gentle care to help your pet feel fresh, comfortable and happy.', points: ['Bathing', 'Grooming', 'Coat care', 'General hygiene'], image: images.grooming, alt: 'A dog enjoying gentle grooming', icon: 'scissors' as const, action: 'Book Grooming', reverse: true },
  { id: 'swimming', number: '03', label: 'Swimming', title: 'Play. Splash. Repeat.', description: 'A fun and refreshing experience designed for active pets.', points: ['A refreshing change of pace', 'A joyful way to stay active'], image: images.swimming, alt: 'A happy dog taking a refreshing swim', icon: 'waves' as const, action: 'Ask About Swimming', reverse: false },
  { id: 'dog-park', number: '04', label: 'Dog Park', title: 'Room to Run & Play.', description: 'A spacious environment for exercise, play and social time.', points: ['Space to move', 'Time for play'], image: images.park, alt: 'Dogs enjoying open-air play in a green park', icon: 'tree' as const, action: 'Ask About the Dog Park', reverse: true },
]

function ServiceDetail({ service }: { service: typeof serviceSections[number] }) {
  return <section id={service.id} className={`service-detail ${service.reverse ? 'reverse' : ''}`}><Reveal className="detail-photo"><img src={service.image} alt={service.alt} loading="lazy" /><span className="detail-number">{service.number}</span><span className="photo-label"><Icon name={service.icon} size={15} /> {service.label}</span></Reveal><Reveal className="detail-copy"><Eyebrow icon={service.icon}>{service.number} / {service.label}</Eyebrow><h2>{service.title}</h2><p>{service.description}</p><ul className="check-list">{service.points.map((point) => <li key={point}><span><Icon name="check" size={15} /></span>{point}</li>)}</ul><a className="button button-primary" href="/contact#enquiry">{service.action} <Icon name="arrow" size={16} /></a></Reveal></section>
}

function ServicesPage() {
  return <main className="subpage services-page page-wrap"><PageIntro label="A little something for every pet" title={<>Our <em>Services</em></>} subtitle="Thoughtfully designed experiences for happier, healthier pets." /><div className="service-details">{serviceSections.map((service) => <ServiceDetail key={service.id} service={service} />)}</div><div className="soft-contact-strip"><span><Icon name="heart" size={20} /> Have questions? Contact us</span><a className="text-link" href="/contact">Contact us <Icon name="arrow" size={16} /></a></div></main>
}

const gallery = [
  { label: 'Boarding area', image: images.boarding, alt: 'A calm, comfortable pet boarding room', className: 'gallery-tall' },
  { label: 'Dogs playing', image: images.play, alt: 'Two dogs playing together in a spacious indoor lounge', className: 'gallery-wide' },
  { label: 'Grooming', image: images.grooming, alt: 'A groomer tending to a calm dog', className: '' },
  { label: 'Swimming', image: images.swimming, alt: 'A dog swimming in a clean pet pool', className: '' },
  { label: 'Dog park', image: images.park, alt: 'Dogs playing together in a green outdoor area', className: 'gallery-wide' },
  { label: 'Indoor spaces', image: images.hero, alt: 'Bright, welcoming pet-care interior', className: 'gallery-tall' },
]

function SpacePage() {
  const comforts = [
    { title: 'Spacious environment', copy: 'Plenty of room for pets to relax, move and play.', icon: 'tree' as const },
    { title: 'Clean & comfortable', copy: 'A thoughtfully maintained environment designed around pet comfort.', icon: 'sparkle' as const },
    { title: 'Fully air-conditioned', copy: 'Comfortable indoor spaces for a relaxed stay.', icon: 'waves' as const },
    { title: 'Play & activity', copy: 'Dedicated experiences for pets to stay active and happy.', icon: 'heart' as const },
  ]
  return <main className="subpage space-page page-wrap"><PageIntro label="A peek around the club" title={<>More Than a Stay.<br /><em>A Place to Feel at Home.</em></>} subtitle="Thoughtful spaces, made for their comfort and joy." /><div className="comfort-grid">{comforts.map((item, index) => <Reveal key={item.title} delay={index * 65}><article className="comfort-card"><span className="icon-disc"><Icon name={item.icon} size={20} /></span><h3>{item.title}</h3><p>{item.copy}</p></article></Reveal>)}</div><div className="gallery-header"><Eyebrow icon="paw">Life at Luxe</Eyebrow><h2>A space for their <em>kind of happy.</em></h2></div><p className="gallery-note">Representative imagery; photos may not depict the Luxe Pets Club premises.</p><div className="space-gallery">{gallery.map((item, index) => <Reveal key={item.label} className={`gallery-item ${item.className}`} delay={index * 45}><div className="gallery-image"><img src={item.image} alt={item.alt} loading="lazy" /><span className="gallery-zoom"><Icon name="arrow" size={17} /></span></div><span className="gallery-caption">{item.label}</span></Reveal>)}</div><FinalCta /></main>
}

function AboutPage() {
  const approach = [
    { title: 'Comfort', copy: 'A welcoming place to settle in.', icon: 'bed' as const },
    { title: 'Care', copy: 'Kind attention in the everyday.', icon: 'heart' as const },
    { title: 'Safety', copy: 'A thoughtful space for peace of mind.', icon: 'leaf' as const },
    { title: 'Play', copy: 'Room for joyful moments.', icon: 'tree' as const },
  ]
  return <main className="subpage about-page page-wrap"><section className="about-hero"><Reveal className="about-copy"><Eyebrow icon="paw">A club made for pets</Eyebrow><h1>Built Around<br /><em>Their Happiness.</em></h1><p>At Luxe Pets Club, we believe pets deserve more than just a place to stay. We create a safe, comfortable and welcoming environment where pets can relax, play and receive the care they deserve.</p><a className="button button-primary" href="/contact#enquiry">Come say hello <Icon name="arrow" size={16} /></a></Reveal><Reveal className="about-image"><img src={images.play} alt="Dogs sharing a happy moment in a bright pet-friendly space" loading="lazy" /><span className="about-image-note"><Icon name="heart" size={17} /> Their comfort comes first</span></Reveal></section><section className="approach-section"><SectionHeading eyebrow="Our approach" title={<>Thoughtful care, <em>in every detail.</em></>} /><div className="approach-grid">{approach.map((item, index) => <Reveal key={item.title} delay={index * 60}><article className="approach-card"><span className="approach-icon"><Icon name={item.icon} size={21} /></span><span className="approach-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article></Reveal>)}</div></section><section className="business-card"><div className="business-card-top"><div><Eyebrow icon="leaf">Come visit us</Eyebrow><h2>A little place for<br /><em>big tail wags.</em></h2></div><span className="business-mark"><img src="/images/luxe-logo.png" alt="" /></span></div><div className="business-info-grid"><div className="business-info"><span className="info-icon"><Icon name="paw" /></span><span><strong>LUXE PETS CLUB</strong><small>Pet Boarding · Grooming · Swimming · Dog Park</small></span></div><div className="business-info"><span className="info-icon"><Icon name="pin" /></span><span><strong>Find us</strong><small>{ADDRESS}</small><a className="text-link" href={MAP_SEARCH} target="_blank" rel="noreferrer">Get Directions <Icon name="arrow" size={15} /></a></span></div><div className="business-info"><span className="info-icon"><Icon name="phone" /></span><span><strong>Call us</strong><a href={`tel:${PHONE_LINK}`}>{PHONE}</a></span></div><div className="business-info"><span className="info-icon"><Icon name="clock" /></span><span><strong>Opening</strong><small>Open from 1st October 2026</small><small>Open · closes at 7:00 PM</small></span></div></div></section></main>
}

function ContactPage() {
  const [formValues, setFormValues] = useState({ parent: '', phone: '', pet: '', type: '', service: '', date: '', message: '' })
  const update = (field: keyof typeof formValues, value: string) => setFormValues((current) => ({ ...current, [field]: value }))
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const enquiry = [
      `Hello Luxe Pets Club, I'm ${formValues.parent}.`,
      `Phone: ${formValues.phone}`,
      `Pet: ${formValues.pet} (${formValues.type})`,
      `Service: ${formValues.service}`,
      `Preferred date: ${formValues.date}`,
      formValues.message ? `Message: ${formValues.message}` : '',
    ].filter(Boolean).join('\n')
    window.location.href = `sms:${PHONE_LINK}?body=${encodeURIComponent(enquiry)}`
  }
  const today = new Date().toISOString().slice(0, 10)
  return <main className="subpage contact-page page-wrap"><PageIntro label="We're here for you both" title={<>Let's Take Care<br /><em>of Them.</em></>} subtitle="Planning a stay, grooming session or a fun day at the club? Get in touch with us." /><div className="contact-layout"><section className="contact-form-card" id="enquiry"><div className="form-intro"><Eyebrow icon="paw">Send us an enquiry</Eyebrow><h2>Tell us a little<br />about your <em>pet.</em></h2><p>On supported devices, Send Enquiry opens a pre-filled SMS you can review before sending.</p></div><form onSubmit={handleSubmit}><div className="form-row"><label>Pet Parent Name<input name="parent" value={formValues.parent} onChange={(event) => update('parent', event.target.value)} placeholder="Your name" autoComplete="name" required /></label><label>Phone Number<input name="phone" value={formValues.phone} onChange={(event) => update('phone', event.target.value)} type="tel" placeholder="Your phone number" autoComplete="tel" required /></label></div><div className="form-row"><label>Pet Name<input name="pet" value={formValues.pet} onChange={(event) => update('pet', event.target.value)} placeholder="Your pet's name" required /></label><label>Pet Type<select name="type" value={formValues.type} onChange={(event) => update('type', event.target.value)} required><option value="" disabled>Select pet type</option><option>Dog</option><option>Other pet</option></select></label></div><div className="form-row"><label>Service Required<select name="service" value={formValues.service} onChange={(event) => update('service', event.target.value)} required><option value="" disabled>Select a service</option><option>Pet Boarding</option><option>Grooming</option><option>Swimming</option><option>Dog Park</option></select></label><label>Preferred Date<input name="date" value={formValues.date} onChange={(event) => update('date', event.target.value)} type="date" min={today} required /></label></div><label>Message <span className="optional-label">Optional</span><textarea name="message" value={formValues.message} onChange={(event) => update('message', event.target.value)} placeholder="Anything you'd like us to know?" rows={4} /></label><button className="button button-primary form-submit" type="submit">Send Enquiry <Icon name="arrow" size={16} /></button><small className="form-note">On supported devices, this opens a pre-filled SMS to Luxe Pets Club. If it does not open, use the Call Now link.</small></form></section><aside className="contact-aside"><div className="contact-aside-top"><Eyebrow icon="leaf">The door is open</Eyebrow><h2>We'd love<br />to meet <em>you.</em></h2><p>Reach out with a question or come see the club for yourself.</p><a className="button button-primary call-now-button" href={`tel:${PHONE_LINK}`}>Call Now <Icon name="phone" size={15} /></a></div><a className="contact-method" href={`tel:${PHONE_LINK}`}><span className="contact-method-icon"><Icon name="phone" /></span><span><small>Call us</small><strong>{PHONE}</strong></span><Icon name="arrow" size={17} /></a><a className="contact-method address-method" href={MAP_SEARCH} target="_blank" rel="noreferrer"><span className="contact-method-icon"><Icon name="pin" /></span><span><small>Visit us</small><strong>{ADDRESS}</strong></span><Icon name="arrow" size={17} /></a><div className="hours-note"><Icon name="clock" size={17} /><span>Open from 1st October 2026<br /><strong>Open · closes at 7:00 PM</strong></span></div></aside></div><section className="map-section"><div className="map-copy"><Eyebrow icon="pin">Find your way</Eyebrow><h2>Just around<br /><em>the corner.</em></h2><p>{ADDRESS}</p><a className="button button-primary" href={MAP_SEARCH} target="_blank" rel="noreferrer">Get Directions <Icon name="arrow" size={16} /></a></div><div className="map-frame"><iframe title="Map showing Luxe Pets Club in Coimbatore" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a className="map-open-link" href={MAP_SEARCH} target="_blank" rel="noreferrer">Open map <Icon name="arrow" size={14} /></a></div></section></main>
}

function Footer() {
  return <footer className="site-footer"><div className="footer-main page-wrap"><div className="footer-brand-col"><Brand /><p>Pet Boarding · Grooming<br />Swimming · Dog Park</p><span className="footer-tagline">A place for pets to feel at home.</span><small className="image-disclosure">Photography is illustrative and may not depict the Luxe Pets Club premises.</small></div><div className="footer-column"><h3>Explore</h3>{routes.map((route) => <a href={route.href} key={route.href}>{route.label}</a>)}</div><div className="footer-column"><h3>Get in touch</h3><a href={`tel:${PHONE_LINK}`}>{PHONE}</a><a href={MAP_SEARCH} target="_blank" rel="noreferrer">Sankaralinganar Rd,<br />behind Camford International School,<br />Manikarampalayam, Ganapathy,<br />Coimbatore, Tamil Nadu 641006</a></div><div className="footer-column footer-social"><h3>Say hello</h3><a href="https://www.instagram.com/luxepetsclub/" target="_blank" rel="noreferrer"><Icon name="instagram" size={16} /> Instagram</a><a href={MAP_SEARCH} target="_blank" rel="noreferrer"><Icon name="pin" size={16} /> Google Business</a><a href={`tel:${PHONE_LINK}`}><Icon name="phone" size={16} /> Call Now</a></div></div><div className="footer-bottom page-wrap"><span>© 2026 Luxe Pets Club. All rights reserved.</span><span>Made with care, for pets &amp; their people.</span></div></footer>
}

function MobileQuickActions() {
  return <div className="mobile-quick-actions"><a href={`tel:${PHONE_LINK}`}><Icon name="phone" size={16} /> Call Now</a><a href="/contact#enquiry"><Icon name="paw" size={16} /> Book a Stay</a></div>
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const page = pathname === '/services' ? <ServicesPage /> : pathname === '/our-space' ? <SpacePage /> : pathname === '/about' ? <AboutPage /> : pathname === '/contact' ? <ContactPage /> : <HomePage />
  useEffect(() => { document.documentElement.lang = 'en' }, [])
  return <><Header current={pathname} />{page}<Footer /><MobileQuickActions /></>
}
