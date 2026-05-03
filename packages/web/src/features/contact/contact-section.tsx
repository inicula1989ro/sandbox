import {
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon,
} from '@/components/icons/social-icons'
import type { Translation } from '@/constants/i18n'

export interface ContactSectionProps {
  t: Translation
}

export function ContactSection({ t }: ContactSectionProps) {
  return (
    <section id="contact" className="contact">
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        <em>{t.contact.title}</em>
      </h2>
      <p className="section-intro" style={{ margin: '1.5rem auto 2.5rem', textAlign: 'center' }}>
        {t.contact.sub}
      </p>
      <div className="socials">
        <a
          href="https://www.instagram.com/evostudiomd"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://www.facebook.com/evostudio.md"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://wa.me/37378367347"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon />
        </a>
        <a
          href="https://t.me/evostudiomd"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="Telegram"
        >
          <TelegramIcon />
        </a>
        <a href="tel:+37378367347" className="social-link" aria-label="Phone">
          <PhoneIcon />
        </a>
      </div>

      <div className="contact__row">
        <iframe
          className="contact__map"
          src="https://maps.google.com/maps?q=Strada%20Nicolae%20Starostenco%2025%20Chi%C8%99in%C4%83u&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t.contact.map_label}
        />
        <div className="contact__info">
          <h3>{t.booking.info_title}</h3>
          <div className="info-block">
            <strong>{t.booking.hours_h}</strong>
            <p style={{ whiteSpace: 'pre-line' }}>{t.booking.hours}</p>
          </div>
          <div className="info-block">
            <strong>{t.booking.address_h}</strong>
            <p style={{ whiteSpace: 'pre-line' }}>{t.booking.address}</p>
          </div>
          <div className="info-block">
            <strong>{t.booking.phone_h}</strong>
            <p>
              <a href="tel:+37378367347">{t.booking.phone_v}</a>
            </p>
          </div>
          <div className="info-block">
            <strong>{t.booking.email_h}</strong>
            <p>
              <a href="mailto:hello@evostudio.md">{t.booking.email_v}</a>
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>{t.contact.rights}</span>
        <span>hello@evostudio.md · +373 78 367 347</span>
      </footer>
    </section>
  )
}
