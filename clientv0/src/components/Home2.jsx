import React,{useState} from 'react';
import { motion } from 'framer-motion'; // For animation

const Home = () => {
  return (
    <div className="font-sans bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section
        className="hero bg-cover bg-center text-white py-32 relative"
        style={{
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?art)',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-900 opacity-60"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg">
            Welcome to Aesthetica
          </h2>
          <p className="text-lg mb-8 text-white drop-shadow-lg">
            Discover the intersection of creativity and technology through art and NFTs.
          </p>
          <motion.a
            href="#nfts"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-2 px-6 rounded-lg transform transition-all hover:scale-110 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explore NFTs
          </motion.a>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">About Aesthetica</h3>
          <p className="text-lg leading-relaxed mb-8">
            Aesthetica is where technology meets art. Our platform showcases digital creations from talented artists around the world, offering immersive experiences and NFTs for collectors and art lovers alike.
          </p>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        id="gallery"
        className="bg-gray-50 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Art Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="relative group">
              <img
                src="https://imgs.search.brave.com/pTlUCXC-6LxUkQDJs1PUh4rB_m5LiHAQsYi7xXg-6nQ/rs:fit:500:0:0:0/g:ce/aHR0cDovL2Jsb2cu/ZnVuZ2libGVhcHBh/cmVsLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wMi9m/YXNoaW9uLTgwMHg0/ODYtMS53ZWJw"
                alt="Art 1"
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-all duration-300"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-lg"></div>
            </div>
            <div className="relative group">
              <img
                src="https://media.voguebusiness.com/photos/6064a74b41f12ae821db549d/1:1/w_2000,h_2000,c_limit/nfts-voguebus-teresa-manzo_fabricant-apr-21-story-inline-3.jpg"
                alt="Art 2"
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-all duration-300"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-lg"></div>
            </div>
            <div className="relative group">
              <img
                src="https://lh7-us.googleusercontent.com/docsz/AD_4nXeuw-ytb8LabIIorOp_3FM1tq22h6S6qwM1gbWs8WohE8pbzovl8Fd5svR3qidlGKj2MREWX8QcJg5ThzeYLwTGbAXx2AEM8XnPn84ObMuWFOWplQ7WhsMpS06iIKgrTMLKeoI95VJHfRBdA5uxOHr5OY8?key=VGlhbodKCmlNlg_2R1PVmQ"
                alt="Art 3"
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-all duration-300"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-lg"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* NFTs Section */}
      <motion.section
        id="nfts"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Exclusive NFTs</h3>
          <p className="text-lg mb-8">
            Own a piece of art from the most talented creators. Explore our NFT marketplace and buy exclusive digital art now.
          </p>
          <motion.a
            href="#nfts"
            className="bg-white text-purple-600 py-2 px-6 rounded-lg hover:bg-gray-100 transform transition-all hover:scale-110 duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explore NFTs
          </motion.a>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">What Our Users Say</h3>
          <div className="flex justify-center space-x-8">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <p className="text-lg mb-4">"Aesthetica revolutionized the way I view art. The NFT marketplace is the future!"</p>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">Digital Artist</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <p className="text-lg mb-4">"As a collector, this platform offers some of the most unique digital artwork available. Highly recommend!"</p>
              <p className="font-semibold">Jane Smith</p>
              <p className="text-sm text-gray-500">NFT Collector</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <p className="text-lg mb-4">"The community and creators here are amazing! I've been inspired every time I visit."</p>
              <p className="font-semibold">Michael Lee</p>
              <p className="text-sm text-gray-500">Art Enthusiast</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Meet the Team Section */}
      <motion.section
        id="team"
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Meet the Team</h3>
          <div className="flex justify-center space-x-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs">
              <img src="https://via.placeholder.com/150" alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h4 className="font-semibold text-lg">Alice Johnson</h4>
              <p className="text-sm text-gray-500">CEO & Founder</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs">
              <img src="https://via.placeholder.com/150" alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h4 className="font-semibold text-lg">Ethan Taylor</h4>
              <p className="text-sm text-gray-500">Creative Director</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs">
              <img src="https://via.placeholder.com/150" alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h4 className="font-semibold text-lg">Maya Williams</h4>
              <p className="text-sm text-gray-500">Lead Developer</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
          <p className="text-lg leading-relaxed mb-8">
            Have any questions or inquiries? Get in touch with our team.
          </p>
          <form className="max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
              rows="5"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transform transition-all hover:scale-105 duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Aesthetica. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
