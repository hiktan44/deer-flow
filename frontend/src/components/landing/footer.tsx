import { useMemo } from "react";

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="container-md mx-auto mt-32 flex flex-col items-center justify-center">
      <hr className="from-border/0 to-border/0 m-0 h-px w-full border-none bg-linear-to-r via-white/20" />
      <div className="text-muted-foreground container flex h-20 flex-col items-center justify-center text-sm">
        <p className="text-center font-serif text-lg md:text-xl">
          &quot;Açık kaynaktan doğdu, açık kaynağa geri verir.&quot;
        </p>
      </div>
      <div className="text-muted-foreground container mb-4 flex flex-col items-center justify-center text-xs">
        <p>MIT Lisansı ile lisanslanmıştır</p>
        <p>&copy; {year} DeerFlow</p>
      </div>
      <div className="mb-8 flex flex-col items-center justify-center gap-1 text-center">
        <p className="text-muted-foreground text-xs">
          Açık kaynaklı MIT lisanslı uygulama{" "}
          <span className="font-semibold text-white/90">Thirdhand</span>{" "}
          tarafından düzenlenerek yapılmıştır
        </p>
        <a
          href="https://www.thirdhand.com.tr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
        >
          www.thirdhand.com.tr
        </a>
      </div>
    </footer>
  );
}
