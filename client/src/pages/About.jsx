export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl mx-auto p-6 sm:p-12 ">
        <div>
          <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white my-6">
            About Blog-Mingle
          </h1>

          <div className="text-md text-gray-600 dark:text-gray-300 flex flex-col gap-6">
            <p className="leading-relaxed text-justify">
              Welcome to Blog-Mingle, created by Vinay Patel. This platform serves as a space for sharing
              insights, tutorials, and discussions on all things related to technology, programming, and software
              development. As a passionate aspiring developer, Vinay aims to bring fresh perspectives, useful tips,
              and hands-on tutorials to help learners and professionals alike.
            </p>

            <p className="leading-relaxed text-justify">
              Whether you're just starting in the world of coding or you're looking to stay up to date with the latest
              trends in web development, you'll find something here for you. Topics range from in-depth technical
              tutorials on popular frameworks to insights on industry best practices, coding tips, and career guidance.
              Vinay constantly explores emerging technologies, so expect new and exciting content on a regular basis.
            </p>

            <p className="leading-relaxed text-justify">
              Blog-Mingle isn’t just about reading articles – it’s about building a community. We encourage you to engage
              with the content by leaving comments, sharing your thoughts, and joining the conversation. Feel free to like
              and respond to others' comments to foster meaningful discussions and help each other grow in this ever-evolving
              field.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
