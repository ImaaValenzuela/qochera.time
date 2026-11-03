import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type City = { name: string; country: string; zone: string; code: string; accent: string }
const cities: City[] = [
  { name: 'Tijuana', country: 'México', zone: 'America/Tijuana', code: 'TIJ', accent: '#58e2bd' },
  { name: 'Guadalajara', country: 'México', zone: 'America/Mexico_City', code: 'GDL', accent: '#aa8cff' },
  { name: 'Madrid', country: 'España', zone: 'Europe/Madrid', code: 'MAD', accent: '#ffba65' },
  { name: 'Buenos Aires', country: 'Argentina', zone: 'America/Argentina/Buenos_Aires', code: 'BUE', accent: '#68b8ff' },
  { name: 'Cancún', country: 'México', zone: 'America/Cancun', code: 'CUN', accent: '#ff7da9' },
  { name: 'Minnesota', country: 'Estados Unidos', zone: 'America/Chicago', code: 'MSP', accent: '#f28e6b' },
]

const time = (date: Date, zone: string) => new Intl.DateTimeFormat('es-MX', { timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(date)
const date = (now: Date, zone: string) => new Intl.DateTimeFormat('es-MX', { timeZone: zone, weekday: 'short', day: '2-digit', month: 'short' }).format(now).replace('.', '')
const offset = (now: Date, zone: string) => new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'shortOffset' }).formatToParts(now).find((part) => part.type === 'timeZoneName')?.value.replace('GMT', 'UTC') ?? 'UTC'

function App() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const id = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(id) }, [])
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return <main className="shell">
    <header className="topbar"><a className="brand" href="/" aria-label="Qochera inicio"><span className="brand-mark">q</span><span>qochera<span className="brand-dot">.</span>time</span></a><div className="live"><span className="pulse" /> EN VIVO <span className="slash">/</span> {time(now, localZone)}</div></header>
    <section className="hero"><div className="eyebrow"><span className="eyebrow-line" /> EL RELOJ DE TU MUNDO</div><h1>Donde sea que estés,<br /><em>llegas a tiempo.</em></h1><p className="intro">Horarios precisos para moverte entre ciudades, coordinar equipos y mantener el ritmo.</p><div className="today">{new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now)} <span>·</span> actualizado cada segundo</div></section>
    <section className="grid" aria-label="Horarios por ciudad">{cities.map((city, index) => <article className={`clock-card ${index === 0 ? 'featured' : ''}`} key={city.zone} style={{ '--accent': city.accent } as React.CSSProperties}><div className="card-top"><span className="city-code">{city.code}</span>{city.zone === localZone && <span className="local-badge">TU HORA</span>}<span className="offset">{offset(now, city.zone)}</span></div><div className="city-info"><div><h2>{city.name}</h2><p>{city.country}</p></div><span className="sun" aria-hidden="true">{index === 2 || index === 4 ? '☼' : '◒'}</span></div><div className="clock">{time(now, city.zone)}</div><div className="card-bottom"><span>{date(now, city.zone)}</span><span className="zone-name">{city.zone.split('/').pop()?.replaceAll('_', ' ')}</span></div></article>)}</section>
    <footer><span className="footer-mark">Q</span><span>Tiempo que se mueve contigo.</span><span className="footer-right">Qochera <b>·</b> 2026</span></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
