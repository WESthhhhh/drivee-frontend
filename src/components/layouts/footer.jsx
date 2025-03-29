export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} Drivee. All rights reserved.
      </footer>
    );
  }