import { useEffect, useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion"
import { ChevronDown } from "lucide-react"
import config from "@/config"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Relative position of the transparent frame hole inside each body PNG
 * (measured from the generated 1024×1536 illustrations). The childhood
 * photo is placed *behind* the PNG so hands and frame edges stay on top.
 */
const HOLES = {
  groom: { left: 0.296, top: 0.152, right: 0.652, bottom: 0.4 },
  bride: { left: 0.362, top: 0.287, right: 0.648, bottom: 0.466 },
}

function Character({
  body,
  photo,
  hole,
  alt,
  frameY,
  frameRotate,
  entranceDelay,
  parallaxX,
  parallaxY,
}: {
  body: string
  photo: string
  hole: { left: number; top: number; right: number; bottom: number }
  alt: string
  frameY: MotionValue<number>
  frameRotate: MotionValue<number>
  entranceDelay: number
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
}) {
  return (
    <motion.div
      style={{ x: parallaxX, y: parallaxY }}
      className="relative h-full aspect-[2/3]"
    >
      {/* childhood photo — behind the body, showing through the frame hole */}
      <motion.div
        initial={{ opacity: 0, y: -26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: entranceDelay + 0.35, ease: EASE }}
        className="absolute inset-0"
      >
        <motion.div style={{ y: frameY, rotate: frameRotate }} className="absolute inset-0">
          <img
            src={photo}
            alt={alt}
            className="absolute object-cover"
            style={{
              left: `${hole.left * 100}%`,
              top: `${hole.top * 100}%`,
              width: `${(hole.right - hole.left) * 100}%`,
              height: `${(hole.bottom - hole.top) * 100}%`,
            }}
          />
        </motion.div>
      </motion.div>

      {/* illustrated body on top (hands & frame border cover the photo edges) */}
      <motion.img
        src={body}
        alt=""
        initial={{ opacity: 0, y: 34, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, delay: entranceDelay, ease: EASE }}
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
      />
    </motion.div>
  )
}

/** Script name revealed letter by letter */
function ScriptName({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.55, delay: delay + i * 0.045, ease: EASE }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

/**
 * HERO — Ghibli-style couple holding their real childhood photos.
 * Pointer parallax on fine-pointer devices; on scroll the frames sink,
 * the illustration dissolves and the grown-up portraits bloom into view.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  /* ── pointer parallax (desktop only) ─────────────────────── */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 })
  const groomPX = useTransform(sx, (v) => v * -14)
  const bridePX = useTransform(sx, (v) => v * 14)
  const bodyPY = useTransform(sy, (v) => v * 8)
  const glowX = useTransform(sx, (v) => v * 30)
  const glowY = useTransform(sy, (v) => v * 20)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my])

  /* ── scroll morph ────────────────────────────────────────── */
  const illoOpacity = useTransform(p, [0.3, 0.66], [1, 0])
  const illoBlur = useTransform(p, [0.3, 0.66], [0, 12])
  const illoFilter = useMotionTemplate`blur(${illoBlur}px)`
  const illoScale = useTransform(p, [0.3, 0.66], [1, 0.94])
  const groomDrift = useTransform(p, [0.3, 0.66], [0, -34])
  const brideDrift = useTransform(p, [0.3, 0.66], [0, 34])

  /* childhood photos sink gently into the frame */
  const frameY = useTransform(p, [0.24, 0.68], [0, 120])
  const frameRotL = useTransform(p, [0.24, 0.68], [0, -7])
  const frameRotR = useTransform(p, [0.24, 0.68], [0, 7])

  /* grown-up portraits bloom into view */
  const portraitOpacity = useTransform(p, [0.52, 0.85], [0, 1])
  const portraitScale = useTransform(p, [0.52, 0.95], [0.9, 1])
  const portraitY = useTransform(p, [0.52, 0.9], [44, 0])
  const portraitBlur = useTransform(p, [0.52, 0.82], [14, 0])
  const portraitFilter = useMotionTemplate`blur(${portraitBlur}px)`

  /* header + footer text */
  const topTextY = useTransform(p, [0, 0.38], [0, -50])
  const topTextOpacity = useTransform(p, [0, 0.32], [1, 0])
  const bottomTextY = useTransform(p, [0, 0.3], [0, 30])
  const bottomTextOpacity = useTransform(p, [0, 0.26], [1, 0])
  const cueOpacity = useTransform(p, [0, 0.1], [1, 0])

  const [tagline1, tagline2] = config.tagline.split("\n")

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-between overflow-hidden px-6 pb-8 pt-9 sm:pt-12">
        {/* warm glow that follows the pointer */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="pointer-events-none absolute left-1/2 top-[38%] h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(33_60%_80%/0.5),transparent)] blur-2xl"
        />

        {/* SAVE THE DATE */}
        <motion.div
          style={{ y: topTextY, opacity: topTextOpacity }}
          className="relative z-10 flex flex-col items-center gap-3"
        >
          <motion.span
            initial={{ opacity: 0, y: 14, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.42em" }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            className="eyebrow"
          >
            Save the Date
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
            className="gold-hairline w-28"
          />
        </motion.div>

        {/* ── the couple ─────────────────────────────────────── */}
        <div className="relative flex w-full max-w-lg flex-1 items-center justify-center">
          <motion.div
            style={{ opacity: illoOpacity, filter: illoFilter, scale: illoScale }}
            className="flex h-[44vh] max-h-[420px] min-h-[240px] items-center justify-center gap-1 sm:gap-4"
          >
            <motion.div style={{ x: groomDrift }} className="h-full">
              <Character
                body={config.hero.bodyGroom}
                photo={config.hero.childhoodGroom}
                hole={HOLES.groom}
                alt={`${config.couple.groomShort} as a child`}
                frameY={frameY}
                frameRotate={frameRotL}
                entranceDelay={0.8}
                parallaxX={groomPX}
                parallaxY={bodyPY}
              />
            </motion.div>
            <motion.div style={{ x: brideDrift }} className="h-full">
              <Character
                body={config.hero.bodyBride}
                photo={config.hero.childhoodBride}
                hole={HOLES.bride}
                alt={`${config.couple.brideShort} as a child`}
                frameY={frameY}
                frameRotate={frameRotR}
                entranceDelay={1.05}
                parallaxX={bridePX}
                parallaxY={bodyPY}
              />
            </motion.div>
          </motion.div>

          {/* grown-up portraits revealed on scroll */}
          <motion.div
            style={{
              opacity: portraitOpacity,
              scale: portraitScale,
              y: portraitY,
              filter: portraitFilter,
            }}
            className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-5"
          >
            {[config.hero.portraitGroom, config.hero.portraitBride].map((src, i) => (
              <div key={i} className="photo-frame w-[34vw] max-w-44 rounded-lg">
                <img
                  src={src}
                  alt={i === 0 ? config.couple.groom : config.couple.bride}
                  className="aspect-[3/4] w-full rounded-[5px] object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* date · tagline · names */}
        <motion.div
          style={{ y: bottomTextY, opacity: bottomTextOpacity }}
          className="relative z-10 flex flex-col items-center gap-1.5 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-body text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground"
          >
            {config.displayDate}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.7 }}
            className="font-serif text-lg italic text-ink/80 sm:text-xl"
          >
            “{tagline1} {tagline2}”
          </motion.p>
          <h1 className="mt-1 font-script text-5xl leading-tight text-ink sm:text-6xl">
            <ScriptName text={config.couple.brideShort} delay={1.85} />
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 2.35, ease: EASE }}
              className="mx-3 inline-block font-serif text-3xl italic text-gold sm:text-4xl"
            >
              &
            </motion.span>
            <ScriptName text={config.couple.groomShort} delay={2.45} />
          </h1>
        </motion.div>

        {/* scroll cue */}
        <motion.div style={{ opacity: cueOpacity }} className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-gold"
          >
            <span className="font-body text-[0.55rem] uppercase tracking-[0.35em]">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
