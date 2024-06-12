import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css"
import Header from "./Component/Header";
import { getSession } from "./lib";
import Footer from "./Component/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coffee App - Online shop for coffee",
  description: "Discover premium coffee machines and a curated selection of coffee beans at CoffeeApp. From freshly ground coffee to expertly crafted brews, we provide everything you need to elevate your coffee experience. Shop with us for quality and convenience.",
};

export default async function RootLayout({ children }) {
  const session = await getSession();
 function Navigation(){
  if(session) {
    if(session.user && session.user.name) {
      return(<header><Header loginFlag={true} userTitle={session.user.name}/></header>);
    } else if(session.admin) {
      return(<header><Header loginFlag={true} userTitle={session.admin.name}/></header>);
    }
  } 
  return(<header><Header loginFlag={false} userTitle="" /></header>);
}

  
  return (
    <html lang="en">
      <body className="body-wrapper">
        <div className="container">
  {Navigation()}
        {children}
        </div>
       <Footer />
        </body>
      
    </html>
  );
}
