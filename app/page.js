import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-6">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/liquid.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-black/60" />

        <section className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-12 text-center shadow-2xl backdrop-blur-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            We Build Digital Power
          </h1>
          <p className="mt-5 text-base text-neutral-300 md:text-lg">
            Premium websites crafted with clarity and performance.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
          >
            Start Your Project
          </button>
        </section>
      </main>

      <div id="about" />
      <div id="careers" />
      <div id="case-studies" />
      <div id="services" />
      <div id="contact" />
    </>
  );
}
