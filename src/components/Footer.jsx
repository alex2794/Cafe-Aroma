export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-serif text-xl">Café Aroma</p>
          <p className="mt-2 text-muted max-w-xs">Café de especialidad tostado con cuidado. De la finca a tu taza.</p>
        </div>
        <div className="flex flex-col gap-2 text-muted">
          <p className="text-ink font-medium mb-1">Tienda</p>
          <a href="/tienda" className="hover:text-accent">Todos los cafés</a>
          <a href="/tienda?roast=Tueste+claro" className="hover:text-accent">Tueste claro</a>
          <a href="/tienda?roast=Tueste+oscuro" className="hover:text-accent">Tueste oscuro</a>
        </div>
        <div className="flex flex-col gap-2 text-muted">
          <p className="text-ink font-medium mb-1">Contacto</p>
          <p>hola@cafearoma.com</p>
          <p>+34 900 123 456</p>
          <p>Madrid, España</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-2">
          <p>© {new Date().getFullYear()} Café Aroma. Todos los derechos reservados.</p>
          <p>Hecho con ☕ y cuidado.</p>
        </div>
      </div>
    </footer>
  )
}
