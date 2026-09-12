import { useState, useEffect } from 'react';
import './Home.css';

// WhatsApp Icon Component
const WhatsAppIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    className="whatsapp-icon"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.075-.124-.277-.198-.574-.347z"/>
    <path d="M12.045 2.008c-5.516 0-9.984 4.468-9.984 9.984 0 1.764.457 3.424 1.253 4.869L2.045 22.02l5.386-1.414c1.37.744 2.93 1.166 4.614 1.166 5.516 0 9.984-4.468 9.984-9.984s-4.468-9.984-9.984-9.984zm0 18.444c-1.536 0-2.96-.396-4.211-1.084l-3.022.792.807-2.948c-.775-1.355-1.219-2.928-1.219-4.604 0-4.68 3.806-8.486 8.486-8.486s8.486 3.806 8.486 8.486-3.806 8.486-8.486 8.486z"/>
  </svg>
);

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handlePlaceOrder = (productName, productPrice) => {
    const phoneNumber = "+254726471291";
    const priceText =
      !productPrice || String(productPrice).toLowerCase().includes("request")
        ? "Price available upon request"
        : `KSh ${productPrice}`;

    const message = `Hello Philorenda Metal Works,\n\nI would like to place an order/inquire about the following product:\n\n*Product:* ${productName}\n*Price:* ${priceText}\n\nPlease let me know about delivery arrangements and payment details. Thank you!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Loading state
  if (loading) {
    return (
      <div className="home-page">
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <div className="hero-badge">
              <span className="badge-pulse"></span> Industrial Grade Metal Fabrication
            </div>
            <h1 className="hero-title">Philorenda Metal Works</h1>
            <p className="hero-subtitle">Loading our catalog...</p>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="home-page">
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <h1 className="hero-title">Philorenda Metal Works</h1>
            {/* <p className="hero-subtitle error">Error: {error}</p> */}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-badge">
            <span className="badge-pulse"></span> Industrial Grade Metal Fabrication
          </div>
          <h1 className="hero-title">Philorenda Metal Works</h1>
          <p className="hero-subtitle">
            Premium Engineering & Machinery Manufacturing. From high-output construction machinery to custom architectural fittings.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Request Quote</a>
            <a href="#catalog-explore" className="btn-secondary">Explore Catalog</a>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="catalog-explore" className="catalog-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tagline">OUR PRODUCTS</span>
            <h2>Explore Our Machinery & Products</h2>
          </div>

          {items.length === 0 ? (
            <p className="no-products">No fabricated items yet. The admin can add some later.</p>
          ) : (
            <div className="catalog-display-panel">
              <div className="product-cards-grid">
                {items.map((item) => (
                  <div key={item._id} className="product-card">
                    <div className="product-image-container">
                      {/* Only show image if it exists, otherwise leave blank */}
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="product-image"
                        />
                      ) : (
                        <div className="blueprint-fallback-placeholder">
                          {/* Intentionally left blank for backend images */}
                        </div>
                      )}

                      <div className="home-image-text-overlay">
                        <span className="home-overlay-delivery">Free delivery within Nairobi</span>
                        <span className="home-overlay-brand">A product of PMW</span>
                      </div>
                      <div className="product-orange-status">PMW Certified</div>
                    </div>

                    <div className="product-details">
                      <h3 className="product-name">{item.name}</h3>

                      {item.category && (
                        <p className="product-category">{item.category}</p>
                      )}

                      {item.description && (
                        <p className="product-description">{item.description}</p>
                      )}

                      <hr className="card-faint-divider" />

                      <div className="view-specifications-row">
                        <a href="#contact" className="specifications-link">
                          <span>View Specifications</span>
                          <svg className="spec-arrow" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>

                      <hr className="card-faint-divider" />

                      <div className="product-price price-on-request">
                        {/* {item.price ? `KSh ${item.price}` : "Price Available Upon Request"} */}
                        {"Price Available Upon Request"}
                      </div>

                      <div className="product-actions">
                        <button
                          className="btn-place-order"
                          onClick={() => handlePlaceOrder(item.name, item.price)}
                        >
                          <WhatsAppIcon />
                          Order via WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;