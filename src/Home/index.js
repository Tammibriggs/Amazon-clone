import './index.css'
import Product from './Product'

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img 
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="home"
        />
        <div className="home__row">
          <Product
            id={4}
            title="Square wooden light weight medium laundry basket"
            price={98.09}
            image="/basket.png"
            rating={5}
          />
          
          <Product
            id={2}
            title="500-watt QuickBlend Stainless Steel Kitchen Blender"
            price={29.99}
            image="/blender.png"
            rating={5}
          />

          <Product
            id={3}
            title="PulseMax Smartwatch with Heart Rate and Burned calories Tracker"
            price={199.99}
            image="/watch.png"
            rating={3}
          />

          <Product
            id={5}
            title="Playstation and Pad, Immersive Gaming Experience with Stunning Visuals and Lightning-Fast Performance"
            price={598.00}
            image="/playstation.png"
            rating={5}
          />

          <Product 
            id={1}
            title="Fully Automatic Front Loading Washing Machine with Multiple Cycle Options and Advanced Spin Technology"
            price={229.0}
            image="/washing-machine.png"
            rating={4}
          />
        
          <Product 
            id={6}
            title="Epic LC49RG90SSUXEN 49' LED Gaming Monitor - Wide Dual QHD 5120 x 1440"
            price={1094.98}
            image="/monitor.png"
            rating={4}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
