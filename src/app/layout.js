import "./globals.css";

export const metadata = {
  title: "Image Conversion Tool",
  description: "Convert images to different formats like PNG, JPEG, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}