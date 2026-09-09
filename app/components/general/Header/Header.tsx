"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Productos", href: "/productos" },
  { label: "Distribuidores", href: "/distribuidores" },
  { label: "Fotogalería", href: "/fotogaleria" },
  { label: "Proceso Constructivo", href: "/proceso-constructivo" },
  { label: "Ventajas del Panel MG", href: "/ventajas" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-dark-gray text-white border-b border-neutral-800">
      <div className="mx-auto max-w-[1440px] px-6 xl:px-8 flex items-center h-30 gap-6 xl:gap-10">
        {/* LOGO */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Panel MG"
            width={250}
            height={50}
            priority
            className="cursor-pointer"
          />
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex flex-1 justify-end items-center gap-4 xl:gap-6 2xl:gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative text-sm xl:text-md font-inter uppercase whitespace-nowrap hover:text-red transition"
              whileHover={{ scale: 1.02 }}
            >
              {item.label}
              <motion.span
                className="absolute left-0 -bottom-1 h-0.5 w-full bg-red origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}

          {/* BOTÓN */}
          <a
            href="/contacto"
            className="bg-red hover:bg-red/90 text-md font-semibold px-4 py-2 rounded-md transition"
          >
            Contacto
          </a>
        </nav>

        {/* BOTÓN MOBILE */}
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden bg-neutral-900 px-6 py-4 space-y-4"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-sm font-medium text-neutral-300 hover:text-red transition"
            >
              {item.label}
            </a>
          ))}

          <a
            href="/contacto"
            className="block bg-red hover:bg-red/90 text-sm font-semibold px-4 py-2 rounded-md transition text-center"
          >
            Contacto
          </a>
        </motion.div>
      )}
    </header>
  );
}
