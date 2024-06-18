
import Image from "next/image";
import Header from "./Component/Header";
import { getSession } from "./lib";
import Link from "next/link";

export default async function Home() {

  return(
    <>
    
    
    <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <Image src="/images/coffee-main-page.jpg" class="d-block mx-lg-auto img-fluid" alt={"Coffee Image main page"} width={"700"} height={"500"} loading="lazy" />
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold lh-1 mb-3">It's all about the <b>coffee</b>
        </h1>
        <p class="lead">Fuel Your Passion Every Day: Discover Exceptional Coffee Crafted for True Coffee Lovers, Inspiring You to Achieve Greatness and Savor Every Moment!</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <Link href="/products"><button type="button"  class="btn btn-primary btn-lg px-4 me-md-2">Products</button></Link>
        <Link href="/search"><button type="button" class="btn btn-outline-secondary btn-lg px-4">Search</button></Link>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}
