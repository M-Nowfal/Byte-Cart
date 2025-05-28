
const Footer = () => {
  return (
    <footer className="mt-20">
      <footer className="footer sm:footer-horizontal bg-gray-900 p-10 text-white">
        <div className="flex justify-evenly w-full">
          <nav className="flex flex-col gap-3">
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav className="flex flex-col gap-3">
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav className="flex flex-col gap-3">
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
      </footer>
      <hr />
      <footer className="footer sm:footer-horizontal footer-center bg-gray-900 text-white p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by ByteCart Industries Ltd</p>
        </aside>
      </footer>
    </footer>
  );
}

export default Footer;