export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-10">
      <p>© {new Date().getFullYear()} Blood Donor App</p>
      <p className="text-sm text-gray-400">Saving lives, one donation at a time</p>
    </footer>
  );
}
