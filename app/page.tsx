import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen bg-gray-50 text-gray-900">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Modern ERP System with LHDN e-Invoice Integration
            </h1>
            <p className="mt-6 text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Streamline your business operations with an all-in-one platform
              for HR, invoicing, sales, catalogue management, and multi-company
              support.
            </p>

            <div className="mt-10 flex justify-center space-x-4">
              <Link
                href="#features"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100"
              >
                Explore Features
              </Link>
              <Link
                href="/demo"
                className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
              Powerful Modules Designed For Your Business
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {/* LHDN e-Invoice */}
              <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-4">LHDN e-Invoice</h3>
                <p className="text-gray-600">
                  Fully compliant with Malaysia’s LHDN e-Invoicing requirements.
                  Auto-generate, submit, validate, and store invoices
                  seamlessly.
                </p>
              </div>

              {/* HR Admin */}
              <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-4">
                  HR Administration
                </h3>
                <p className="text-gray-600">
                  Handle employee records, leave, attendance, payroll
                  integration, and performance management in one place.
                </p>
              </div>

              {/* Quotation System */}
              <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-4">
                  Quotation Management
                </h3>
                <p className="text-gray-600">
                  Generate, track, and convert quotations into invoices or sales
                  orders with ease.
                </p>
              </div>

              {/* Catalogue */}
              <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-4">
                  Catalogue Management
                </h3>
                <p className="text-gray-600">
                  Maintain product listings, pricing, stock levels, variants,
                  and categories with multi-warehouse support.
                </p>
              </div>

              {/* Multi-company */}
              <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-4">
                  Multi-Company Support
                </h3>
                <p className="text-gray-600">
                  Manage multiple entities with individual tax profiles,
                  reporting, and permissions in a single dashboard.
                </p>
              </div>

              {/* Integration */}
              <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-4">
                  API & System Integration
                </h3>
                <p className="text-gray-600">
                  Connect with accounting software, inventory systems, and
                  external services through powerful REST APIs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-blue-600 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
            Get a personalized demo and see how our ERP can automate your
            workflow.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold shadow hover:bg-gray-100"
            >
              Contact Us
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 bg-gray-900 text-gray-400 text-center">
          <p>
            © {new Date().getFullYear()} Your ERP Company. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
