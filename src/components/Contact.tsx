"use client";
import { Button } from "./ui/button";

export type ContactFormType = {
  email: string;
  subject: string;
  description: string;
};

const Contact = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a feature? Need
          details about our Business plan? Let us know.
        </p>

        <form className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full px-4 py-2 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
              placeholder="Let us know how we can help you"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className={`block px-4 py-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md shadow-sm border focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              placeholder="Let us know how we can help you"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className={`block px-4 py-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md shadow-sm border focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              placeholder="Let us know how we can help you"
            />
          </div>

          <Button type="submit" className="w-full">
            Send
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
