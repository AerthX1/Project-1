const Footer = () => {
  return (
    <footer className="bg-[#0B1120] text-white px-8 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-green-500 text-2xl font-bold mb-2">Aearthex</h2>
          <p className="text-gray-300 mb-4">
            Your trusted partner in carbon offset, ESG reporting, and sustainable innovation.
          </p>
          <div className="text-sm space-y-1">
            <p className="flex items-center gap-2">
              <span>📧</span> aerthx01@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <span>📞</span> +91-98765-XXXX
            </p>
          </div>
          <div className="flex gap-4 mt-4 text-xl text-gray-400">
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Services</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>Carbon Footprint & Analysis</li>
            <li>Carbon Credit Project Development</li>
            <li>Mitigation and Reduction</li>
            <li>Life-Cycle Assessment</li>
            <li>ESG Reporting</li>
            <li>Carbon Trading</li>
            <li>Net Zero Strategy</li>
            <li>Membership Packages</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Stay Updated</h3>
          <p className="text-gray-300 text-sm mb-4">
            Get exclusive carbon market insights and updates directly in your inbox.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="e.g., name@example.com"
              className="px-4 py-2 rounded-l-md text-white w-full"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />
      <p className="text-center text-sm text-gray-400">
        © 2025 Aearthex. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
