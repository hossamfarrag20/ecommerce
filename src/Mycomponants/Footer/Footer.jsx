import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-white fixed bottom-0 start-0 end-0 shadow-sm dark:bg-gray-900 z-40">
        <div className="w-full max-w-screen-xl mx-auto py-5">
          <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
