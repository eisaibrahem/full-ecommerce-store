const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-primary">
          &copy; {new Date().getFullYear()} Eistore. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
