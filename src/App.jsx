import { useEffect, useRef, useState } from 'react'
import weddingIllustration from '../assets/andrew-clara-illustration.png'
import weddingSong from '../assets/life-with-you-seph-schlueter.mp3'

const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Heliopolis+Evangelical+Church+18+Cleopatra+Almazah+Heliopolis+Cairo'
const PARTY_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Rival+Open+Air+Hotel+Entrance+Tulip+from+Suez+Rd+Cairo+Governorate+4751020'
const WEDDING_TIMESTAMP = new Date('2026-11-11T17:30:00+02:00').getTime()

function getCountdown() {
  const remaining = Math.max(0, WEDDING_TIMESTAMP - Date.now())
  return {
    complete: remaining === 0,
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  }
}

function Monogram({ small = false }) {
  return (
    <span className={small ? 'monogram monogram--small' : 'monogram'} aria-label="Andrew and Clara">
      <span>A</span><i>&</i><span>C</span>
    </span>
  )
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M20 10c0 5.2-8 11-8 11S4 15.2 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [countdown, setCountdown] = useState(getCountdown)
  const [showAfterParty] = useState(
    () => new URLSearchParams(window.location.search).get('i') === 't',
  )
  const detailsRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!opened) return
    const timer = window.setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 1050)
    return () => window.clearTimeout(timer)
  }, [opened])

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const openInvitation = () => {
    setOpened(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.55
      if (audioRef.current.currentTime < 11) audioRef.current.currentTime = 11
      audioRef.current.play().catch(() => {})
    }
  }

  return (
    <main className={opened ? 'invitation is-open' : 'invitation'}>
      <audio
        ref={audioRef}
        src={weddingSong}
        preload="metadata"
        loop
        onLoadedMetadata={(event) => { event.currentTarget.currentTime = 11 }}
      />

      <section className="hero hero--illustrated" aria-label="Wedding invitation cover">
        <img
          className="hero__photo"
          src={weddingIllustration}
          alt="Sepia illustration of a bride and groom standing arm in arm"
        />
        <div className="hero__shade" />

        <header className="hero__header">
          <Monogram small />
          <span className="hero__eyebrow">Wedding invitation</span>
          <span className="hero__time">11.11.26 · 5:30 PM</span>
        </header>

        <div className="hero__word hero__word--left" aria-hidden="true">TOGETHER</div>
        <div className="hero__word hero__word--right" aria-hidden="true">FOREVER</div>

        <div className="hero__names" aria-hidden={opened}>
          <p>With joyful hearts</p>
          <h1><span>Andrew</span><i>&</i><span>Clara</span></h1>
          <small>invite you to celebrate their marriage</small>
        </div>

        <div className="envelope-stage">
          {!opened && (
            <button className="open-prompt" onClick={openInvitation} type="button">
              <span>Open the invitation</span>
              <ArrowIcon />
            </button>
          )}

          <button className="envelope" type="button" onClick={openInvitation} aria-label="Open Andrew and Clara's wedding invitation">
            <span className="envelope__back" />
            <span className="envelope__letter">
              <small>You are invited</small>
              <strong>Andrew <i>&</i> Clara</strong>
              <em>5:30 PM</em>
            </span>
            <span className="envelope__front" />
            <span className="envelope__flap" />
            <span className="envelope__foil" aria-hidden="true">
              <small>Wedding invitation</small>
              <strong>Andrew <i>&</i> Clara</strong>
            </span>
            <span className="wax-seal"><Monogram small /></span>
          </button>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span />
          <small>Scroll to discover</small>
        </div>
      </section>

      <section ref={detailsRef} className="details" id="details">
        <div className="details__ornament" aria-hidden="true">✦</div>
        <p className="kicker">Two lives, one promise</p>
        <h2>Andrew <i>&</i> Clara</h2>
        <p className="details__intro">
          Together with their families, joyfully invite you to witness the beginning of their forever.
        </p>

        <div className="date-countdown">
          <time className="date-countdown__date" dateTime="2026-11-11T17:30:00+02:00">
            <small>Wednesday</small>
            <strong>11</strong>
            <span>November · 2026</span>
          </time>
          <div className="countdown" aria-label="Countdown to the wedding">
            <p>Counting down to forever</p>
            {countdown.complete ? (
              <strong className="countdown__complete">The celebration has begun</strong>
            ) : (
              <div className="countdown__units">
                {[
                  ['Days', countdown.days],
                  ['Hours', countdown.hours],
                  ['Minutes', countdown.minutes],
                  ['Seconds', countdown.seconds],
                ].map(([label, value]) => (
                  <span className="countdown__unit" key={label}>
                    <strong>{String(value).padStart(2, '0')}</strong>
                    <small>{label}</small>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="details__rule"><span>A</span><i /><span>C</span></div>

        <div className={showAfterParty ? 'event-grid event-grid--with-party' : 'event-grid'}>
          <article>
            <span className="event-grid__index">01</span>
            <p className="kicker">The ceremony</p>
            <h3>At half past five<br />in the evening</h3>
            <time>5:30 PM</time>
          </article>

          <article>
            <span className="event-grid__index">02</span>
            <p className="kicker">The place</p>
            <h3>Heliopolis<br />Evangelical Church</h3>
            <address>18 Cleopatra, Almazah<br />Heliopolis, Cairo</address>
          </article>

          {showAfterParty && (
            <article className="event-grid__party">
              <span className="event-grid__index">03</span>
              <p className="kicker">The after-party</p>
              <h3>Rival<br />Open Air</h3>
              <p className="event-grid__timing">Right after church</p>
              <address>Hotel Entrance, Tulip, from Suez Rd<br />Cairo Governorate 4751020</address>
            </article>
          )}
        </div>

        <div className={showAfterParty ? 'location-links location-links--split' : 'location-links'}>
          <a className="map-link" href={MAP_URL} target="_blank" rel="noreferrer">
            <PinIcon />
            <span>
              <small>Ceremony location</small>
              <strong>Heliopolis Evangelical Church</strong>
            </span>
            <ArrowIcon />
          </a>
          {showAfterParty && (
            <a className="map-link map-link--party" href={PARTY_MAP_URL} target="_blank" rel="noreferrer">
              <PinIcon />
              <span>
                <small>After-party location</small>
                <strong>Rival Open Air</strong>
              </span>
              <ArrowIcon />
            </a>
          )}
        </div>
      </section>

      <section className="scripture" aria-labelledby="scripture-reference">
        <div className="scripture__frame">
          <div className="scripture__cord" aria-hidden="true">
            <span /><span /><span />
          </div>
          <p className="kicker" id="scripture-reference">Ecclesiastes 4:9–12</p>
          <blockquote>
            “Two are better than one…<br />
            A cord of <em>three strands</em> is not quickly broken.”
          </blockquote>
          <div className="scripture__mark" aria-hidden="true">✦</div>
        </div>
      </section>

      <section className="closing">
        <div className="closing__frame">
          <p className="kicker">Save the moment</p>
          <h2>We cannot wait<br />to celebrate <i>with you.</i></h2>
          <Monogram />
          <p className="closing__place">Heliopolis · Cairo</p>
        </div>
      </section>

      <footer>
        <Monogram small />
        <p>Made with love for Andrew & Clara</p>
        <a href="#details">Details</a>
      </footer>
    </main>
  )
}
