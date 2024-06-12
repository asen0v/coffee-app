import Link from "next/link";
import Image from "next/image";

export default function Footer(){
  
  
    return(
        <>
<footer className="footer section section-sm">
  
  <div className="container">
    <div className="row">
      <div className="col-lg-3 col-md-7 offset-md-1 offset-lg-0 mb-4 mb-lg-0">
       
        <div className="block about">
         
          <Image src={"/images/logo.png"} width={35} height={35} alt="logo" /> <span className="fs-4 text-white">CoffeeApp</span>
         
          <p className="alt-color">Discover premium coffee machines and a curated selection of coffee beans at CoffeeApp. From freshly ground coffee to expertly crafted brews, we provide everything you need to elevate your coffee experience. Shop with us for quality and convenience.</p>
        </div>
      </div>
   
      <div className="col-lg-2 offset-lg-1 col-md-3 col-6 mb-4 mb-lg-0">
        <div className="block">
          <h4>Site Pages</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/Test">Test</a></li>
            <li><a href="/addProduct">Add Product</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>
      </div>
      
      <div className="col-lg-2 col-md-3 offset-md-1 offset-lg-0 col-6 mb-4 mb-md-0">
        <div className="block">
          <h4>Find us on</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Pinterest</a></li>
            <li><a href="#">Github</a>
            </li>
            <li><a href="#">Contribute</a></li>



          </ul>
        </div>
      </div>
      
      <div className="col-lg-4 col-md-7">
      
        <div className="block-2 app-promotion border border-light">
          <div className="mobile d-flex  align-items-center">
          <Link href="#"><Image src={"/images/phone-icon.png"} width={30} height={53} className="img-fluid" alt="Mobile phone icon"/></Link>
            <p className="mb-0">Get the CoffeeApp for Mobile and Save More</p>
            
          </div>
          
          <div className="download-btn d-flex my-3">
            <Link href="#"><Image src={"/images/google-play-store.png"} width={195} height={55} className="img-fluid" alt="Google App Store"/></Link>
            <Link href="#" className=" ml-3"><Image src={"/images/apple-app-store.png"} width={195} height={55} className="img-fluid" alt="Apple App Store"/></Link>
          </div>
        </div>
      </div>
    </div>
  </div>

</footer>

<footer className="footer-bottom">

  <div className="container">
    <div className="row">
      <div className="col-lg-6 text-center text-lg-left mb-3 mb-lg-0">
        <div className="copyright">
          <p>Copyright &copy; 2024 | Developed by <b>Veselin Asenov</b> for <i>Solent University </i></p>
        </div>
      </div>
      <div className="col-lg-6">
        
        <ul className="social-media-icons text-center text-lg-right">
          <li><Link className="fa fa-facebook" href="#"></Link></li>
          <li><Link className="fa fa-instagram" href="#"></Link></li>
          <li><Link className="fa fa-pinterest-p" href="#"></Link></li>
          <li><Link className="fa fa-github-alt" href="#"></Link></li>
        </ul>
      </div>
    </div>
  </div>
 
  <div className="scroll-top-to">
    <i className="fa fa-angle-up"></i>
  </div>
</footer>
</>
    )
}