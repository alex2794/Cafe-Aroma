import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Truck, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const featured = products.filter((p) => p.featured).slice(0, 3)

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-muted">Especialidad · Tueste fresco</p>
            <h1 className="mt-5 font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight">
              El café que<br />merece tu <span className="italic text-accent">pausa</span>.
            </h1>
            <p className="mt-6 text-muted max-w-md leading-relaxed">
              Seleccionamos granos de origen único, los tostamos en pequeños lotes y los enviamos
              frescos a tu puerta. Minimalista en el método, generoso en sabor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/tienda" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-accent transition">
                Comprar ahora <ArrowRight size={16} />
              </Link>
              <Link to="/nosotros" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line hover:border-ink transition">
                Nuestra historia
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-bg">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80"
                alt="Café de especialidad"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-cream border border-line rounded-2xl px-5 py-4 shadow-lg">
              <p className="text-xs text-muted uppercase tracking-wider">Origen destacado</p>
              <p className="font-serif text-lg mt-0.5">Ethiopia Yirgacheffe</p>
              <p className="text-xs text-muted">Jazmín · Bergamota</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line bg-bg/40">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-3 gap-8 text-sm">
          {[
            { icon: Leaf, title: 'Origen único', desc: 'Granos trazables de pequeñas fincas.' },
            { icon: Truck, title: 'Entrega fresca', desc: 'Tostado y enviado en 48 horas.' },
            { icon: ShieldCheck, title: 'Garantía de sabor', desc: 'Si no te convence, te devolvemos el dinero.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-cream border border-line flex items-center justify-center shrink-0">
                <Icon size={18} className="text-accent" />
              </div>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-muted mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">Selección</p>
            <h2 className="mt-3 font-serif text-4xl">Nuestros favoritos</h2>
          </div>
          <Link to="/tienda" className="hidden sm:inline-flex items-center gap-1 text-sm text-accent hover:underline">
            Ver toda la tienda <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-24">
        <div className="rounded-[2rem] bg-ink text-cream p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="font-serif text-3xl md:text-4xl">Únete al club</h2>
            <p className="mt-3 text-cream/70 text-sm leading-relaxed">
              Recibe noticias de nuevos orígenes, recetas y un 10% en tu primer pedido.
            </p>
          </div>
          <form className="w-full md:w-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="tu@email.com"
              className="px-5 py-3 rounded-full bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-accent-2 min-w-[220px]"
            />
            <button className="px-6 py-3 rounded-full bg-accent-2 text-ink font-medium hover:opacity-90 transition">
              Suscribir
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
