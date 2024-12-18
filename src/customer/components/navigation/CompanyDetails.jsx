// src/components/CompanyDetails.js
import React from "react";

const CompanyDetails = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Sevariya</h1>
      <p style={styles.text}>
        Welcome to <strong>Sevariya.com</strong>, your trusted online store for all things [Category/Products]. 
        At Sevariya, we aim to redefine your shopping experience by offering an extensive range of high-quality 
        products combined with seamless customer service.
      </p>
      <p style={styles.text}>
        Established in 2024, Sevariya was built on the principles of trust, reliability, and innovation. 
        Whether you're shopping for the latest gadgets, trendy fashion, or household essentials, we have 
        you covered with unbeatable deals and fast delivery.
      </p>
      <p style={styles.text}>
        Customer satisfaction is at the heart of everything we do. Our mission is to provide you with 
        exceptional products and support to make your shopping journey enjoyable and secure. 
        Your happiness is our success!
      </p>
      <div style={styles.infoSection}>
        <h3>Contact Us:</h3>
        <ul style={styles.list}>
          <li>Email: <a href="mailto:support@sevariya.com" style={styles.link}>support@sevariya.com</a></li>
          <li>Phone: +91 xxxx-xxx-xxx</li>
          <li>Address: 123 Main Street, Hometown, India</li>
        </ul>
      </div>
      <div style={styles.socials}>
        <h3>Follow Us:</h3>
        <a
          href="https://facebook.com/sevariya"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          Facebook
        </a>{" "}
        |{" "}
        <a
          href="https://instagram.com/sevariya"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          Instagram
        </a>{" "}
        |{" "}
        <a
          href="https://twitter.com/sevariya"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          Twitter
        </a>{" "}
        |{" "}
        <a
          href="https://linkedin.com/company/sevariya"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

// Inline CSS styles for simplicity
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  text: {
    marginBottom: "15px",
    fontSize: "16px",
    color: "#555",
  },
  infoSection: {
    marginTop: "20px",
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
  },
  list: {
    listStyle: "none",
    paddingLeft: "0",
  },
  socials: {
    marginTop: "20px",
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: "#007BFF",
    fontWeight: "bold",
  },
};

export default CompanyDetails;
