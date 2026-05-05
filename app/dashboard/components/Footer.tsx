const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6 px-8">
      <div className="flex flex-wrap justify-between items-center">
        <p className="text-sm">&copy; 2023 AI Mentor Platform. All rights reserved.</p>
        <div className="flex space-x-4 text-sm">
          <a href="/about" className="hover:text-blue-300">About</a>
          <a href="/privacy" className="hover:text-blue-300">Privacy</a>
          <a href="/terms" className="hover:text-blue-300">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

