export default function Footer() {
    return (
      <footer className="bg-primary text-white p-4 text-center bg-[url('../images/footer.png')] bg-cover bg-center">
        © {new Date().getFullYear()} Drivee. All rights reserved.
      </footer>
    );
  }
