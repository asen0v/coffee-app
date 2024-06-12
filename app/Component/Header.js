import Link from "next/link";
import Image from "next/image";
import { updateSession } from "../lib";
export default function Header({loginFlag, userTitle}){

    function getLoginLink(){
        if(loginFlag) return(<><li className="nav-item">
            <Link className="nav-link login-button" href="/profile"><i className="fa fa-user"></i> {userTitle}</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link text-white add-button" href="/logout"><i class="fa fa-minus-circle"></i> Logout</Link>
    </li>  &nbsp;
    <li className="nav-item">
    <Link className="nav-link " href="/cart"> <Image src="/icons/cart.png" width={24} height={24} alt={"User cart"} /> Cart</Link>
</li></>);
        else return (<><li className="nav-item">
            <Link className="nav-link login-button" href="/login"><i className="fa fa-user"></i> Login</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link text-white add-button" href="/register"><i class="fa fa-plus-circle"></i> Sign up</Link>
    </li></>
        );
      }
      
    return(
        <header>
<link rel="icon" href="/images/logo.png" />
<link href="https://demo.themefisher.com/classimax-bootstrap/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"></link>
<link href="https://demo.themefisher.com/classimax-bootstrap/plugins/bootstrap/bootstrap-slider.css" rel="stylesheet"></link>
<link href="https://demo.themefisher.com/classimax-bootstrap/plugins/jquery-nice-select/css/nice-select.css" rel="stylesheet"></link>
<link href="https://demo.themefisher.com/classimax-bootstrap/css/style.css" rel="stylesheet"></link>
<link href="https://demo.themefisher.com/classimax-bootstrap/plugins/slick/slick-theme.css" rel="stylesheet"></link>
<link href="https://demo.themefisher.com/classimax-bootstrap/plugins/slick/slick.css" rel="stylesheet"></link>
<link href="https://demo.themefisher.com/classimax-bootstrap/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet"></link>
<div class="container">
        <div className="row">
        <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light navigation">
                <a className="navbar-brand" href="/">
                    <Image src={"/images/logo.png"} width={32} height={32} alt="CoffeeApp" />  <span className="fs-4">CoffeeApp</span>
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto main-nav ">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link href="/products" className="nav-link">Products</Link>
                        </li>
                        <li className="nav-item dropdown dropdown-slide @@pages">
                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Pages <span><i className="fa fa-angle-down"></i></span>
                            </a>
                          
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item @@about" href="/Test">Test</a></li>
                                <li><a className="dropdown-item @@profile" href="/addProduct">Add Product</a></li>
                                <li><a className="dropdown-item @@profile" href="/cart">Cart</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link href="/search" className="nav-link">Search</Link>
                        </li>  
                            </ul>
                           
                            <ul className="navbar-nav ml-auto mt-10">
							
							{getLoginLink()}
						</ul>
                       {loginFlag}
                        

                </div>
                </nav>
            </div>
            </div>
            </div>
            </header>
    )
}