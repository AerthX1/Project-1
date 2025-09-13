import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { useSelector } from "react-redux";

const ContactFormPage = ({ userType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "",
    timeline: "",
    notes: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Send to /send-inquiry instead of old /send route
   const response = await axios.post(`${API_URL}/contact/send-inquiry`, {
  ...formData,
  project: project.title,
  userType: user?.type,   // "Individual" or "Organization"
  userId: user?._id,      // logged-in user ID
});
    if (response.data.success) {
      alert("Your inquiry has been sent! We'll be in touch shortly.");
      navigate(-1);
    }
  } catch (err) {
    console.error("Error submitting inquiry form:", err);
    alert("Something went wrong. Please try again later.");
  }
};


  if (!project)
    return (
      <div className="text-center mt-10 text-red-500">
        Project data not found.
      </div>
    );

  const leaves = Array.from({ length: 20 }, (_, i) => (
    <FaLeaf key={i} className={`leaf leaf-${i}`} />
  ));

  return (
    <div className="contact-page">
   
      <style>{`
        .contact-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to bottom, #e0f7e9, #c8f0dc);
          position: relative;
          overflow: hidden;
          padding: 2rem;
        }
        .form-container {
          position: relative;
          z-index: 10;
          background: #fff;
          border-radius: 2rem;
          max-width: 600px;
          width: 100%;
          padding: 3rem 2rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          border-top: 6px solid #22c55e;
        }
        .form-container h3 {
          font-size: 2rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .form-container p {
          text-align: center;
          color: #4b5563;
          margin-bottom: 2rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        input, select, textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #d1d5db;
          font-size: 1rem;
          transition: all 0.3s;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          outline: none;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        button {
          background-color: #16a34a;
          color: white;
          padding: 0.8rem 2rem;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          align-self: center;
        }
        button:hover {
          background-color: #15803d;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        /* Leaf animation */
        .leaf {
          position: absolute;
          color: #16a34a;
          font-size: 1.2rem;
          animation-name: fall;
          animation-duration: 8s;
          animation-iteration-count: infinite;
          opacity: 0.6;
        }
        @keyframes fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        ${Array.from({ length: 20 }, (_, i) => `
          .leaf-${i} {
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            font-size: ${Math.random() * 20 + 12}px;
          }
        `).join("")}
      `}</style>

      {/* Leaves */}
      {leaves}

      <div className="form-container">
   <button
  type="button"
  onClick={() => navigate(-1)}
  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 font-bold text-xl shadow-md  hover:text-white transition-all duration-300"
>
  ×
</button>


        <h3>High-Volume Carbon Credit Inquiry</h3>
        <p>
          Interested in a large purchase for <strong>{project.title}</strong>? Fill out this form and we'll contact you directly.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            {userType === "Organization" && (
              <div>
                <label>Company/Organization</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Corp."
                  required
                />
              </div>
            )}
          </div>

          <div className="grid-2">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label>Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          {userType === "Organization" && (
            <div className="grid-2">
              <div>
                <label>Desired Quantity (tons)</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="100"
                  min="1"
                  required
                />
              </div>
              <div>
                <label>Purchase Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select timeline</option>
                  <option value="instant">Instant</option>
                  <option value="1-3">1-3 Months</option>
                  <option value="3-6">3-6 Months</option>
                  <option value="6-12">6-12 Months</option>
                  <option value="12+">More than 12 Months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label>Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Include any specific requirements or questions..."
            />
          </div>

          <button type="submit">Send Inquiry</button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormPage;
