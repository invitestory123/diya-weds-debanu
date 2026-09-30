import config from "@/config"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"

/**
 * SECTION 7 · Family — elegant cards for both families.
 */
export default function Family() {
  const sides = [config.families.bride, config.families.groom]

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="With love, our families" title="The ones who raised us" />

      <div className="grid gap-8 sm:grid-cols-2">
        {sides.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.14}>
            <div className="photo-frame overflow-hidden rounded-2xl bg-ivory/80">
              <div className="overflow-hidden">
                <img
                  src={f.photo}
                  alt={f.title}
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                />
              </div>
              <div className="p-6 text-center sm:p-7">
                <span className="eyebrow !text-[0.58rem]">{f.label}</span>
                <h3 className="mt-1 font-script text-3xl text-ink">{f.title}</h3>
                <div className="gold-hairline mx-auto my-4 w-16" />
                <ul className="flex flex-col gap-2.5">
                  {f.members.map((m) => (
                    <li key={m.name}>
                      <p className="font-serif text-lg text-ink">{m.name}</p>
                      <p className="font-body text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                        {m.relation}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
