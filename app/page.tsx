export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-bold text-yellow-400">
          Benis Restro
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-2xl">
          Delicious Food • Premium Taste • Family Restaurant
        </p>

        <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-bold">
          View Menu
        </button>
      </section>

      {/* About */}
      <section className="py-20 px-8 bg-gray-900">
        <h2 className="text-4xl font-bold text-center text-yellow-400">
          About Us
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-center text-gray-300">
          Welcome to Benis Restro. We serve fresh, hygienic and delicious food
          with excellent service. Our goal is to make every customer happy with
          quality food and a memorable dining experience.
        </p>
      </section>

      {/* Contact */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold text-yellow-400">
          Contact Us
        </h2>

        <p className="mt-6">📍 Your Restaurant Address</p>
        <p>📞 +91 XXXXX XXXXX</p>
        <p>✉️ your@email.com</p>
      </section>

    </main>
  );
}