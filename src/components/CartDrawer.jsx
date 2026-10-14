import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, subtotal, count, clear } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-cream shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <h2 className="font-serif text-xl">Tu carrito</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-ink/5" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted gap-3">
              <p className="font-serif text-lg text-ink">Carrito vacío</p>
              <p className="text-sm">Añade un café para empezar.</p>
              <Link to="/tienda" onClick={onClose} className="mt-2 text-sm text-accent underline">
                Ver tienda
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {items.map((i) => (
                <li key={i.id} className="py-4 flex gap-4">
                  <img src={i.image} alt={i.name} className="w-20 h-24 object-cover rounded-xl bg-bg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-serif leading-tight">{i.name}</p>
                        <p className="text-xs text-muted">{i.roast}</p>
                      </div>
                      <p className="text-sm font-medium">€{(i.price * i.qty).toFixed(2)}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-line rounded-full px-2">
                        <button onClick={() => updateQty(i.id, i.qty - 1)} className="p-1 hover:text-accent"><Minus size={14} /></button>
                        <span className="text-sm w-5 text-center">{i.qty}</span>
                        <button onClick={() => updateQty(i.id, i.qty + 1)} className="p-1 hover:text-accent"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => removeItem(i.id)} className="text-muted hover:text-accent p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-6 py-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal ({count} artículos)</span>
              <span className="font-medium">€{subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted">Envío calculado en el checkout.</p>
            <button className="w-full py-3 rounded-full bg-accent text-cream font-medium hover:opacity-90 transition">
              Finalizar compra
            </button>
            <button onClick={clear} className="w-full py-2 text-xs text-muted hover:text-accent">
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
