import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/nosotros', label: 'Nosotros' },
]

export default function Navbar({ onCartOpen }) {
  const { count } = useCart()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/80 border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl tracking-tight">
          <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
          Café Aroma
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`transition-colors hover:text-accent ${
                location.pathname === l.to ? 'text-accent' : 'text-ink/70'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-full hover:bg-ink/5 transition"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-cream text-[10px] font-medium flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 rounded-full hover:bg-ink/5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-cream">
          <nav className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-3 text-sm">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-1"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
