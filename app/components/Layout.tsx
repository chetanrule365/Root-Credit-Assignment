import { motion } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen text-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <img
        src="/assets/background-illustration.svg"
        alt="background illustration"
        className="fixed top-0 left-0 -z-10 h-full w-full object-cover"
      />
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-8 h-full">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="px-8 w-full md:w-1/2 flex flex-col justify-between"
        >
          <div className="relative z-10 max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">
              Let&apos;s get started
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl">
              Create your account
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-500">
              Follow the steps to create your account
            </p>
          </div>

          <img
            src="/assets/account-type-illustration.svg"
            alt="Account creation illustration"
            className="mx-auto rounded-[28px] object-contain hidden md:block"
          />
        </motion.section>

        {children}
      </div>
    </main>
  );
}