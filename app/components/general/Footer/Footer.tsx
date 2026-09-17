import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-gray text-white pt-24 pb-14 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="flex flex-col gap-5">
          <Image
            src="/images/logo.png"
            alt="Panel MG"
            width={250}
            height={80}
            className="mb-8"
          />

          <p className="text-lg text-gray-300 font-medium font-inter">
            Síguenos en:
          </p>

          <div className="flex gap-5 mt-4">
            <Link
              href="https://www.facebook.com/profile.php?id=61589917446807&mibextid=wwXIfr&rdid=UBKP72GFHRIx6ofH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1JRGookPWF%2F%3Fmibextid%3DwwXIfr#"
              className="underline hover:text-gray-200 text-lg font-montserrat"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </Link>
            <span className="text-gray-400 text-lg">/</span>
            <Link
              href="https://www.youtube.com/@PanelMGM%C3%A9xico"
              className="underline hover:text-gray-200 text-lg font-montserrat"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </Link>
            <span className="text-gray-400 text-lg">/</span>
            <Link
              href="https://www.instagram.com/panelmg.mx"
              className="underline hover:text-gray-200 text-lg font-montserrat"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-6 text-2xl font-inter">
            Oficina Central
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed font-montserrat">
                Urbano Gómez 1300, La Joya, 44300 Guadalajara, Jal., Mexico.
              </p>
              <p className="text-base text-gray-300 leading-relaxed font-montserrat">
                Telefono: +52 3312986648
              </p>
              <p className="text-base text-gray-300 leading-relaxed font-montserrat">
                Email:{" "}
                <Link
                  href="mailto:direccion@panelmg.com.mx"
                  className="underline hover:text-gray-200"
                >
                  direccion@panelmg.com.mx
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-6 text-2xl font-inter">
            Contáctanos
          </h3>

          <div className="mb-8">
            <p className="text-lg text-gray-300 font-montserrat">
              Para productos
            </p>
            <Link
              href="mailto:ventas@panelmg.com.mx"
              className="text-lg underline hover:text-gray-200 block mt-1 font-montserrat"
            >
              ventas@panelmg.com.mx
            </Link>
          </div>

          <div>
            <p className="text-lg text-gray-300 font-montserrat">
              Para representación
            </p>
            <Link
              href="mailto:informacion@panelmg.com.mx"
              className="text-lg underline hover:text-gray-200 block mt-1 font-montserrat"
            >
              informacion@panelmg.com.mx
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 w-full mt-20 mb-8"></div>

      <div className="max-w-7xl mx-auto font-montserrat flex flex-col md:flex-row justify-between text-lg text-gray-300">
        <p>
          © {new Date().getFullYear()} PANEL MG — Sistema Constructivo. Todos
          los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
