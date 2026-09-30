import { Clock, Shirt, Sparkles, Heart, PartyPopper, Calendar, MapPin } from "lucide-react"
import config, { type WeddingEvent } from "@/config"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"

const EVENT_ICONS = [Sparkles, Heart, PartyPopper]

/**
 * SECTION 4 · Wedding Events & Details — Ashirbad, Wedding, Reception & dress code.
 */
export default function Details() {
  const d = config.details
  const events: WeddingEvent[] = config.events && config.events.length > 0
    ? config.events
    : [
        {
          title: d.ceremony.title,
          date: config.displayDate,
          time: d.ceremony.time,
          venue: d.ceremony.venue,
          note: d.ceremony.note,
          badge: "Ceremony",
        },
      ]

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="Wedding Itinerary" title="Celebration & Events" />

      <div className={`grid gap-6 sm:gap-8 ${events.length === 1 ? "mx-auto max-w-md" : events.length === 2 ? "mx-auto max-w-3xl sm:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
        {events.map((evt, idx) => {
          const Icon = EVENT_ICONS[idx % EVENT_ICONS.length]
          return (
            <Reveal key={evt.title + evt.date} delay={idx * 0.12}>
              <div className="group photo-frame flex h-full flex-col justify-between rounded-2xl bg-ivory/80 p-6 sm:p-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                <div>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-cream transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </div>

                  {evt.badge && (
                    <span className="eyebrow inline-block rounded-full bg-cream px-3 py-1 text-[0.6rem] !tracking-[0.2em] text-gold border border-gold/20 mb-2">
                      {evt.badge}
                    </span>
                  )}

                  <h3 className="font-serif text-2xl text-ink">{evt.title}</h3>

                  <div className="mx-auto my-3 flex items-center justify-center gap-1.5 text-ink/80">
                    <Calendar className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                    <span className="font-body text-xs font-medium">{evt.date}</span>
                  </div>

                  <div className="mx-auto my-2 flex items-center justify-center gap-1.5 text-gold">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span className="font-body text-xs uppercase tracking-[0.15em] font-medium">{evt.time}</span>
                  </div>

                  <div className="mt-3 flex items-start justify-center gap-1.5 text-ink/75 font-body text-xs font-light leading-relaxed">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gold mt-0.5" strokeWidth={1.5} />
                    <span>{evt.venue}</span>
                  </div>
                </div>

                {evt.note && (
                  <p className="mt-4 border-t border-gold/15 pt-3 font-body text-xs font-light italic text-muted-foreground">
                    {evt.note}
                  </p>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.25} className="mt-10">
        <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-full border border-gold/25 bg-ivory/70 px-6 py-3 shadow-sm">
          <Shirt className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
          <p className="text-center font-body text-xs uppercase tracking-[0.16em] text-ink/75">
            {d.dressCode}
          </p>
        </div>
      </Reveal>
    </section>
  )
}