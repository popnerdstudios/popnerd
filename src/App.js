import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ReactComponent as Logo } from './logo.svg';
import { YouTubeEmbed  } from 'react-social-media-embed';
import { useForm, ValidationError } from '@formspree/react';
import './App.css';

import { FaBars, FaAngleDown, FaCode, FaRobot, FaCube, FaPalette, FaShoppingCart, FaLinkedin, FaDiscord, FaYoutube, FaGithub, FaTwitter, FaInstagram} from 'react-icons/fa';
import { Link } from 'react-scroll';

function Box() {
  const myMesh = useRef();
  const [color, setColor] = useState("#D3A376"); // Default color

  useEffect(() => {
    // Function to update color based on CSS variable
    const updateColor = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--secondary-color').trim();
      setColor(primaryColor);
    };

    updateColor(); // Initial update

    // Optional: Set up an observer to listen for changes to CSS variables
    // You might need this if the color changes are not triggering a re-render
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    // Clean up the observer on unmount
    return () => observer.disconnect();
  }, []);

  useFrame(({ clock }) => {
    myMesh.current.rotation.x = clock.getElapsedTime();
    myMesh.current.rotation.y = clock.getElapsedTime();
  });

  return (
    <mesh ref={myMesh}>
      <torusKnotGeometry args={[200, 60, 200, 320]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

const CameraUpdater = ({ fov }) => {
  const { camera } = useThree();
  const targetFovRef = useRef(fov);
  const currentFovRef = useRef(camera.fov);

  useEffect(() => {
    targetFovRef.current = fov;
  }, [fov]);

  useFrame(() => {
    // Interpolate FOV
    if (currentFovRef.current !== targetFovRef.current) {
      const delta = (targetFovRef.current - currentFovRef.current) * 0.1; // Easing factor
      currentFovRef.current += delta;
      camera.fov = currentFovRef.current;
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

function ContactForm() {
  const [state, handleSubmit] = useForm("mrgngqow");
  
  if (state.succeeded) {
    return <p className="success-message">Thanks for joining!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label htmlFor="email" className="form-label">
        EMAIL ADDRESS
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        className="email-input"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
        className="email-error"
      />
      <label htmlFor="message"  className="form-label">
        MESSAGE
      </label>
      <textarea
        id="message"
        name="message"
        className="form-input"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
        className="message-error"
      />
      <button type="submit" disabled={state.submitting} className="submit-button">
        SUBMIT
      </button>
    </form>
  );
}


function App() {
  const colorLists = [
    ['#000000', '#FF2A2A', '#ECEBF3'],
    ['#e13048', '#3850FF', '#F9EAE1'],
    ['#3c00ff', '#ff00b3', '#ffffff'],
    ['#F7E3AF', '#D3A376', '#965A2F'],
    ['#ECEBF3', '#121212', '#8a8a8a'],
    ['#5ca8ff', '#ff75dd', '#ffffff'],
  ];

  const colorSchemeTexts = [
    "Bubblegum",
    "PopNerd Studio",
    "PopNerd Classic",
    "Synth",
    "Crème",
    "2099",
  ];

  const [currentIndex, setCurrentIndex] = useState(1); 
  const [popEffect, setPopEffect] = useState(false);
  const [pixelRatio] = useState(window.devicePixelRatio);
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverEnter = () => {
    setIsHovered(true);
  };
  
  const handleHoverLeave = () => {
    setIsHovered(false);
  };

  const handleLogoClick = () => {
    setPopEffect(true); // Apply the pop effect
    setTimeout(() => setPopEffect(false), 200); // Remove it after 200ms

    // Get the current color list based on the current index
    const currentColorList = colorLists[currentIndex];
    const [primaryColor, secondaryColor, tertiaryColor] = currentColorList;

    // Apply colors to CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--tertiary-color', tertiaryColor);

    // Increment the current index and loop back to the beginning if it exceeds the array length
    setCurrentIndex((currentIndex + 1) % colorLists.length);
  };
  
  const handleLogoHover = () => {  
    // Get the next color list based on the next index
    const nextIndex = (currentIndex-1 + 1) % colorLists.length;
    const nextColorList = colorLists[nextIndex];
    const [, secondaryColor] = nextColorList;
  
    // Update the logo color to the next color scheme's secondary color
    const logoElement = document.querySelector('.navbar-logo');
    if (logoElement) {
      logoElement.style.fill = secondaryColor;
    }
  };
  
  const handleLogoLeave = () => {
    // Get the current color list based on the current index
    // Update the logo color back to the current color scheme's secondary color
    const logoElement = document.querySelector('.navbar-logo');
    if (logoElement) {
      logoElement.style.removeProperty('fill');
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">

      </header>


<div id="main-container" className="main-container">

<div className="mobile-message">
    <p>The mobile site is still under construction. Visit on a computer or increase window size to view the website.</p>
</div>

<nav>
          <div className="navbar">
            <div
              className={`navbar-logo-wrapper ${popEffect ? "pop" : ""}`}
              onClick={handleLogoClick}
              onMouseEnter={handleLogoHover}
              onMouseLeave={handleLogoLeave}
            >
              <Logo className="navbar-logo" />
            </div>

            <ul className="navbar-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#works">Works</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <div className="dropdown">
              <FaBars className="menu-button" />
              <div className="dropdown-content">
                <Link to="home" smooth={true}>Home</Link>
                <Link to="services" smooth={true}>Services</Link>
                <Link to="products" smooth={true}>Products</Link>
                <Link to="works" smooth={true}>Works</Link>
                <Link to="contact" smooth={true}>Contact</Link>
              </div>
            </div>
          </div>
        </nav>


  <section id="home">
    <div className="home-content">
      <div className="home-text">
        <p>Welcome to PopNerd Studio.</p>
        <ul className="home-list">
          <li>Explore.</li>
          <li>Learn.</li>
          <li>Create.</li>
        </ul>
      </div>
      <div 
        className="hover-block"
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
      >
      </div>
      <div className="cube-container">
        <div className="scale-on-hover">
          <Canvas pixelRatio={pixelRatio} camera={{ position: [550, 0, 0] }}>
            <CameraUpdater fov={isHovered ? 30 : 150} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box />
          </Canvas>
        </div>
      </div>
    </div>
    <div className="section-info">
      <p className="info-text">[Theme: {colorSchemeTexts[currentIndex]}]</p>
    </div>
    <a href="#services">
      <div className="section-arrow-container">
        <p>POPNERD STUDIO IS A MULTIMEDIA STUDIO BASED IN THE SAN FRANCISCO BAY AREA, <br></br>OFFERING MOTION GRAPHICS, WEB DEVELOPMENT, 3D ANIMATION, AND MORE. </p>
        <div className="arrow-container">
          <FaAngleDown className="down-arrow" />
        </div>
      </div>
    </a>
  </section>

  <section id="services" className="services">
    <div id="services-content">
      <h1 id="section-title">Services</h1>
      <p>TRANSFORMING YOUR IDEAS INTO REALITY.</p>


      <div className="services-cards">
        <div>
          <p className="service-num">001</p>
          <div className="service-card">
            <FaCode size={80} className="service-icons"/>
            <h3>Web Development</h3>
            <p>We offer high-quality, scalable web development and UI design services for creators and businesses.</p>
          </div>
        </div>

        <div>
          <p className="service-num">002</p>
          <div className="service-card">
            <FaRobot size={80} className="service-icons"/>
            <h3>AI Automation</h3>
            <p>Streamline your workflow with our AI automation. Simple, smart solutions for faster and more efficient task management.</p>
          </div>
        </div>

        <div>
          <p className="service-num">003</p>
          <div className="service-card">
            <FaCube size={80} className="service-icons"/>
            <h3>3D Graphics</h3>
            <p>We bring your ideas to life through motion graphics, 3D animation, game assets, concept art, and more!</p>
          </div>
        </div>

      </div>
    </div>
    <a href="#products">
        <div className="section-arrow-container">
        <p>OUR PRIMARY MISSION IS TO EQUIP BUSINESSES AND INDIVIDUAL CREATORS WITH THE ESSENTIAL RESOURCES THEY NEED TO EXPAND AND PROSPER.</p>
          <FaAngleDown className="down-arrow" />
        </div>
    </a>
  </section>

  <section id="products" className="products">
    <div id="products-content">
      <h1 id="section-title">Products</h1>
      <p id="section-description">TOOLS AND ASSETS FOR ARTISTS AND DEVELOPERS.</p>

      <div className="product-grid">
        <div className="product-item">
            <h3 className="product-name">SignGen</h3>
            <p className="product-info">Using SignGen, users can generate customizable signs and stickers for use in animation, gamedev, and concept art.</p>
            <a class="gumroad-button" href="https://signgen.net/">Visit Website</a>
        </div>

        <div className="product-column">
            <div className="product-item-2">
              <div className="product-img">
                <FaPalette size={70} className="service-icons"/>
              </div>
              <div className="product-text">
                <h3 className="product-name">ASSET PACKS</h3>
                <p className="product-info">A collection of simple 2D and 3D assets for art and animation.</p>
                <a class="gumroad-button" href="https://popnerd.gumroad.com/">View on Gumroad</a>
              </div>
            </div>

            <div className="product-item-2">
              <div className="product-img">
                <FaShoppingCart size={70} className="service-icons"/>
              </div>
              <div className="product-text">
                <h3 className="product-name">AFFILIATE PRODUCTS</h3>
                <p className="product-info">Support the studio by checking out our affiliate products.</p>
                <a class="gumroad-button" href="https://linktr.ee/popnerdaffiliates">View on BlenderMarket</a>
              </div>
            </div>
        </div>

      </div>


    </div>
    <a href="#works">
        <div className="section-arrow-container">
        <p>WHEN WE'RE NOT WORKING ON MAKING GAMES AND ANIMATIONS, WE’RE TEACHING VFX AND DEVELOPING TOOLS TO HELP CREATORS TELL THEIR OWN STORIES.</p>
          <FaAngleDown className="down-arrow" />
        </div>
      </a>
  </section>

  <section id="works" className="works">
    <div id="works-content">
      <h1 id="section-title">Works</h1>
      <p id="section-description">A COLLECTION OF OUR PROJECTS.</p>
      <div className="work-posts">
        <div className="yt-vid vid1">
          <p>Sci-Fi City Blender Tutorial</p>
          <YouTubeEmbed url="https://www.youtube.com/watch?v=GgWKQJob_a0&ab_channel=PopNerd" width={420} height={280} />
        </div>
        <div className="yt-vid vid2">
          <p>Apartment Scene Blender Tutorial</p>
          <YouTubeEmbed url="https://www.youtube.com/watch?v=1h6KRbI-ifE&ab_channel=PopNerd" width={420} height={280} />
        </div>
        <div className="yt-vid vid3">
          <p>Market Scene Blender Tutorial</p>
          <YouTubeEmbed url="https://www.youtube.com/watch?v=8guwb9UWeOg&t=2s&ab_channel=PopNerd" width={420} height={280} />
        </div>
      </div>
      <div className="work-links">
        <a class="work-link" href="https://www.youtube.com/@PopNerdStudio">[YouTube Channel]</a>
        <a class="work-link" href="https://github.com/popnerdstudios/C-3DK">[AI Home Assistant]</a>
        <a class="work-link" href="https://store.steampowered.com/app/2089480/The_Wave_of_Monke/">[The Wave of Monké]</a>
        <a class="work-link" href="https://www.instagram.com/ghostmachinagame/?img_index=1">[Project Colossus]</a>

      </div>
    </div>
    <a href="#contact">
        <div className="section-arrow-container">
        <p>WE'VE PARTNERED WITH MANY PRODUCTS AND BRANDS IN THE BLENDER AND GAMEDEV COMMUNITIES, AND ARE OPEN TO COLLABORATE WITH NEW CREATORS.</p>
          <FaAngleDown className="down-arrow" />
        </div>
    </a>
  </section>

  <section id="contact" className="contact">
    <div id="contact-content">
      <h1 id="section-title">Contact</h1>
      <p id="section-description">STAY IN TOUCH.</p>
      <div className="contact-elements">
        <div className="contact-form">
          <ContactForm />
        </div>
        <div className="contact-line"></div>
        <div className="contact-team">
          <p className="member-label">MEMBERS</p>
          <div className="contact-member">
                <div className="member-socials">
                  <a href="https://www.youtube.com/c/PopNerdStudios" target="_blank" rel="noopener noreferrer" className="member-social-link">
                    <FaYoutube className="member-social" />
                  </a>
                  <a href="https://www.instagram.com/astronautalpaca/" target="_blank" rel="noopener noreferrer" className="member-social-link">
                    <FaInstagram className="member-social" />
                  </a>
                  <a href="https://www.linkedin.com/in/sree-gajula" target="_blank" rel="noopener noreferrer" className="member-social-link">
                    <FaLinkedin className="member-social" />
                  </a>
                  <a href="https://github.com/popnerdstudios" target="_blank" rel="noopener noreferrer" className="member-social-link">
                    <FaGithub className="member-social" />
                  </a>
                </div>
                <h3 className="member-name">SREE GAJULA</h3>
                <p className="member-info">ARTIST, DEVELOPER</p>
          </div>
          <div className="contact-member">
            <div className="member-socials">
              <a href="https://twitter.com/consumerofbuter" target="_blank" rel="noopener noreferrer" className="member-social-link">
                <FaTwitter className="member-social" />
              </a>
              <a href="https://www.instagram.com/vishal.sidd/" target="_blank" rel="noopener noreferrer" className="member-social-link">
                <FaInstagram className="member-social" />
              </a>
              <a href="https://www.linkedin.com/in/vishal-s-175504102/" target="_blank" rel="noopener noreferrer" className="member-social-link">
                <FaLinkedin className="member-social" />
              </a>
              <a href="https://github.com/vsiddireddy" target="_blank" rel="noopener noreferrer" className="member-social-link">
                <FaGithub className="member-social" />
              </a>
            </div>
            <h3 className="member-name">VISHAL SIDDIREDDY</h3>
            <p className="member-info">DEVELOPER</p>
          </div>
        </div>
      </div>

    </div>
    <div className="section-arrow-container-last">
      <div className="social-row">
        <a href="https://www.instagram.com/astronautalpaca/" target="_blank" rel="noopener noreferrer" className="member-social-link">
          <FaInstagram className="contact-social" />
        </a>
        <a href="https://www.youtube.com/c/PopNerdStudios" target="_blank" rel="noopener noreferrer" className="member-social-link">
          <FaYoutube className="contact-social" />
        </a>
        <a href="https://discord.gg/UCYFV4cz6X" target="_blank" rel="noopener noreferrer" className="member-social-link">
          <FaDiscord className="contact-social" />
        </a>
      </div>
      <p>REALPOPNERD@GMAIL.COM</p>

    </div>
  </section>

</div>
    </div>
  );
}

export default App;

